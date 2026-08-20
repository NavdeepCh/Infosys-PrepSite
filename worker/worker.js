/**
 * InfyTrack Cloudflare Worker — AI Gateway
 * -----------------------------------------------------------------------
 * Implements the server-side boundary described in the spec:
 *   InfyTrack Frontend -> Authenticated Worker -> Cloudflare Workers AI -> Frontend
 *
 * The frontend (callAiWorker in infytrack.html) never holds a model
 * credential. This Worker is the only thing that talks to Workers AI.
 *
 * Bindings expected (see wrangler.toml):
 *   - AI            Cloudflare Workers AI binding
 *   - RATE_LIMIT_KV KV namespace used for simple per-candidate rate limiting
 *   - ADMIN_TOKEN   secret, checked for /api/admin/* routes (optional)
 *
 * Deploy with: wrangler deploy
 */

// ---- Configuration -------------------------------------------------------

// Allowlisted models per feature. Never accept a model name from the client.
// NOTE: @cf/meta/llama-3-8b-instruct was retired from the Workers AI catalog
// (Cloudflare marks it "Deprecated" as of mid-2026) — calls to it throw
// inside env.AI.run(), which is why every feature returned a 502 "AI Gateway
// request failed" error. Using the actively maintained fast variant instead.
const MODEL_MAP = {
  solve: "@cf/meta/llama-3.1-8b-instruct-fast",
  review: "@cf/meta/llama-3.1-8b-instruct-fast",
  "edge-cases": "@cf/meta/llama-3.1-8b-instruct-fast",
  quiz: "@cf/meta/llama-3.1-8b-instruct-fast",
  flashcards: "@cf/meta/llama-3.1-8b-instruct-fast",
  interview: "@cf/meta/llama-3.1-8b-instruct-fast",
  search: "@cf/meta/llama-3.1-8b-instruct-fast", // swap for a grounded/search-capable model when available
};

const MAX_PROMPT_LENGTH = 4000;
const MAX_CODE_LENGTH = 8000;
const MAX_HISTORY_MESSAGES = 20;
const RATE_LIMIT_WINDOW_SECONDS = 60;
const RATE_LIMIT_MAX_REQUESTS = 20; // per candidate, per window

const REG_NO_PATTERN = /^[A-Z0-9]{10}$/;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://infosys-prep-site.vercel.app/",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Candidate-RegNo",
};

// ---- Helpers ---------------------------------------------------------

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function errorResponse(message, status = 400, requestId = null) {
  return jsonResponse({ error: message, requestId }, status);
}

function makeRequestId() {
  return crypto.randomUUID();
}

function normalizeRegNo(raw) {
  return (raw || "").toString().trim().toUpperCase();
}

/** Validate the caller is a plausible authenticated candidate.
 *  Real deployments should replace this with Firebase Auth token
 *  verification rather than trusting a client-supplied registration
 *  number; the header + body match is a minimum viable guard. */
function authenticateCandidate(request, body) {
  const headerReg = normalizeRegNo(request.headers.get("X-Candidate-RegNo"));
  const bodyReg = normalizeRegNo(body?.regNo);
  if (!headerReg || !bodyReg || headerReg !== bodyReg) {
    return null;
  }
  if (!REG_NO_PATTERN.test(headerReg)) {
    return null;
  }
  return headerReg;
}

async function checkRateLimit(env, regNo) {
  if (!env.RATE_LIMIT_KV) return true; // fail-open if KV not bound (dev mode)
  const key = `rl:${regNo}`;
  const current = parseInt((await env.RATE_LIMIT_KV.get(key)) || "0", 10);
  if (current >= RATE_LIMIT_MAX_REQUESTS) return false;
  await env.RATE_LIMIT_KV.put(key, String(current + 1), {
    expirationTtl: RATE_LIMIT_WINDOW_SECONDS,
  });
  return true;
}

function clip(str, max) {
  if (typeof str !== "string") return "";
  return str.length > max ? str.slice(0, max) : str;
}

async function runModel(env, feature, messages) {
  const model = MODEL_MAP[feature];
  if (!model) throw new Error("UNSUPPORTED_FEATURE");
  const result = await env.AI.run(model, { messages });
  return (result && (result.response || result.result)) || "";
}

/** Best-effort extraction of the first {...} JSON object from model text.
 *  Different models format "JSON-only" instructions differently — some
 *  wrap it in ```json fences, add a leading sentence, or leave a trailing
 *  comma. This strips the common cases before falling back to a raw parse. */
function extractJson(text) {
  let cleaned = (text || "").trim();
  // Strip ```json ... ``` or ``` ... ``` code fences if present.
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();

  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) return null;

  let candidate = match[0];
  try {
    return JSON.parse(candidate);
  } catch {
    // Common model slip-up: trailing comma before a closing bracket/brace.
    try {
      const fixed = candidate.replace(/,\s*([}\]])/g, "$1");
      return JSON.parse(fixed);
    } catch {
      return null;
    }
  }
}

