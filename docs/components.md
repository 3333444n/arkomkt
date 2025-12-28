# Component Patterns

## Directory Structure

```
components/
├── ui/                    # Reusable UI primitives
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx          # Service pills
│   ├── Input.tsx
│   └── ...
├── sections/              # Page sections
│   ├── Hero.tsx
│   ├── ClientStrip.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Services.tsx
│   └── CTA.tsx
└── layout/                # Layout components
    ├── Navbar.tsx
    ├── Footer.tsx
    ├── MobileMenu.tsx
    ├── ThemeToggle.tsx
    └── LanguageToggle.tsx
```

## Naming Conventions

- **Components**: PascalCase (`ProjectCard.tsx`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Styles**: Component-scoped or Tailwind classes
- **Types**: PascalCase with descriptive suffix (`ProjectCardProps`)

## Component Template

```typescript
'use client'; // Only if client-side interactivity needed

import { motion } from 'framer-motion';

interface ComponentNameProps {
  // Props with TypeScript types
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Component content */}
    </motion.div>
  );
}
```

## Server vs Client Components

### Server Components (default)
- Data fetching
- Static content rendering
- No interactivity needed

### Client Components (`'use client'`)
- Event handlers (onClick, onChange)
- Hooks (useState, useEffect)
- Browser APIs
- Framer Motion animations
- Theme/language context consumers

## Animation Patterns

### Scroll Reveal
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  {children}
</motion.div>
```

### Staggered Children
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
```

### Hover Effects
```typescript
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
>
  {children}
</motion.div>
```

## Internationalization in Components

```typescript
import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('Hero');
  
  return (
    <h1>{t('title')}</h1>
  );
}
```

## Responsive Patterns

Use Tailwind breakpoints consistently:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Mobile-first approach:
```tsx
<div className="px-4 md:px-8 lg:px-16">
  <h1 className="text-2xl md:text-4xl lg:text-6xl">
    Title
  </h1>
</div>
```

## Accessibility

- All interactive elements must be keyboard accessible
- Use semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- Include `aria-label` for icon-only buttons
- Ensure sufficient color contrast in both themes
- Add `sr-only` labels where needed
