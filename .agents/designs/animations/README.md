# Animation Specifications

This folder contains GIF references and specifications for all animations and transitions.

## Animation Library
Using **Framer Motion** for all animations.

## General Principles

### Timing
- **Fast interactions**: 150-200ms (hover states, button presses)
- **Medium transitions**: 300-400ms (component reveals, toggles)
- **Slow/dramatic**: 500-800ms (page transitions, hero animations)

### Easing
- **Default**: `ease-out` or `[0.16, 1, 0.3, 1]` (smooth deceleration)
- **Bounce/spring**: Use Framer Motion spring with `stiffness: 400, damping: 30`
- **Snappy**: `[0.25, 0.1, 0.25, 1]`

## Animation Categories

### Page Transitions
- Fade + slight Y translate on route change
- Duration: 400-500ms
- Reference: aayushbharti.in page transitions

### Scroll Reveals
- Elements fade in and translate up as they enter viewport
- Stagger children: 100ms delay between items
- Use Intersection Observer or Framer Motion `whileInView`

### Hover Effects
- Cards: subtle scale (1.02-1.05) + shadow increase
- Buttons: background color transition + slight scale (0.98 on press)
- Links: underline animation or color shift

### Toggle Animations
- Dark/light mode: smooth color transitions via `transition-colors duration-300`
- Language toggle: TBD
- Mobile menu: slide/fade animation

### Service Pills
- Hover: subtle glow effect matching category color
- Click: scale down (active:scale-95) for tactile feedback

## File Naming Convention
- `component-name-state.gif` (e.g., `button-hover.gif`)
- `page-transition.gif`
- `scroll-reveal.gif`

## Pending Animation References
- [ ] Hero section entrance animation
- [ ] Project card hover effect
- [ ] Mobile menu open/close
- [ ] Page transition between routes
- [ ] Service pill interactions
