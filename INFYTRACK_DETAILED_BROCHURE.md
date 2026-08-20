# 📘 InfyTrack: Complete Technical Brochure & Operations Manual
## Infosys Technical Recruitment Coding Intelligence Portal

**Version:** 2026 Batch  
**Last Updated:** August 20, 2026  
**Portal:** https://infosys-prep-site.vercel.app  
**Repository:** NavdeepCh/Infosys-PrepSite

---

## 🎯 Executive Summary

**InfyTrack** is a comprehensive web-based assessment platform designed for Infosys campus recruitment 2026. It serves as an **empirical hiring assessment engine** that aggregates coding problems, hiring track structures, and AI-powered preparation tools for three distinct recruitment profiles: Systems Engineer (SE), Digital Specialist Engineer (DSE), and Specialist Programmer (SP).

### Key Statistics
- **105 Cataloged Problems** across 4 competitive programming platforms (LeetCode, GeeksforGeeks, CodeChef, HackerRank)
- **3 Hiring Tracks** with distinct scoring weights and compensation tiers (₹3.6L – ₹21L LPA)
- **6 AI Preparation Accelerators** powered by Cloudflare Workers AI
- **Real-time Cloud Sync** via Firebase Firestore
- **Server-Side Security** with Cloudflare Workers gateway for all AI requests

---

## 📋 PART 1: RULES & OPERATIONAL FRAMEWORK

### 1.1 Authentication & Session Rules

#### Registration Model
- **Identifier:** 10-character alphanumeric Registration Number (e.g., `22A91A0501`)
- **Case Sensitivity:** Case-insensitive (system normalizes input)
- **Validation:** Registration numbers must match Firebase Firestore candidate registry
- **Profile Persistence:** Once registered, all candidate progress syncs to Cloud

#### Authentication Flow Rules

**Sign-In Rule:**
- User enters 10-char registration number
- System queries Firestore for exact match (case-insensitive)
- If found: Restore all historical progress, solved problems, quizzes, and preferences
- If not found: Display error card with CTA to "Sign Up Now"
- Success: Load candidate dashboard with personalized analytics

**Sign-Up Rule (Account Creation):**
- Registration number must be unique (not already in system)
- Mandatory fields:
  - Full Name (text input, no length restriction stated)
  - College Name (text input)
  - Degree & Branch (e.g., "B.Tech - CSE")
  - Graduation Batch (dropdown: 2025, 2026, 2027, 2028)
- On submit: Create Firestore document with registration as primary key
- Initialize tracking fields: solved_count, quiz_scores, flashcard_progress, study_plan
- Display success toast and redirect to main dashboard

#### Session Management Rules
- **Duration:** No explicit timeout mentioned; session persists as long as browser tab open
- **Logout:** "Switch candidate profile" button (sign-out) clears current session state
- **Cloud Sync:** All changes persist automatically to Firestore during session
- **Multi-device:** User can restore profile on different device by entering registration number

---

### 1.2 Problem Solving & Tracking Rules

#### Problem Status Tracking
- **States:** Unsolved → Solved
- **Mark as Solved:** User clicks "Mark as Solved" button in problem modal
- **Trigger:** Button stores solved status in Firestore for that problem + candidate combo
- **Persistence:** Solved status persists across sessions
- **UI Reflection:** Solved count badge in header updates immediately (with smooth animation)

#### Progress Percentage Calculation
```
Progress % = (Total Solved Problems / Total Cataloged Problems) × 100
Total Cataloged = 105 Problems
Live Update: Progress bar animates when new problem marked solved
```

#### Benchmark Rules by Hiring Track

**Systems Engineer (SE) - Foundational Track:**
- **Duration:** 90 minutes
- **Structure:** 2 Coding Problems + Aptitude Section
- **Scoring:** 40% Aptitude + 60% Coding
- **Benchmark:** Solving 1 problem fully guarantees SE consideration
- **Domains:** Basic Arrays, Strings, Elementary Math
- **Compensation:** ₹3.60 – ₹4.00 LPA

**Digital Specialist Engineer (DSE) - Intermediate Track:**
- **Duration:** 3 hours (180 minutes)
- **Structure:** 3 Coding Problems (Easy, Medium, Hard)
- **Scoring Breakdown:** 
  - Q1 (Easy): 20 marks
  - Q2 (Medium): 30 marks
  - Q3 (Hard): 50 marks