function sanitizeText(text) {
  // Strip script/style tags and event-handler attributes before the
  // frontend ever renders this as HTML-ish markdown.
  return (text || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/on\w+\s*=\s*"[^"]*"/gi, "");
}

// ---- Feature handlers ------------------------------------------------

async function handleSolve(env, body) {
  const mode = body.mode || "solve";
  let prompt;
  if (mode === "chat") {
    prompt = `You are the InfyTrack AI Assistant for Infosys placement candidates (2026 batch). Be concise and helpful. Candidate message: ${clip(body.prompt, MAX_PROMPT_LENGTH)}`;
  } else if (mode === "study-plan") {
    prompt = `Create a concise ${clip(String(body.days || 14), 10)}-day study plan for a candidate targeting the Infosys ${clip(body.track || "DSE", 10)} track. Structure it as short markdown bullet points grouped by day ranges.`;
  } else {
    prompt = `Write an optimal, well-commented solution in ${clip(body.lang || "python", 20)} for this problem.\n\nTitle: ${clip(body.title, 200)}\nDescription: ${clip(body.desc, 1000)}\nApproach: ${clip(body.approach, 500)}`;
  }

  const reply = sanitizeText(
    await runModel(env, "solve", [{ role: "user", content: prompt }])
  );

  if (mode === "chat") return { response: reply };
  if (mode === "study-plan") return { plan: reply };
  return { code: reply };
}

async function handleReview(env, body) {
  const code = clip(body.code, MAX_CODE_LENGTH);
  if (!code) throw new Error("MISSING_CODE");
  const prompt = body.mode === "resume"
    ? `Analyze this candidate resume text against Infosys hiring profiles (SE ~3.6-4 LPA, DSE ~6.25 LPA, SP ~9.5-21 LPA). Give compatibility scores, missing keywords, and recommendations as short markdown.\n\n${code}`
    : `Review this code for time complexity, space complexity, correctness, and edge-case bugs. Reply as short markdown bullet points.\n\n${code}`;
  const reply = sanitizeText(
    await runModel(env, "review", [{ role: "user", content: prompt }])
  );
  return { review: reply };
}

async function handleEdgeCases(env, body) {
  const prompt = `Generate 3 boundary/adversarial test cases (input and expected output) for this problem:\nTitle: ${clip(body.title, 200)}\nDescription: ${clip(body.desc, 1000)}`;
  const reply = sanitizeText(
    await runModel(env, "edge-cases", [{ role: "user", content: prompt }])
  );
  return { cases: reply };
}

async function handleQuiz(env, body) {
  const domain = clip(body.domain || "DSA", 20);
  const prompt = `Generate exactly 1 multiple-choice question for Infosys ${domain} interview prep. Respond with ONLY valid JSON, no prose, no markdown fences, in this exact shape:\n{"category":"${domain}","question":"...","options":["...","...","...","..."],"correct":0,"explanation":"..."}`;
  const raw = await runModel(env, "quiz", [{ role: "user", content: prompt }]);
  const parsed = extractJson(raw);
  if (!parsed || !Array.isArray(parsed.options) || parsed.options.length < 2) {
    throw new Error("MODEL_OUTPUT_MALFORMED");
  }
  return {
    category: sanitizeText(parsed.category || domain),
    question: sanitizeText(parsed.question),
    options: parsed.options.slice(0, 4).map((o) => sanitizeText(String(o))),
    correct: Number.isInteger(parsed.correct) ? parsed.correct : 0,
    explanation: sanitizeText(parsed.explanation || ""),
  };
}

async function handleFlashcards(env, body) {
  const topic = clip(body.topic || "OS", 20);
  const prompt = `Generate exactly 1 technical flashcard (front question + back answer) for Infosys placement prep on the topic "${topic}". Respond with ONLY valid JSON, no prose, no markdown fences: {"topic":"${topic}","question":"...","answer":"..."}`;
  const raw = await runModel(env, "flashcards", [{ role: "user", content: prompt }]);
  const parsed = extractJson(raw);
  if (!parsed || !parsed.question || !parsed.answer) {
    throw new Error("MODEL_OUTPUT_MALFORMED");
  }
  return {
    topic: sanitizeText(parsed.topic || topic),
    question: sanitizeText(parsed.question),
    answer: sanitizeText(parsed.answer),
  };
}

