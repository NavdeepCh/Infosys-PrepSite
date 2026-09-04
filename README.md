# 📘 INFYTRACK - Placement Training & Coding Preparation Portal

**Version:** 2026 Batch  
**Live Portal:** https://infytrack.vercel.app/  
**Repository:** NavdeepCh/Infosys-PrepSite  
**License:** MIT

---

## 🎯 Executive Summary

**INFYTRACK** is a comprehensive, AI-powered web-based assessment platform designed for campus placement preparation and technical recruitment. It serves as an **empirical coding assessment engine** that aggregates interview problems from top competitive programming platforms and provides personalized preparation tools powered by AI.

### Key Highlights
- ✅ **105 Curated Problems** across 4 competitive programming platforms (LeetCode, GeeksforGeeks, CodeChef, HackerRank)
- ✅ **3 Skill-Based Tracks** with distinct difficulty levels and compensation tiers (₹3.6L – ₹21L LPA)
- ✅ **6 AI-Powered Learning Tools** using Cloudflare Workers AI (Llama 3.1 8B)
- ✅ **Real-time Cloud Sync** via Firebase Firestore
- ✅ **Secure Server-Side Architecture** with Cloudflare Workers gateway
- ✅ **Interactive Learning Ecosystem** with flashcards, quizzes, mock interviews, and resume analysis

---

## 📊 Platform Overview

### Core Features

#### 1. **Problem Bank** (105 Questions)
A comprehensive curated problem collection with advanced filtering capabilities:

| Feature | Details |
|---------|---------|
| **Total Problems** | 105 questions across 4 platforms |
| **Difficulty Levels** | Easy, Medium, Hard |
| **Algorithmic Categories** | 8 major categories (Arrays, DP, Graphs, etc.) |
| **Platform Sources** | LeetCode, GeeksforGeeks, CodeChef, HackerRank |
| **Real-time Progress** | Solved count tracking with progress bar |
| **Smart Search** | Search by title, concept, algorithm, or platform |
| **Multi-filter Support** | Combine difficulty, track, category, and platform filters |

#### 2. **Three Skill-Based Tracks**

**🔷 Foundation Track - Entry Level**
- **Duration:** 90 minutes
- **Structure:** 2 Coding Problems + Aptitude Section
- **Scoring:** 40% Aptitude + 60% Coding
- **Benchmark:** Solving 1 problem fully guarantees consideration
- **Expected Salary:** ₹3.60 – ₹4.00 LPA
- **Focus Domains:** Basic Arrays, Strings, Elementary Math
- **Target Candidates:** 1st year students, beginners

**🔶 Intermediate Track - Professional Level**
- **Duration:** 3 hours (180 minutes)
- **Structure:** 3 Coding Problems (Easy, Medium, Hard)
- **Scoring:** Q1 (20 marks) + Q2 (30 marks) + Q3 (50 marks)
- **Benchmark:** Solving Q1 + Q2 fully qualifies for this profile
- **Expected Salary:** ~₹6.25 LPA
- **Status:** ⭐ Most Popular Track
- **Focus Domains:** Two Pointers, Sliding Window, Greedy, 1D DP
- **Target Candidates:** Experienced candidates, mid-level

**🔴 Advanced Track - Expert Level**
- **Duration:** 3 hours (180 minutes)
- **Structure:** 3-4 Complex Algorithmic Challenges
- **Benchmark:** Solving the third/fourth hard problem unlocks elite tier
- **Expected Salary:** ₹9.50 – ₹21.00 LPA
- **Status:** 🏆 Premium/Advanced Track
- **Focus Domains:** Multi-D DP, Segment Trees, Bitmasking, Graph Algorithms
- **Target Candidates:** Competitive programmers, algorithm specialists

#### 3. **AI-Powered Learning Tools** (6 Tools)

| Tool | Purpose | AI Model | Output |
|------|---------|----------|--------|
| **AI Solution Generator** | Generate optimized code solutions | Llama 3.1 8B | Code (Python/Java/C++) |
| **AI Code Debugger** | Review & optimize your code | Llama 3.1 8B | Feedback + complexity analysis |
| **AI Test Case Generator** | Generate edge cases | Llama 3.1 8B | Boundary test inputs |
| **Quiz Engine** | Interactive CS/DSA quizzes | Llama 3.1 8B | 5 MCQ questions per session |
| **Flashcard Deck** | High-yield revision cards | Llama 3.1 8B | 5-10 flashcard pairs |
| **Mock Interview** | Realistic technical & HR interviews | Llama 3.1 8B | Real-time feedback + scoring |