- **Benchmark:** Solving Q1 + Q2 fully qualifies for DSE profile
- **Domains:** Two Pointers, Sliding Window, Greedy, 1D Dynamic Programming
- **Compensation:** ~₹6.25 LPA
- **Status:** Marked as "Most Popular" track

**Specialist Programmer (SP / HackWithInfy) - Advanced Track:**
- **Duration:** 3 hours (180 minutes)
- **Structure:** 3-4 Complex Algorithmic Challenges
- **Benchmark:** Solving the third/fourth hard problem unlocks SP tier
- **Domains:** Multi-D DP, Segment Trees, Bitmasking, Graph Algorithms, Advanced Optimization
- **Compensation:** ₹9.50 – ₹21.00 LPA
- **Status:** Premium/Advanced track

#### Empirical Pattern Frequency Insights
Based on statistical aggregation of 2025–2026 candidate transcripts:

| Pattern | Frequency | Key Insight |
|---------|-----------|-------------|
| **Arrays & Hashing** | 53% | Most dominant pattern; appears in majority of all questions |
| **Dynamic Programming** | 18% | Critical hurdle for DSE (Q2) and SP (Q3) qualification |
| **Two Pointers/Sliding Window** | 12% | Core DSE track focus |
| **Greedy & Searching** | 8% | Foundation for medium difficulty |
| **Math & Number Theory** | 5% | SE track requirement |
| **Trees & Graphs** | 3% | Advanced SP track only |
| **Bit Manipulation & Tries** | 1% | SP tier edge cases |

---

### 1.3 Constraint & Edge Case Rules

#### Algorithmic Constraints
- **Array Size Limit:** N ≥ 10^5 minimum (all platforms enforce this)
- **Modulo Reduction:** 10^9 + 7 for large number results
- **Integer Precision:** 64-bit integer requirements (no 32-bit overflows tolerated)
- **Time Complexity Ceiling:** O(N log N) for most optimal solutions expected

#### Problem Filtering Rules

**Difficulty Tiers:**
- Easy Level
- Medium Level
- Hard Level
- ALL (no filter)

**Role Filters:**
- Systems Engineer (SE)
- Digital Specialist Engineer (DSE)
- Specialist Programmer (SP)
- ALL (no filter)

**Algorithmic Categories:**
- Arrays & Hashing
- Two Pointers & Sliding Window
- Dynamic Programming
- Math & Number Theory
- Strings & Text Processing
- Greedy & Searching
- Trees & Graphs
- Bit Manipulation & Tries
- ALL (no filter)

**Platform Filters:**
- LeetCode
- GeeksforGeeks
- CodeChef
- HackerRank
- ALL (no filter)

**Search Behavior:**
- Text search applies across: question title, concept, algorithm keywords
- Filters are cumulative (AND logic)
- Results update in real-time as filters change
- Clicking any bar in the analytics chart auto-filters to that category

---

## 📊 PART 2: FEATURE SPECIFICATIONS & BEHAVIOR RULES

### 2.1 Quizie Engine (Interactive Quiz Mode)

**Purpose:** CS Core & DSA interactive assessment with custom and AI-generated questions

#### Question Categories
- Object-Oriented Programming (OOP)
- DBMS & SQL
- Operating Systems (OS)
- Data Structures & Algorithms (DSA)
- ALL (Mixed domains)

#### Quizie Behavior Rules

**Question Display:**
- One question presented at a time
- Shows question prompt, 4 multiple choice options
- Progress indicator: "Question X of Y"
- Score tracker: "Score: X / Y" (real-time update)

**Answer Submission:**
- User selects one option
- System compares against stored "correctIdx" (0-3)
- If correct: +1 to score counter, green highlight, show explanation
- If incorrect: Red highlight, show correct answer + explanation
- "Next Question" button advances to next card

**Custom Question Addition:**
- Form fields:
  - Category Domain (OOP/DBMS/OS/DSA)
  - Question Prompt (text input)
  - 4 Option inputs (Option 1-4)
  - Correct Option selector (radio: 0-3)
  - Detailed Explanation (textarea)
- Submission: Stores to local quiz deck or Firestore (cloud sync)
- Persistence: Custom questions appear in future sessions

**AI Quiz Generation:**
- Trigger: "AI Quiz" button
- Gateway Call: Sends category + number of questions to Cloudflare Worker
- Model: @cf/meta/llama-3.1-8b-instruct-fast
- Generates: 5 new MCQ questions with options and explanations
- Display: Immediately populates quizie card container
- Auto-Score Tracking: Each answer contribution tracked

---

### 2.2 Resume Matcher (Role Fit Analyzer)