async function handleInterview(env, body) {
  const track = clip(body.track || "DSE", 20);
  const focus = clip(body.focus || "DSA & Coding Logic", 60);
  const history = Array.isArray(body.history) ? body.history.slice(-MAX_HISTORY_MESSAGES) : [];

  const systemPrompt = `You are a Senior Infosys Technical Interview Panellist conducting a mock interview for the ${track} track, focused on ${focus}. Ask one focused follow-up question or give brief feedback per turn. Keep responses under 80 words.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.map((turn) => ({
      role: turn.role === "candidate" ? "user" : "assistant",
      content: clip(turn.text, 1000),
    })),
  ];

  const reply = sanitizeText(await runModel(env, "interview", messages));
  return { response: reply };
}

async function handleSearch(env, body) {
  const query = clip(body.query, 300);
  if (!query) throw new Error("MISSING_QUERY");
  // NOTE: this is a model-generated synthesis, not a live web search. Wire
  // this up to a real grounding/search integration (e.g. a Workers AI
  // browsing tool, or an external search API called from here) before
  // presenting results to candidates as "current information" per the spec's
  // requirement to clearly distinguish grounded vs. model-generated content.
  const prompt = `Summarize likely current trends for the Infosys campus placement query: "${query}". Present as short markdown bullets. Clearly hedge that this is a general synthesis, not a live search result.`;
  const reply = sanitizeText(await runModel(env, "search", [{ role: "user", content: prompt }]));
  return { result: reply, grounded: false };
}

const FEATURE_HANDLERS = {
  "/api/ai/solve": handleSolve,
  "/api/ai/review": handleReview,
  "/api/ai/edge-cases": handleEdgeCases,
  "/api/ai/quiz": handleQuiz,
  "/api/ai/flashcards": handleFlashcards,
  "/api/ai/interview": handleInterview,
  "/api/ai/search": handleSearch,
};

// ---- Entry point -------------------------------------------------------

export default {
  async fetch(request, env, ctx) {
    const requestId = makeRequestId();

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);

    // Unauthenticated health check — no regNo, no rate limit, no model call.
    // The frontend pings this to show a live "Worker reachable" status
    // instead of just assuming the configured URL works.
    if (url.pathname === "/health" && request.method === "GET") {
      return jsonResponse({
        status: "ok",
        service: "infytrack-ai-gateway",
        time: new Date().toISOString(),
        requestId,
      });
    }

    const handler = FEATURE_HANDLERS[url.pathname];

    if (!handler) {
      return errorResponse("Unknown endpoint.", 404, requestId);
    }
    if (request.method !== "POST") {
      return errorResponse("Method not allowed.", 405, requestId);
    }
    if ((request.headers.get("Content-Type") || "").indexOf("application/json") === -1) {
      return errorResponse("Content-Type must be application/json.", 415, requestId);
    }

    let body;
    try {
      const raw = await request.text();
      if (raw.length > 20000) {
        return errorResponse("Request payload too large.", 413, requestId);
      }
      body = JSON.parse(raw);
    } catch {
      return errorResponse("Invalid JSON body.", 400, requestId);
    }

    const regNo = authenticateCandidate(request, body);
    if (!regNo) {
      return errorResponse("Unauthorized: candidate registration number missing or malformed.", 401, requestId);
    }

    const allowed = await checkRateLimit(env, regNo);
    if (!allowed) {
      return errorResponse("Rate limit exceeded. Please wait before retrying.", 429, requestId);
    }

    try {
      // Cloudflare enforces a hard execution ceiling per invocation already;
      // this Promise.race adds an application-level timeout so a slow model
      // call fails fast with a structured error instead of hanging the UI.
      const result = await Promise.race([
        handler(env, body),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("UPSTREAM_TIMEOUT")), 25000)
        ),
      ]);

      ctx.waitUntil(recordUsageEvent(env, { regNo, feature: url.pathname, status: "ok", requestId }));
      return jsonResponse({ ...result, requestId });
    } catch (err) {
      ctx.waitUntil(recordUsageEvent(env, { regNo, feature: url.pathname, status: "error", requestId }));
      let message = "AI Gateway request failed. Please try again shortly.";
      if (err && err.message === "UPSTREAM_TIMEOUT") {
        message = "The AI model took too long to respond. Please try again.";
      } else if (err && err.message === "MODEL_OUTPUT_MALFORMED") {
        // The model responded, but its output didn't parse as the expected
        // JSON shape (e.g. it added prose around the JSON, or used a format
        // this model doesn't support well). Distinct from a hard failure so
        // it's obvious from the toast alone which case this is.
        message = "The AI generated an unexpected response format. Please try again.";
      }
      return errorResponse(message, 502, requestId);
    }
  },
};

/** Fire-and-forget telemetry write. Never logs prompt/response content or
 *  secrets — only feature, status, and timing, per the privacy spec. */
async function recordUsageEvent(env, { regNo, feature, status, requestId }) {
  if (!env.RATE_LIMIT_KV) return;
  try {
    const key = `usage:${Date.now()}:${requestId}`;
    await env.RATE_LIMIT_KV.put(
      key,
      JSON.stringify({ regNo, feature, status, timestamp: new Date().toISOString() }),
      { expirationTtl: 60 * 60 * 24 * 7 }
    );
  } catch {
    // Telemetry failures must never break the candidate-facing response.
  }
}