#### 4. **Premium Features**

- **Resume Matcher:** Analyze resume against role requirements
- **Practice Exam Simulator:** Timed assessment under real conditions
- **AI Study Planner:** Personalized preparation schedule
- **Campus Drive Updates:** Real-time recruitment announcements
- **Interactive Onboarding:** Guided feature walkthrough for new users
- **Learning Feed:** Latest updates, events, and community news

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** (98.6%) - Semantic markup with accessibility-first design
- **JavaScript** (1.4%) - Vanilla JS (no framework dependencies)
- **CSS** - Tailwind CSS v3+ with custom branding colors

### Backend & Infrastructure
- **Database:** Firebase Firestore (real-time cloud sync)
- **AI Gateway:** Cloudflare Workers with Llama 3.1 8B model
- **Hosting:** Vercel (https://infytrack.vercel.app)
- **CDN:** Firebase SDK, Tailwind CSS, Chart.js, Font Awesome

### API & External Services
- **Firebase Authentication:** Client-side registration validation
- **Cloudflare Workers AI:** Server-side LLM inference
- **Chart.js:** Analytics visualization
- **Font Awesome 6.4:** Comprehensive icon library

---

## 🎨 Design & UX

### Color Scheme
- **Primary Blue:** `#007cc3` - Primary CTAs and headers
- **Deep Navy:** `#002d62` - Deep backgrounds
- **Light Slate:** `#f8fafc` - Secondary containers
- **Accent Colors:** Cyan (AI), Purple (Generation), Emerald (Success)

### Responsive Design
- **Mobile-first approach** with Tailwind breakpoints
- **Grid layouts:** 1 column (mobile) → 2 (tablet) → 3 (desktop)
- **Custom scrollbars** with brand blue styling
- **Smooth animations:** 0.3-0.6s transitions for modals and interactions

### Interactive Components
- 🎬 **Interactive Tour:** 5+ step walkthrough for new users
- 🎯 **Toast Notifications:** Success/error feedback with auto-dismiss
- 📊 **Analytics Charts:** Click-to-filter problem bank interaction
- ✨ **Animated Progress:** Live counter updates with smooth transitions

---

## 📋 User Workflows

### 1. First-Time Setup
```
Visit Portal 
  ↓
Sign Up (10-char registration number)
  ↓
Complete Profile (Name, College, Branch, Graduation Year)
  ↓
Create Account & Auto-Login
  ↓
Interactive Tour
  ↓
Start Learning
```

### 2. Solving a Problem
```
Browse Problem Bank
  ↓
Click Problem Card → Opens Detailed View
  ↓
Read Solution, View AI Code, or Debug Your Code
  ↓
Mark as Solved
  ↓
Progress Updated Automatically
```

### 3. AI Learning Session
```
Select AI Tool (Quiz/Flashcards/Interview)
  ↓
Choose Topic/Category
  ↓
AI Generates Personalized Content
  ↓
Practice & Receive Feedback
  ↓
Performance Score Saved
```

---

## 🔐 Security & Privacy

### Data Protection
- ✅ **API Keys:** Stored server-side only (Cloudflare Workers), never exposed to browser
- ✅ **User Access:** Limited to authenticated candidates via registration validation
- ✅ **Rate Limiting:** Enforced at Worker boundary to prevent misuse
- ✅ **CORS Protection:** Worker endpoint accessible only from authorized domain

### Authentication System
- **Method:** Registration number (10-character alphanumeric)
- **Validation:** Case-insensitive, verified against Firestore registry
- **Session:** Persists across tabs; multi-device restore via registration number
- **Logout:** "Switch Profile" option clears active session
- **Data Privacy:** All personal data stored securely in Firestore

---

## 📊 Analytics & Progress Tracking

### Key Metrics
- **Solved Problems Counter:** Real-time badge in header
- **Progress Percentage:** `(Solved Count / 105) × 100`
- **Quiz Performance:** Tracked by category (OOP, DBMS, OS, DSA)
- **Learning Progress:** Cards completed per flashcard topic

### Problem Distribution by Category
| Algorithmic Pattern | Frequency | Difficulty Level |
|---------|-----------|-------------|
| Arrays & Hashing | 53% | Foundation → Advanced |
| Dynamic Programming | 18% | Intermediate → Advanced |
| Two Pointers/Sliding Window | 12% | Foundation → Intermediate |
| Greedy & Searching | 8% | Foundation → Intermediate |
| Math & Number Theory | 5% | Foundation |
| Trees & Graphs | 3% | Advanced |
| Bit Manipulation & Tries | 1% | Advanced |

---

## 🚀 Getting Started

### Live Environment
- **URL:** https://infytrack.vercel.app
- **Repository:** https://github.com/NavdeepCh/Infosys-PrepSite
- **Hosting:** Vercel (auto-deploy from GitHub)
- **Build:** Static HTML/CSS/JS (no build process needed)

### Local Setup
```bash
# Clone the repository
git clone https://github.com/NavdeepCh/Infosys-PrepSite.git
cd Infosys-PrepSite

# Start local server (Python)
python -m http.server 8000

# OR using Node.js
npx http-server

# Access at http://localhost:8000
```

### Configuration Steps
1. **Firebase Config:** Update Firestore credentials in HTML
2. **Worker Gateway:** Set Cloudflare Worker endpoint in Admin panel
3. **Connection Test:** Verify AI gateway is operational
4. **Start Preparing:** Browse problems and select your track

---

## 📈 Performance & Optimization

### Frontend Optimizations
- **GPU-Accelerated Animations** - Smooth 60fps transitions
- **Lazy Loading** - Modal content rendered on-demand
- **SVG Icons** - Lightweight and scalable
- **Responsive Media** - Adaptive sizing for all devices

### Backend Efficiency
- **Cloudflare Edge:** Global availability with minimal latency
- **Firebase Firestore:** Optimized queries with real-time sync
- **Smart Rate Limiting:** Fair usage while maintaining performance

---

## 🎯 Problem Categories Guide

### Foundation Level Problems
- **Arrays & Strings:** Two-pointer techniques, sliding window
- **Basic Math:** Number theory, modular arithmetic
- **Simple Recursion:** Basic backtracking patterns

### Intermediate Level Problems
- **Advanced Searching:** Binary search variants
- **Greedy Algorithms:** Interval scheduling, activity selection
- **1D Dynamic Programming:** Classic DP patterns

### Advanced Level Problems
- **Graph Algorithms:** Shortest path, MST, topological sort
- **Advanced DP:** Multi-dimensional DP, optimization problems
- **Complex Data Structures:** Segment trees, tries, heaps

---

## 📚 Learning Resources

### External Coding Platforms
- **LeetCode:** https://leetcode.com/
- **GeeksforGeeks:** https://www.geeksforgeeks.org/
- **CodeChef:** https://www.codechef.com/
- **HackerRank:** https://www.hackerrank.com/

### Features Used
> "Synthesized from technical recruitment assessments and coding interview patterns"

---

## 📝 License

This project is licensed under the **MIT License** - see LICENSE file for full details.

---

## 🔄 Version History

**Version 2026.1 (Current)**
- ✅ 105 curated problems from top platforms
- ✅ 3 skill-based tracks with progression paths
- ✅ 6 AI-powered learning tools
- ✅ Cloudflare Workers AI integration
- ✅ Firebase Firestore real-time sync
- ✅ Interactive guided tour
- ✅ Community updates feed
- ✅ Fully responsive mobile-first design
- ✅ Advanced analytics dashboard

---

## 🤝 Contributing

Contributions welcome! Please ensure:
1. Follow Tailwind CSS utility-first patterns
2. Maintain Firebase schema compatibility
3. Test AI prompts for quality
4. Verify mobile responsiveness

---

## 💡 Platform Statistics

- **Total Curated Problems:** 105
- **AI Model:** Llama 3.1 8B Instruct
- **Supported Languages:** Python 3, Java 17, C++20
- **Difficulty Tracks:** 3 levels
- **Salary Range:** ₹3.6L – ₹21L LPA
- **Algorithm Categories:** 8 major patterns
- **CSS Framework:** Tailwind CSS v3+
- **Database:** Firebase Firestore

---

## 📧 Get in Touch

**Developer:** NavdeepCh  
**GitHub Profile:** https://github.com/NavdeepCh  
**Live Portal:** https://infytrack.vercel.app

---

**Last Updated:** August 2026  
**Repository:** NavdeepCh/Infosys-PrepSite