**Purpose:** Analyze resume against Infosys role requirements and provide fit score

**Behavior (Conceptual from header):**
- User uploads resume or pastes content
- System analyzes against role keywords (SE/DSE/SP)
- Provides role fit percentage
- Recommendations for profile optimization
- AI-powered via Worker gateway

---

### 2.3 Exam Simulator (Timed OA Practice)

**Purpose:** Simulate real Infosys Online Assessment (OA) conditions

**Behavior Rules:**
- User selects hiring track (SE/DSE/SP)
- Timer starts based on track duration (90min for SE, 180min for DSE/SP)
- Problems load based on track's typical difficulty mix
- Real-time timer display
- Auto-submit when time expires
- Score calculated per track's scoring rule
- Results show: score, performance tier, rank estimate

---

### 2.4 CS Flashcards (High-Yield Revision)

**Purpose:** Rapid-fire revision through interactive spaced repetition flashcards

#### Flashcard Topics
- OOP Fundamentals
- DBMS & SQL
- Operating Systems
- Computer Networks
- ALL (Mixed topics)

#### Flashcard Behavior

**Card Display:**
- Front (by default): Question/Concept
- Back (on flip): Answer/Explanation
- Animation: 3D flip effect (180° rotateY transform over 0.6s)
- Progress: "Card X of Y"

**Flip Mechanism:**
- CSS perspective 3D transform
- Click card to toggle `.flipped` class
- Front and back content both rendered, visibility toggled

**Custom Flashcard Creation:**
- Form fields:
  - Topic Domain (OOP/DBMS/OS/CN)
  - Front Text (concept/question)
  - Back Text (answer/explanation)
- Submission: Stores in flashcard deck (local or Firestore)
- Persistence: Available in future sessions

**AI Flashcard Generation:**
- Button: "AI Deck"
- Calls Cloudflare Worker with topic + card count
- Model: @cf/meta/llama-3.1-8b-instruct-fast
- Generates: 5-10 flashcards on selected topic
- Format: Structured front/back pairs

**Navigation:**
- "Next Card" button advances through deck
- Can cycle through all cards in topic
- Score/progress tracked for learning analytics

---

### 2.5 AI Study Plan (Personalized Preparation Path)

**Purpose:** Generate tailored preparation schedule based on candidate profile

**Behavior (Implied):**
- Opens modal
- Analyzes candidate's solved count, strengths, weaknesses
- Recommends: Day-by-day problem solving schedule, topic focus areas, estimated completion date
- AI-generated via Worker gateway
- Can be saved to Firestore for tracking

---

### 2.6 1:1 AI Interview (Mock Defense)

**Purpose:** Simulate real Infosys technical/HR interview with AI interviewer

#### Interview Behavior

**Modes (Inferred):**
- Technical Round (CS fundamentals, problem-solving)
- HR Round (situational, motivation, communication)

**Flow:**
1. User selects interview type
2. AI interviewer (Worker model) prompts initial question
3. User provides response (text or voice transcribed)
4. AI evaluates response for:
   - Technical correctness (if technical round)
   - Communication clarity
   - Confidence
5. AI follows up with next question
6. Conversation continues for ~30-45 minutes
7. Final score + feedback provided
8. User can retry or switch modes

**Model:** @cf/meta/llama-3.1-8b-instruct-fast (conversational)

---

### 2.7 Live Campus Intel (Search Drive Web)

**Purpose:** Search and explore real Infosys recruitment drive data/announcements

**Behavior:**
- Search box for campus drive info
- Queries integrated data source (possibly API)
- Returns: Drive dates, locations, participating colleges, role availability
- Real-time updates from official Infosys portals

---

### 2.8 Problem Bank Search & Filtering

#### Search Input Rules
- Placeholder: "Search by question title, concept, algorithm, or platform..."
- Case-insensitive matching
- Applies across all indexed fields
- Real-time filtering (on keystroke)
- Results update immediately

#### Filter Application Rules
- All filters use AND logic (must satisfy all selected filters simultaneously)
- Clicking analytics chart bar auto-applies topic filter
- "Reset Filters" button clears all filters and shows full problem set (105)
- Filter state persists during session

