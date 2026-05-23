# Project Guide

## Documents

* `docs/business_requirements.md` - Business requirements document
* `docs/system_requirements.md` - System requirements document

## Tech Stack

| Category | Technology |
| --- | --- |
| Package Manager | pnpm |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | shadcn/ui |
| Styling | Tailwind CSS v4 |
| Linter/Formatter | Biome |
| Deployment | Vercel |

## Primary Development Commands

```bash
pnpm dev                 # Start development server (http://localhost:3000)
pnpm build               # Production build (Static export → ./out/)
pnpm start               # Start production server
pnpm lint                # Code check
pnpm format              # Format code
pnpm deploy              # Build + Deploy to Firebase Hosting

pnpm add <package>       # Add dependency package
pnpm add:ui <component>  # Add shadcn UI component (e.g., `pnpm add:ui button`)
```

## Folder Structure

```
<project root directory>/
├── src/                         # Source code
│   ├── app/                     # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout (Server Component)
│   │   ├── page.tsx             # Home/Settings screen (Client Component)
│   │   ├── globals.css          # Global CSS (Tailwind import)
│   │   └── <screen-name>/
│   │       └── page.tsx         # Screen implementation (Client Component)
│   ├── components/              # UI components (Shared)
│   ├── utils/                   # Shared logic
│   ├── stores/                  # State management
│   └── data/                    # Static data
├── public/                      # Static assets
└── README.md                    # Project documentation

```

## Coding Conventions

### TypeScript

* **strict mode**: Enabled in `tsconfig.json`
* **Path Aliases**: `@/*` → `src` directory (e.g., `@/types`, `@/components/QuizCard`)
* **Target**: ES2017
* **Module Resolution**: bundler

### File Naming Conventions

| Type | Naming | Example |
| --- | --- | --- |
| Page | `page.tsx` | `src/app/quiz/page.tsx` |
| Layout | `layout.tsx` | `src/app/layout.tsx` |
| Component | PascalCase | `src/components/QuizCard.tsx` |
| Utility | camelCase | `src/utils/quizLogic.ts` |
| Type definisions | `*.type.ts` | `src/utils/quizLogic.type.ts` |
| Unit test | `*.test.ts` | `src/utils/quizLogic.test.ts` |
