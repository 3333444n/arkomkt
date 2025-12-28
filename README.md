# Arko MKT

Official website and portfolio for **Arko MKT**, a digital marketing and AI agency based in Mexico City.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | React framework with App Router |
| React | 19.2.3 | UI library |
| TypeScript | 5.9 | Type safety |
| Tailwind CSS | 4.1 | Styling |
| Framer Motion | 11.x | Animations |
| next-intl | 4.x | Internationalization (ES/EN/FR) |
| MDX | 3.x | Rich content for projects and blog |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/3333444n/arkomkt.git
cd arkomkt

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
arkomkt-website/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── content/                # MDX content (projects, blog)
├── data/                   # JSON data files
├── docs/                   # Project documentation
├── lib/                    # Utility functions
├── messages/               # i18n translation files
├── public/                 # Static assets
└── AGENTS.md               # AI agent guidelines
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Features

- Multilingual support (Spanish, English, French)
- Light/Dark mode toggle
- Animated page transitions
- Project portfolio with filtering
- Blog (future implementation)

## Documentation

See the `/docs` folder for detailed documentation:

- [Architecture](docs/architecture.md) - App structure and data flow
- [Components](docs/components.md) - Component patterns
- [Content](docs/content.md) - Managing projects and blog posts
- [Styling](docs/styling.md) - Design tokens and Tailwind patterns

## Deployment

This project is deployed on [Vercel](https://vercel.com). Every push to `main` triggers an automatic deployment.

## License

Private - All rights reserved.