#### Results Display
- Grid layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Each problem card shows:
  - Question number (Q#)
  - Title (2-line max)
  - Difficulty badge (Easy/Medium/Hard)
  - Category tag
  - Platform badge
  - "Solved" checkmark indicator
  - Click to open problem modal
- Results counter: "Showing X Questions"

---

### 2.9 Problem Modal (Detailed View)

**Purpose:** Comprehensive problem interface with AI-powered solution generation

#### Modal Tabs

**Tab 1: Overview & Logic**
- Question number and title
- Difficulty and category
- Hiring Track & History (which track this appeared in, year)
- Full Problem Description
- Algorithmic Approach & Logic (strategy explanation)
- Time Complexity (e.g., O(N log N))
- Space Complexity (e.g., O(N))

**Tab 2: AI Solution Generator**
- Language selector: Python 3, Java 17, C++20
- "Generate" button
- Gateway call: Sends problem description to Worker
- Model: @cf/meta/llama-3.1-8b-instruct-fast
- Output: Clean, well-commented code solution
- Display: Dark syntax-highlighted code block
- Copy button: Quick copy to clipboard (UX feature)

**Tab 3: AI Debugger & Complexity Analysis**
- User pastes their code
- "Review & Optimize Code" button
- Gateway call: Worker analyzes code for:
  - Correctness against problem constraints
  - Time/space complexity verification
  - Potential bugs or edge case misses
  - Suggestions for optimization
- Output: Structured review with specific improvement points
- Initially hidden until submission

**Tab 4: AI Test Cases**
- "Generate" button
- Gateway call: Worker generates edge cases
- Generates: Boundary inputs (N=1, N=10^5), extreme values, special patterns
- Display: List of test cases with expected outputs
- Format: Copyable input/output pairs for manual testing

#### Modal Actions (Footer)
- "Mark as Solved" button: Sets solved status, updates progress
- "Solve Practice Problem" link: External link to platform (LeetCode/GFG/etc.)
  - Opens in new tab (`target="_blank"`)

---

## 🌐 PART 3: ENDPOINTS, GATEWAY, & INFRASTRUCTURE

### 3.1 Cloudflare Workers AI Gateway Architecture

#### Gateway Overview
- **Purpose:** Secure, server-side proxy for all AI requests
- **Security Model:** Browser never sees API keys; Worker holds credentials
- **Endpoint Configuration:** Developer/Admin only input field
- **Default Model:** @cf/meta/llama-3.1-8b-instruct-fast
- **Rate Limiting:** Enforced at Worker boundary (prevents abuse)
- **Connection Status:** Real-time indicator in hero section + config modal

#### Worker Endpoint URL Format
```
https://{worker-name}.{account}.workers.dev
```
Example: `https://test-repo.navadeepch2005.workers.dev`

#### Feature → Model Bindings

| Feature | Model Binding | Use Case |
|---------|---------------|----------|
| AI Solution Generator (Tab 2) | @cf/meta/llama-3.1-8b-instruct-fast | Generate clean, optimized code |
| AI Debugger & Review (Tab 3) | @cf/meta/llama-3.1-8b-instruct-fast | Analyze code quality & complexity |
| AI Test Case Generation (Tab 4) | @cf/meta/llama-3.1-8b-instruct-fast | Synthesize edge cases |
| Quizie Engine - AI Quiz (Multi-MCQ) | @cf/meta/llama-3.1-8b-instruct-fast | Generate CS/DSA questions |
| Flashcards - AI Deck Generation | @cf/meta/llama-3.1-8b-instruct-fast | Create flashcard pairs |
| 1:1 AI Interview | @cf/meta/llama-3.1-8b-instruct-fast | Conversational mock interview |

#### Worker Connection Test
- UI Button: "Test Connection" in Worker Config Modal
- Action: Sends test payload to Worker endpoint
- Expected Response: Connection status (success/failure)
- Feedback:
  - Success: Green dot + "Connected" label + response time
  - Failure: Red dot + "Connection Failed" + error message
  - Timeout: Yellow dot + "Checking connection..." spinner

#### Configuration Storage
- **Input Field ID:** `workerEndpointInput`
- **Button Action:** "Save Gateway Endpoint"
- **Persistence:** Likely localStorage or Firestore (not explicitly stated in HTML)
- **Scope:** Developer/Admin only (comment in code suggests)

---

### 3.2 Firebase Firestore Configuration

#### Database Purpose
- Cloud-based candidate profile persistence
- Real-time data sync across devices/sessions
- Central source of truth for solved problems, quizzes, flashcards

#### CDN Version
- Firebase Compat SDK v9.23.0
- Script sources:
  - `https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js`
  - `https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js`

#### Inferred Firestore Collections & Schema

**Collection: `candidates`**
```javascript
{
  registrationNumber: "22A91A0501",  // PK
  fullName: "Rahul Sharma",
  collegeName: "Raghu Engineering College",
  branch: "B.Tech - CSE",
  graduationBatch: 2026,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  
  // Progress Tracking
  solvedProblems: ["Q001", "Q003", "Q012"],  // Array of problem IDs
  solvedCount: 3,
  lastSolvedAt: Timestamp,
  
  // Assessment Tracking
  quizScores: {
    OOP: [85, 90, 88],
    DBMS: [92, 88],
    OS: [78],
    DSA: [95, 91]
  },
  
  // Flashcard Progress
  flashcardProgress: {
    OOP: { learned: 15, remaining: 5 },
    DBMS: { learned: 12, remaining: 8 }
  },
  
  // Custom Items
  customQuizzes: [/* array of quiz objects */],
  customFlashcards: [/* array of flashcard objects */],
  customStudyPlan: { /* study plan document */ }
}
```

**Collection: `problems`**
```javascript
{
  id: "Q001",
  title: "Two Sum",
  description: "Given an array of integers...",
  difficulty: "Easy",
  category: "Arrays & Hashing",
  hiringTracks: ["SE", "DSE", "SP"],
  platform: "LeetCode",
  platformUrl: "https://leetcode.com/problems/two-sum/",
  timeComplexity: "O(N)",
  spaceComplexity: "O(N)",
  approach: "Use hash map to store complements...",
  yearAsked: 2025,
  approxFrequency: 15
}
```

#### Real-Time Sync Rules
- "Live Sync Active" indicator in footer
- Changes (solved status, quiz scores) committed to Firestore immediately
- Listeners attached to candidate document for multi-tab sync
- Fallback: localStorage for offline mode (not explicitly mentioned)

---

### 3.3 External CDN Dependencies

#### Tailwind CSS
- CDN: `https://cdn.tailwindcss.com`
- Purpose: Utility-first styling framework
- Custom color extensions (Infosys branding):
  - `infoblue: #007cc3`
  - `infodark: #002d62`
  - `amberlight: #fef3c7`
  - `slatebg: #f8fafc`

#### Chart.js
- CDN: `https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js`
- Purpose: Analytics chart rendering (topic frequency bar chart)
- Canvas ID: `topicChart`
- Responsive container: `.chart-container` (max-width: 700px)

#### Font Awesome Icons
- CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
- Purpose: UI icons throughout interface
- Usage: Classes like `fa-solid`, `fa-user`, `fa-code`, `fa-bell`, etc.

---

## 🎨 PART 4: USER INTERFACE & VISUAL ARCHITECTURE

### 4.1 Color Scheme & Branding

#### Primary Colors
- **Infosys Blue:** `#007cc3` (infoblue) - CTAs, active states, headers
- **Infosys Dark:** `#002d62` (infodark) - Deep backgrounds, footer
- **Slate Gray:** `#f8fafc` - Page background, secondary containers
- **Amber Light:** `#fef3c7` - Warning/update highlights

#### Accent Colors
- Cyan: AI-generated content
- Purple: AI features (code generation)
- Emerald: Success states, solved indicators
- Rose/Amber: Warnings, notices, errors
- Orange: Worker AI gateway status

#### Typography
- Font Family: System sans-serif (ui-monospace fallback for code)
- Base Size: 0.875rem (14px)
- Headings: Font-weight 700-900
- Body Text: Font-weight 400-600

---

### 4.2 Component Behaviors

#### Toast Notifications
- Container ID: `toastContainer`
- Position: Fixed top-right, z-index 50
- Content: Success/error messages
- Auto-dismiss: ~3 seconds
- Pointer Events: None (non-interactive)

#### Modal Backdrops
- Class: `.modal-backdrop`
- Styling: `bg-slate-900/60 backdrop-blur-sm`
- Z-index: 50 (modals), 100+ (tour overlay)
- Click outside: Closes modal (stopPropagation on modal content)

#### Scrollbars (Custom Styling)
- Applied to: `.modal-scroll`, `.chat-scroll`, `.updates-scroll`
- Width: 5px
- Thumb: `#0284c7` (cyan-blue)
- Radius: 4px

#### Spinning Ring Loaders
- CSS animations: `.spin-ring` with `@keyframes app-spin`
- Duration: 0.75s linear infinite
- Variants: `.spin-purple`, `.spin-emerald`, `.spin-indigo`
- Usage: Loading states for AI requests

#### "New" Badge Animation
- Class: `.new-starburst`
- Animation: Pulse & rotate (-3deg to +3deg, scale 1 to 1.1)
- Duration: 1.5s infinite alternate
- Used for: Latest updates indicator

---

### 4.3 Interactive Tour Overlay

#### Tour Purpose
- Feature walkthrough for new users
- Accessible via "?" button in header
- Auto-triggers on first visit (conditional)

#### Tour Architecture
- Overlay: Dark semi-transparent backdrop with blur
- Spotlight: Animated ring around highlighted element
- Card: Floating instruction card with step info
- Steps: Likely 5+ steps covering major sections

#### Tour Navigation
- Previous/Next buttons (conditionally disabled)
- Skip button: Dismiss tour entirely
- Step badge: "Step X of Y"
- Title + Description text for each step

#### Tour Content (Inferred Steps)
1. Authentication & Registration
2. Problem Bank & Filtering
3. Problem Modal & AI Tools
4. Analytics & Track Information
5. AI Tools Hub Menu
6. (Possibly more on flashcards/quizzes)

---

## ⚙️ PART 5: CONFIGURATION & DEPLOYMENT RULES

### 5.1 Application Configuration

#### Header Configuration
- Total Problem Count: **105** (displayed as `headerTotalCount`)
- Batch Year: **2026**
- Portal Name: **InfyTrack**
- Tagline: "Infosys Technical Recruitment Coding Intelligence Portal"

#### URL Navigation Anchors
- `#overview` - Hero section
- `#tracks` - Hiring tracks framework
- `#analytics` - Pattern frequency chart
- `#questions` - Problem bank grid
- `#interview` - CS core section

#### Environment Variables (Implied, Not Exposed in HTML)
- Firebase Project Config (projectId, apiKey, etc.)
- Cloudflare Worker Endpoint (stored locally or in config modal)
- API Rate Limits (enforced server-side)

### 5.2 Deployment Architecture

#### Hosting
- **Domain:** https://infosys-prep-site.vercel.app (Vercel)
- **Repository:** GitHub (NavdeepCh/Infosys-PrepSite)
- **Build Tool:** Likely Vercel auto-deployment from GitHub
- **Pages:** GitHub Pages enabled for repo visibility

#### Frontend Stack
- **HTML:** Semantic structure, accessibility-first
- **CSS:** Tailwind CSS (utility-first)
- **JavaScript:** Vanilla JS (no framework bundler dependencies visible)
- **CDN Approach:** All libs served via CDN (Tailwind, Chart.js, Font Awesome, Firebase)

#### API Layer
- **Proxy:** Cloudflare Workers (gateway for AI requests)
- **Database:** Firebase Firestore (real-time sync)
- **Auth:** Client-side registration number validation

### 5.3 Performance Optimizations

#### CSS Animations
- Hardware-accelerated transforms (GPU-rendered)
- Specific timing functions for smooth 60fps:
  - Modal transitions: 0.3s ease-in-out
  - Flashcard flip: 0.6s
  - Loader: 0.75s linear
  - Chart updates: 500ms smooth transition

#### Responsive Design
- Mobile-first media queries
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Collapsible nav: Hidden on mobile, shown on lg+
- Grid columns: 1 (mobile) → 2 (tablet) → 3 (desktop)

#### Lazy Loading (Inferred)
- Modal content: Only rendered when modal opened
- Images: Font Awesome SVG icons (lightweight)
- Chart: Rendered only in analytics section (below fold)

---

## 🔐 PART 6: SECURITY & DATA PROTECTION

### 6.1 Security Architecture Rules

#### Server-Side API Key Management
- **Rule:** API keys NEVER sent to browser
- **Implementation:** Cloudflare Worker holds all credentials
- **Request Flow:**
  1. Browser sends request to Worker endpoint
  2. Worker authenticates using stored API key
  3. Worker calls LLM service (e.g., Anthropic, OpenAI via CF)
  4. Worker returns result to browser
  5. Browser displays result

#### Rate Limiting Strategy
- **Enforcement Point:** Cloudflare Worker boundary
- **Mechanism:** Likely token bucket or sliding window
- **Limits (Implied):**
  - AI code generation: ~5 requests per user per day
  - AI quiz generation: ~3 per session
  - Flashcard generation: ~2 per session
- **Timeout:** Request aborted if exceeds limit
- **User Feedback:** Toast notification: "Rate limit reached. Try again later."

#### Data Privacy Rules
- **Firestore Access:** Limited to authenticated candidates
- **User Data:** Registration number as PK (no PII exposure)
- **Custom Items:** Private to candidate (no sharing between users)
- **Problem Solutions:** Shared problem pool (not private)

#### CORS & Cross-Origin Rules
- Worker endpoint accessible from Vercel domain
- External platform links (LeetCode, GFG) open in `target="_blank"` (new tab)
- Font Awesome/Tailwind CDNs: Public, no auth required

---

### 6.2 Error Handling & Recovery Rules

#### Authentication Errors
- Registration number not found → Display error card with "Sign Up" CTA
- Empty registration field → Show validation message
- Multiple failed attempts → (Not explicitly stated; likely rate-limited)

#### Gateway/API Errors
- Worker connection failed → Show red dot + "Connection Failed" message
- API timeout → Show spinner → Toast: "Request taking longer than expected"
- Invalid response → Toast: "Error processing request. Please try again."

#### Data Sync Errors
- Firestore write fails → Retry logic (implicit in SDK)
- Offline mode → (Not explicitly handled; may use localStorage fallback)

---

## 📈 PART 7: ANALYTICS & TRACKING

### 7.1 Progress Metrics

#### Solved Problems Counter
- **Display:** Header badge + hero section progress bar
- **Update Trigger:** User clicks "Mark as Solved" button
- **Calculation:** `solvedCount / 105 × 100 = progress %`
- **Persistence:** Stored in Firestore, restored on login

#### Quiz Score Tracking
- **Storage:** Nested Firestore object by category (OOP, DBMS, OS, DSA)
- **Format:** Array of scores for each category
- **Display:** Quizie modal header shows "Score: X / Y"
- **Aggregation:** Average score per category (implied for analytics)

#### Flashcard Learning Progress
- **Tracking:** Learned vs. remaining cards per topic
- **Persistence:** Firestore sub-document
- **Display:** Flashcard modal progress: "Card X of Y"

#### Chart Analytics
- **Chart Type:** Bar chart (Chart.js)
- **Data:** Problem frequency by algorithmic category
- **Interactivity:** Click bar → Auto-filter problem bank to that category
- **Labels:** Category names, frequency percentage
- **Y-axis:** Frequency count or percentage (0-60%)
- **X-axis:** 8 categories

---

### 7.2 Latest Updates Feed

#### Update Categories
1. **Notices** (Default tab)
   - High-priority campus announcements
   - Application deadlines
   - Drive schedule changes
2. **News / Events**
   - Infosys hackathons
   - Technology webinars
   - Recruitment drive announcements
3. **Clubs**
   - Student club activities
   - Tech community events
   - Study group formations

#### Update Display Rules
- **Format:** Card-based timeline
- **Max Visible:** ~5 items (scrollable)
- **Metadata:** Timestamp, category badge, title
- **Action:** Click to expand or external link
- **Live Indicator:** Green pulsing dot + "Live Sync Active" text

#### Update Docking Mechanism
- **Floating Ball:** Bottom-right corner (when logged in)
- **Notification Badge:** Red circle with count (when new updates arrive)
- **Dock Button:** Moves card to footer bar
- **Undock Button:** "View" button in footer reopens full card

---

## 🚀 PART 8: USAGE WORKFLOW & USER JOURNEYS

### 8.1 First-Time User Onboarding

**Journey: New Candidate Registration**
1. Land on portal (Auth Modal displayed by default)
2. Click "Sign Up" tab
3. Enter registration number (10 chars)
4. Enter full name
5. Enter college name
6. Select degree/branch
7. Select graduation batch
8. Click "Create Account & Start"
9. Firestore creates candidate document
10. Auto-login and redirect to main dashboard
11. Interactive tour offered (opt-in)
12. Explore hero section → Hiring tracks → Analytics → Problem bank

### 8.2 Existing Candidate Workflow

**Journey: Continue Preparation**
1. Land on portal (Auth Modal displayed)
2. Enter registration number
3. Click "Sign In & Restore Profile"
4. Firestore fetches candidate data
5. UI updates:
   - User badge shows registration number
   - Solved count updates
   - Progress bar animates to saved progress %
6. Browse problem bank
7. Click problem → Opens modal
8. Explore problem details
9. Option A: Generate AI solution → Study approach
10. Option B: Paste own solution → Get AI review
11. Mark as solved → Progress updates
12. Navigate to next problem or switch track focus

### 8.3 AI Preparation Accelerator Workflow

**Journey: AI Quiz Session**
1. Click "Quizie Engine" button
2. Quizie modal opens
3. Select category (OOP/DBMS/OS/DSA/ALL)
4. Load default questions or click "AI Quiz"
5. AI generates 5 questions
6. Answer each question
7. Get immediate feedback
8. Score updates
9. View explanation
10. Move to next question
11. Finish quiz → See final score
12. Option: Retake, switch category, or add custom questions

**Journey: 1:1 AI Interview**
1. Click "1:1 AI Interview" button
2. Select interview type (Technical/HR)
3. AI interviewer asks opening question
4. User responds (text input)
5. AI evaluates response
6. AI asks follow-up or next question
7. Continue for ~30-45 min
8. Interview ends → Get performance feedback
9. Score: (e.g., "78/100 - Good communication, needs technical depth")
10. Option: Retry, switch type, or download interview transcript

---

## 🎯 PART 9: TROUBLESHOOTING & COMMON SCENARIOS

### 9.1 Registration Number Not Found

**Scenario:** User enters registration number during sign-in, system cannot find it.

**Expected Behavior:**
- Error card displays: "Registration number not registered in the system."
- CTA button: "Click Here to Sign Up Now" (redirects to Sign Up tab)
- User cannot proceed until they either:
  - Enter a valid registered number
  - Create a new account

### 9.2 Worker Gateway Connection Failure

**Scenario:** User clicks "Test Connection" but Worker endpoint is unreachable.

**Expected Behavior:**
- Modal connection status updates:
  - Dot color: Red
  - Label: "Connection Failed"
  - Error message: Details of failure (timeout, 404, etc.)
- AI Tools disabled with message: "Gateway offline. Try again later."
- User can manually re-enter endpoint URL and retry

### 9.3 Offline / Lost Connectivity

**Scenario:** User loses internet connection mid-session.

**Expected Behavior (Inferred):**
- Local storage preserves solved problems
- Firestore sync resumes when connection restored
- Toast notification: "Syncing changes..." → "Synced successfully"
- UI remains functional (read-only mode for offline)

### 9.4 Rate Limit Exceeded

**Scenario:** User generates too many AI quizzes in quick succession.

**Expected Behavior:**
- Toast notification: "Rate limit reached. Please try again in X minutes."
- Button disabled with spinner
- Retry available after cooldown period

---

## 📞 SUPPORT & ADDITIONAL RESOURCES

### Footer Information
- **Portal Name:** InfyTrack • Infosys Recruitment Empirical Analysis & Dynamic AI Assistant
- **Data Source:** "Synthesized from Infosys recruitment drive technical transcripts and platform evaluations"
- **License:** MIT (from repo metadata)
- **GitHub Repository:** https://github.com/NavdeepCh/Infosys-PrepSite

### Linked External Resources
- **LeetCode:** https://leetcode.com/
- **GeeksforGeeks:** https://www.geeksforgeeks.org/
- **CodeChef:** https://www.codechef.com/
- **HackerRank:** https://www.hackerrank.com/

---

## 📋 APPENDIX: QUICK REFERENCE TABLE

| Feature | Trigger | Gateway Model | Output | Persistence |
|---------|---------|--------------|--------|-------------|
| AI Solution Generator | "Generate" button | Llama 3.1 8B | Code (Python/Java/C++) | Not stored (display only) |
| AI Code Review | "Review & Optimize" | Llama 3.1 8B | Feedback + suggestions | Not stored |
| AI Test Cases | "Generate" button | Llama 3.1 8B | Edge case inputs | Not stored |
| AI Quiz | "AI Quiz" button | Llama 3.1 8B | 5 MCQ questions | Scores stored in Firestore |
| AI Flashcards | "AI Deck" button | Llama 3.1 8B | 5-10 flashcard pairs | Stored in custom collection |
| AI Interview | Launch button | Llama 3.1 8B | Conversational responses | Score stored in Firestore |
| Problem Solve | Mark as Solved | None | Status flag | Firestore (solvedProblems array) |
| Quiz Answer | Submit option | None | Score +1 | Firestore (quizScores object) |
| Flashcard Flip | Click card | None | Visual flip | Local state (session) |

---

## 🔄 CHANGE LOG

**Version 2026.1 (Current)**
- 105 cataloged problems across 4 platforms
- 3 hiring tracks (SE, DSE, SP) with detailed benchmarks
- 6 AI preparation accelerators
- Cloudflare Workers AI gateway with rate limiting
- Firebase Firestore real-time sync
- Interactive tour overlay with 5+ steps
- Latest updates feed (Notices, News, Clubs)
- Responsive mobile-first design

---

**Document Prepared By:** Navadeep Ch
**Date:** August 20, 2026  
**Portal Status:** Active & Production-Ready

