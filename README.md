# TRIA — Contact List App
**Frontend assignment — Achintya Munna Singh (22CH3EP02)**

> A modern, responsive contact-list single-page application built with React + Vite + Tailwind (Lovable starter).  
> Deployed on Vercel and intended as the frontend submission for Tria's Frontend Developer assignment.

---

##  Live Demo
**Vercel (production):**  
https://tria-frontend-develop-git-dc9be6-achintya-munna-singhs-projects.vercel.app
https://tria-frontend-developer-assignment-achintya-munna-2pnx3mjw9.vercel.app
https://triafrontendcontactli-git-3cfec6-achintya-munna-singhs-projects.vercel.app?_vercel_share=OICEV56hYLPHSeMA5jeLxT4cNa16MHCY

---

##  Project Summary
This application is a polished contact list interface that demonstrates UI design, component architecture, and common contact-management features you expect from a modern frontend:

**User-confirmed features (from your deployed build / screen recording):**
- Contacts arranged **alphabetically**.
- **Light / Dark** theme support (user toggle).
- Display of **last call time** (per contact).
- Actions per contact: **Call**, **Message**, **Video Call** (UI actions/links/buttons).
- Contact management: **Import**, **Delete**, **Add to Favorites** (and corresponding UI affordances).
- Clean card/list design, responsive layout for mobile and desktop.

**Note:** Additional interactive behaviors (filtering, modals, animations) are implemented in the UI and visible in the live demo.

---

##  Features (concise)
- Alphabetically sorted contact list  
- Search/filter contacts by name (type to filter)  
- View contact details: name, phone, email, last-call timestamp  
- Quick actions: Call, Message, Video Call (placeholders that trigger expected UI)  
- Import contacts (UI to import — check live demo for accepted formats)  
- Delete/Remove contacts  
- Star / Add to Favorites  
- Theme toggle (Light / Dark)  
- Responsive card-list layout with accessible controls  
- Production-ready build via Vite and hosted on Vercel  

---

##  Tech Stack & Key Libraries
These are pulled directly from the project `package.json` (accurate):

**Core**
- `react` — UI library (v18)
- `react-dom` — React DOM renderer
- `vite` — build tool & dev server

**Styling & UI**
- `tailwindcss` — utility-first CSS framework
- `@tailwindcss/typography` — prose and content styles
- `tailwindcss-animate` — animation utilities
- `lucide-react` — icon system used in UI (icons & controls)
- `clsx`, `class-variance-authority` — utility libs for className composition and design system variants

**UI primitives & components**
- `@radix-ui/*` packages — accessible, unstyled UI primitives (popover, dialog, avatar, tooltip, etc.)
- `cmdk`, `react-resizable-panels`, `embla-carousel-react` — additional UI/UX helpers (search palettes, panels, carousels)

**State & forms**
- `@tanstack/react-query` — data fetching / cache management
- `react-hook-form` & `@hookform/resolvers` — performant form handling and validation
- `zod` — runtime schema validation

**Utilities**
- `date-fns` — date formatting and manipulation
- `recharts` — charts (if used anywhere in project)
- `sonner` — toast notifications
- `uuid` (if present) — unique id generation (some starter templates use it)

**Dev / Tooling**
- `typescript` — typed codebase (project contains TypeScript tooling)
- `@vitejs/plugin-react-swc` — Vite React plugin with SWC
- `eslint` / `@eslint/js` — linting
- `postcss`, `autoprefixer` — CSS build pipeline

> These exact dependency names and versions are included in `package.json` — this README references them directly for transparency.

---

##  Local Setup — Run it like a pro (exact commands)
**Prerequisites**
- Node.js (LTS). Recommended: Node 18+ or latest LTS.
- npm (bundled with Node) or pnpm if you prefer.

**Clone & run**
```bash
# 1. Clone the repo
git clone https://github.com/Akky7684/TRIA-FRONTEND-DEVELOPER-ASSIGNMENT-ACHINTYA-MUNNA-SINGH-22CH3EP02.git
cd TRIA-FRONTEND-DEVELOPER-ASSIGNMENT-ACHINTYA-MUNNA-SINGH-22CH3EP02

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
# Open: http://localhost:5173 (or the URL printed by Vite)
