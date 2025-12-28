# Arko MKT

Official website and portfolio for Arko MKT, a digital marketing and AI agency based in Mexico City.

## Stack

- Next.js 16.1.1, React 19.2.3, TypeScript 5.9
- Tailwind CSS 4.1
- Framer Motion 12.23
- next-intl 4.6
- MDX 3.1 (@mdx-js/loader, @mdx-js/react, @next/mdx)
- Deployment to Vercel

## File Structure

```
arkomkt-website/
├── .agents/
│   ├── PLAN.md                    # Action plan before execution
│   ├── PROGRESS.md                # State tracking
│   └── designs/
│       ├── README.md              # Design reference overview
│       ├── components/            # Component design references
│       └── animations/
│           └── README.md          # Animation specs and timing
├── docs/
│   ├── architecture.md            # App structure, rendering, data flow
│   ├── components.md              # Component patterns and conventions
│   ├── content.md                 # How to manage content (projects, blog)
│   └── styling.md                 # Design tokens, Tailwind patterns
├── app/
│   ├── page.tsx               # Main page
│   ├── proyectos/
│   │   ├── page.tsx           # Projects search page
│   │   └── [slug]/page.tsx    # Individual project pages
│   ├── globals.css
│   └── layout.tsx             # Root layout
├── components/
│   ├── ui/                        # Reusable UI primitives
│   ├── sections/                  # Page sections (Hero, Services, etc.)
│   └── layout/                    # Navbar, Footer, etc.
├── content/
│   ├── projects/
│   │   ├── es/                    # Spanish project MDX files
│   │   ├── en/                    # English project MDX files
│   │   └── fr/                    # French project MDX files
│   └── blog/
│       ├── es/
│       ├── en/
│       └── fr/
├── data/
│   ├── services.json              # Service categories and items
│   ├── clients.json               # Client logos
│   └── site.json                  # UI strings, metadata
├── lib/
│   ├── utils.ts                   # Utility functions
│   └── content.ts                 # MDX content helpers
├── messages/
│   ├── es.json                    # Spanish translations
│   ├── en.json                    # English translations
│   └── fr.json                    # French translations
├── public/
│   ├── images/
│   ├── logos/
│   └── projects/
├── AGENTS.md
├── .gitignore
└── README.md
```

## Rules

1. Always read AGENTS.md to understand the project context
2. For tasks involving more than 3 files or significant logic changes, write an action plan in `.agents/PLAN.md` before executing. For small fixes, proceed directly. PLAN.md is per-task, overwritten each time.
3. Use TypeScript instead of JavaScript. Never use `any` type.
4. Only do and write what you are tasked to do
5. If instructions are unclear, ask for clarification
6. Before using any external library or API, check its documentation. Do not assume API signatures from memory.
7. Always use global styles defined in `app/globals.css`
8. Update `.agents/PROGRESS.md` after every task completion
9. Read the `/docs` folder whenever necessary
10. Before implementing any UI component, check `.agents/designs/` for reference screenshots. Match the design as closely as possible. Follow guidelines in `docs/styling.md`
11. If a design is ambiguous or missing, ask before improvising
12. Check `.agents/designs/animations/` for animation specs and GIF references before implementing any motion or transitions
13. Match animation timing and easing exactly as specified
14. Spanish is the default language. All content must support ES, EN, FR.

## Pages

| Page | Route (ES) | Description |
|------|------------|-------------|
| Main | `/` | Hero, Clients, About, Projects, Services, CTA |
| Projects | `/proyectos` | Search page with service filters |
| Project Detail | `/proyectos/[slug]` | Individual project case study |
| Contact | `/contacto` | Contact form/CTA |
| Blog | `/blog` | Future implementation |

## Navbar Links

- Inicio
- Acerca de Arko
- Servicios
- Proyectos
- Contacto

## Features

- Light/dark mode toggle (Tailwind class strategy)
- Language toggle (ES/EN/FR) with SEO-friendly URLs
- Framer Motion animations (page transitions, scroll reveals, hover effects)
- MDX for rich project and blog content

## Service Categories

| Category | Color |
|----------|-------|
| Audiovisual | Baby Blue |
| Desarrollo | Baby Green |
| Comunicacion | Baby Pink |
| Diseno | Baby Oragnce |
| Performance Marketing | Baby Purple |
| Asesoria | Baby Yellow |

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint code

## Documentation

| Topic | File |
|-------|------|
| Architecture | docs/architecture.md |
| Components | docs/components.md |
| Content Management | docs/content.md |
| Styling | docs/styling.md |

Read relevant docs before making significant changes.

## Do Not

- Use `any` type in TypeScript
- Skip error handling
- Add dependencies without discussion
- Hardcode text strings (use i18n)
- Ignore mobile responsiveness
- Implement features not requested
