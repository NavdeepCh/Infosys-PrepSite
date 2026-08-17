# Infosys 2026 Campus Coding Assessment Explorer & Dynamic AI Prep Assistant

A single-file, client-side interactive explorer and AI prep assistant for the Infosys 2026 campus coding assessment. This repository contains a responsive HTML dashboard (infosys_2026_campus_coding_explorer.html) that catalogs 74 empirical problems, provides analytics, and integrates optional Google Gemini APIs for code generation, TTS, image generation and grounded web search.

## Live file
- infosys_2026_campus_coding_explorer.html — main UI (self-contained, no build step). Open directly in a browser or serve via a static file server.

## Features
- Catalog of 74 curated problems (Easy / Medium / Hard) mapped to LeetCode references.
- Interactive problem grid with filters (difficulty, role, topic) and search.
- Per-problem modal with AI-powered tools:
  - AI Code Generator (Python / Java / C++)
  - AI Code Review / Debugger
  - AI Test Case Synthesizer
  - AI Visual Diagram (Imagen)
  - AI Spoken Explanation (Gemini TTS)
- Floating AI chat assistant with quick actions (mark solved, request code, recommend next problem).
- Progress tracker persisted to localStorage.
- Optional Google Gemini integration for live streaming / structured responses and grounded web search.

## Quick start
1. Clone the repo or download the `infosys_2026_campus_coding_explorer.html` file.

2. Serve with a static server (recommended) so features like TTS/image fetch work reliably:

- Python 3

  ```bash
  # from repo root
  python -m http.server 8000
  # Then open http://localhost:8000/infosys_2026_campus_coding_explorer.html
  ```

- Or use any static host (GitHub Pages, Netlify, Vercel). The file is self-contained — no build step required.

3. Open the HTML file in your browser.

## Gemini API (optional, recommended for full AI features)
The page supports optional integration with Google Gemini models (code generation, TTS, Imagen, web grounding). To enable:

1. Click the key icon in the chatbot header or open the "Gemini API Key Integration" modal.
2. Paste your Google Cloud API key that has access to the following endpoints/models:
   - gemini-3-flash-preview (or the model you have access to) for generate/streaming
   - gemini-2.5-flash-preview-tts for TTS
   - imagen-4.0-generate-001 for image generation
3. Save the key. The UI stores it temporarily in localStorage (key: `infosys_gemini_key`).

Security note: Do NOT commit private API keys into the repository. Use your own key only at runtime via the modal. The demo file contains an example placeholder value for quick testing — remove that before sharing or publishing.

## Usage notes
- Progress and solved questions are stored in localStorage under `infosys_solved_q_2026` and persist per browser.
- The AI features fall back to a local dynamic response engine if no API key is configured.
- The file contains all problem metadata inside `questionsData` (74 entries). You can edit or extend this array to add/remove problems.

## Development / Customization
- To update the problem bank, edit the `questionsData` array in the HTML file. Each entry follows the shape:
  ```js
  { id: 1, title: "Reverse an Array", difficulty: "Easy", roles: ["SE","DSE"], topic: "Arrays & Hashing", history: "...", desc: "...", approach: "...", time: "O(N)", space: "O(1)", leetcode: "https://...", lcName: "LeetCode 344" }
  ```
- To change the initial solved set, modify or clear the `infosys_solved_q_2026` key in localStorage.
- The UI uses Tailwind CDN and Chart.js CDN for styling and charts — no build tooling required.

## Troubleshooting
- If AI features fail with HTTP/permission errors, ensure:
  - The API key is valid and has billing enabled.
  - The key has access to the requested model endpoints.
  - Your environment allows fetch requests to Google APIs (CORS, corporate proxies can interfere).
- Audio playback: Some browsers prevent autoplay. Use the play controls if autoplaying fails.

## Contributing
- Contributions are welcome. Create issues or PRs with small, focused changes (problem updates, UI fixes, docs).
- When editing the problem catalog, keep `id` values unique and contiguous if you rely on number-based UI features.

## License
This repository is provided under the MIT License. See LICENSE (if added) for details.

---

If you'd like, I can:
- Add this README to the repository now (I will commit it),
- Or update the HTML to remove the placeholder Gemini API key and prompt the user to add their own (recommended),
- Or create a small demo GitHub Pages workflow and instructions to publish the page.

Tell me which next step you want and I'll apply it now.