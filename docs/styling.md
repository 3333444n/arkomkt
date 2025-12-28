# Styling Guide

## Stack

- **Tailwind CSS 4.0** with PostCSS
- **CSS Variables** for theme tokens
- **Class-based dark mode**

## Theme Configuration

Dark mode uses Tailwind's `class` strategy. The system is configured in `app/globals.css` using the Tailwind 4.0 `@theme` block.

```css
/* app/globals.css */
@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ... */
}
```

## Color Palette

### Core Colors
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | `#FFFFFF` | `#121212` | Page background |
| `--foreground` | `#121212` | `#FFFFFF` | Primary text |

### Grays
| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--gray-light` | `#F5F5F5` | `#1E1E1E` | Borders, subtle bgs |
| `--gray-mid` | `#888888` | `#777777` | Muted text |
| `--gray-dark` | `#333333` | `#EEEEEE` | Stronger accents |

### Baby Palette (Service Categories)
These soft colors are intended for pills, category backgrounds, and subtle accents.

| Category | Token | Hex |
|----------|-------|-----|
| Audiovisual | `--baby-blue` | `#DBEAFE` |
| Comunicacion | `--baby-pink` | `#FBCFE8` |
| Design | `--baby-purple` | `#EDE9FE` |
| Marketing | `--baby-orange` | `#FFEDD5` |
| Development | `--baby-yellow` | `#FEF3C7` |
| Advisory | `--baby-red` | `#FEE2E2` |

### Gradients
Gradients are available as utility classes (e.g., `bg-grad-blue`).

| Gradient | Colors | Utility Class |
|----------|--------|---------------|
| Blue | #60A5FA → #3B82F6 | `bg-grad-blue` |
| Yellow | #FDE68A → #F59E0B | `bg-grad-yellow` |
| Red | #FCA5A5 → #EF4444 | `bg-grad-red` |
| Orange | #FDBA74 → #F97316 | `bg-grad-orange` |
| Green | #86EFAC → #10B981 | `bg-grad-green` |
| Purple | #D8B4FE → #8B5CF6 | `bg-grad-purple` |

## Typography

### Font Stack
- **Sans-serif**: `Inter` (used for body text)
- **Serif**: `Times New Roman` (used for headings)

```css
--font-sans: var(--font-inter);
--font-serif: var(--font-times);
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
<div className="rounded-lg border border-gray-light bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
  {/* Card content */}
</div>
```

### Buttons (WIP)
Primary and secondary buttons should use semantic colors or gradients for a premium feel.

## Best Practices

1. **Use semantic tokens**: Use `text-foreground` and `bg-background` instead of hardcoded white/black.
2. **Design with dark mode in mind**: Always check how `bg-grad-*` looks on `#121212`.
3. **Typography**: Use standard Tailwind `text-*` classes. Headings will automatically use the Serif font.
4. **Custom Utilities**: If you need a new gradient, add it to the `@theme` block in `globals.css` as `--background-image-*`.
