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

### Static Colors (Theme-Invariant)
These colors remain constant regardless of light/dark mode. Use when you need elements that are always black or always white.

| Token | Value | Tailwind Usage | Purpose |
|-------|-------|----------------|----------|
| `--static-black` | `#121212` | `text-static-black`, `bg-static-black` | Always dark (matches light-mode foreground) |
| `--static-white` | `#FFFFFF` | `text-static-white`, `bg-static-white` | Always light (matches light-mode background) |
| `--static-true-black` | `#000000` | `text-static-true-black`, `bg-static-true-black` | Pure black |
| `--static-true-white` | `#FFFFFF` | `text-static-true-white`, `bg-static-true-white` | Pure white |

> **When to use**: For overlays, cards, or elements that have a fixed visual treatment (e.g., a white card on a dark image background, or black text on a pastel pill).

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
- **Sans-serif**: Used for body text.
- **Serif**: Used for headings and accents.

```css
--font-sans: var(--font-sans-serif);
--font-serif: var(--font-serif);
```
### Font Setup

Fonts are loaded using Next.js's `next/font/google` for optimal performance and zero layout shift.

**Configuration in `app/[locale]/layout.tsx`:**
Fonts are imported from `next/font/google` and configured with CSS variables.

**Configuration in `app/globals.css`:**
```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-sans-serif);
  --font-serif: var(--font-serif);
  /* ... other theme variables ... */
}
```

### Font Best Practices

1. **Use `next/font/google`**: Automatically self-hosts Google Fonts at build time, eliminating external requests and preventing font loading flashes (FOUT/FOIT).
2. **Always set `display: 'swap'`**: Ensures text remains visible during font loading.
3. **Use CSS variables**: The `variable` option creates a CSS custom property that integrates seamlessly with Tailwind 4's `@theme` configuration.
4. **Subset appropriately**: Only include the character sets you need (e.g., `subsets: ['latin']`) to reduce file size.
5. **Load multiple weights efficiently**: If you need specific weights, configure them in the font import:
```typescript
   const sansSerif = Inter({
     subsets: ['latin'],
     variable: '--font-sans-serif',
     weight: ['400', '500', '700'], // Only load what you need
   })
```
6. **Add new fonts**: To add additional Google Fonts, import them in `layout.tsx`, add their variable to the `className`, and configure them in the `@theme` block.

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
