# Styling Guide

## Stack

- **Tailwind CSS 4.1** with PostCSS
- **CSS Variables** for theme tokens
- **Class-based dark mode**

## Theme Configuration

Dark mode uses Tailwind's `class` strategy:
- A `dark` class on `<html>` activates dark mode
- User preference stored in localStorage
- Respects system preference on first visit

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Light mode tokens */
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  /* ... */
}

.dark {
  /* Dark mode tokens */
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... */
}
```

## Color Palette

### Service Category Colors
| Category | Color Name | Light Mode | Dark Mode |
|----------|------------|------------|-----------|
| Audiovisual | Baby Blue | TBD | TBD |
| Desarrollo | TBD | TBD | TBD |
| Comunicacion | Baby Pink | TBD | TBD |
| Diseno | TBD | TBD | TBD |
| Performance Marketing | TBD | TBD | TBD |
| Asesoria | TBD | TBD | TBD |

### Semantic Colors
| Token | Purpose |
|-------|---------|
| --primary | Brand primary color |
| --secondary | Secondary accent |
| --background | Page background |
| --foreground | Primary text |
| --muted | Muted backgrounds |
| --muted-foreground | Secondary text |
| --card | Card backgrounds |
| --border | Borders |

## Typography

### Font Stack (TBD)
```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-heading: 'Inter', system-ui, sans-serif;
```

### Scale
| Class | Size | Usage |
|-------|------|-------|
| text-xs | 0.75rem | Labels, captions |
| text-sm | 0.875rem | Secondary text |
| text-base | 1rem | Body text |
| text-lg | 1.125rem | Lead text |
| text-xl | 1.25rem | Small headings |
| text-2xl | 1.5rem | Section titles |
| text-4xl | 2.25rem | Page titles |
| text-6xl | 3.75rem | Hero headlines |

## Spacing

Use Tailwind's spacing scale consistently:
- `4` (1rem) - Default gap
- `8` (2rem) - Section padding
- `16` (4rem) - Large section gaps
- `24` (6rem) - Hero padding

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Small laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

## Component Patterns

### Cards
```tsx
<div className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
  {/* Card content */}
</div>
```

### Buttons
```tsx
// Primary
<button className="rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90">
  Button
</button>

// Secondary
<button className="rounded-md border bg-background px-4 py-2 transition-colors hover:bg-muted">
  Button
</button>
```

### Service Pills
```tsx
<span className="rounded-full bg-[category-color] px-3 py-1 text-sm font-medium">
  Service Name
</span>
```

## Animation Classes

Use these with Framer Motion for consistency:

```typescript
// Transition presets
const spring = { type: 'spring', stiffness: 400, damping: 30 };
const smooth = { duration: 0.3, ease: [0.16, 1, 0.3, 1] };
const slow = { duration: 0.5, ease: 'easeOut' };
```

## Best Practices

1. **Use CSS variables** for colors that change with theme
2. **Mobile-first** - Start with mobile styles, add breakpoint modifiers
3. **Avoid magic numbers** - Use Tailwind's scale
4. **Group related classes** - Background, then text, then spacing
5. **Extract repeated patterns** to components or @apply rules
6. **Test both themes** - Always verify light and dark mode
