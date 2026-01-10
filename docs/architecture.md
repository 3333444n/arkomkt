# Architecture

## Overview

Arko MKT website is built with Next.js 16 using the App Router, with internationalization support for Spanish (default), English, and French.

## Rendering Strategy

| Page Type | Strategy | Reason |
|-----------|----------|--------|
| Main page | Static (SSG) | Content rarely changes |
| Projects list | Static with ISR | New projects added periodically |
| Project detail | Static (SSG) | MDX content, regenerate on build |
| Contact | Static | Simple form/CTA |
| Blog | Static with ISR | New posts added periodically |

## Routing Structure

```
app/
├── [locale]/                    # Dynamic locale segment
│   ├── layout.tsx              # Locale-specific layout with providers
│   ├── page.tsx                # Main page (/)
│   ├── proyectos/
│   │   ├── page.tsx            # Projects search (/proyectos)
│   │   └── [slug]/
│   │       └── page.tsx        # Project detail (/proyectos/[slug])
│   ├── contacto/
│   │   └── page.tsx            # Contact page (/contacto)
│   └── blog/                   # Future
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── globals.css
└── layout.tsx                  # Root layout (minimal, wraps all locales)
```

## Internationalization (i18n)

Using **next-intl** with the following structure:

### URL Structure
- `/es/` - Spanish (default, redirects from `/`)
- `/en/` - English
- `/fr/` - French

### Translation Files
```
messages/
├── es.json    # Spanish UI strings
├── en.json    # English UI strings
└── fr.json    # French UI strings
```

### Content Files
```
content/
├── projects/
│   ├── es/project-slug.mdx
│   ├── en/project-slug.mdx
│   └── fr/project-slug.mdx
└── blog/
    ├── es/post-slug.mdx
    ├── en/post-slug.mdx
    └── fr/post-slug.mdx
```

## Data Flow

### Static Data (JSON)
```
data/
├── services.json    # Service categories and items
├── clients.json     # Client logos for marquee
└── site.json        # Global site metadata
```

### Content Data (MDX)
- Projects and blog posts stored as MDX files
- Frontmatter contains metadata (title, client, tags, etc.)
- Body contains rich formatted content

### Data Fetching Pattern
```typescript
// lib/content.ts
export async function getProjects(locale: string) {
  // Read MDX files from content/projects/[locale]/
  // Parse frontmatter and return array
}

export async function getProject(slug: string, locale: string) {
  // Read single MDX file
  // Return frontmatter + compiled content
}
```

## State Management

Minimal client state needed:
- Theme preference (localStorage + context)
- Language (URL-based, no client state)
- Mobile menu open/close (local component state)
- Project filters (URL params or local state)

## Third-Party Integrations

| Service | Purpose | Status |
|---------|---------|--------|
| Vercel | Hosting, CI/CD | Planned |
| Framer Motion | Animations | To install |
| next-intl | i18n | To install |
| MDX | Rich content | To configure |
| Cloudflare Workers | Contact form API | Active |
| Airtable | Lead storage | Active |

## Contact Form Integration

The contact form (`components/sections/ContactForm.tsx`) submits leads to Airtable via a Cloudflare Worker.

### Architecture
```
ContactForm.tsx → POST → Cloudflare Worker → Airtable API → leads table
```

### Cloudflare Worker
- **URL**: `https://lead-form-handler.the4rko.workers.dev/`
- **Dashboard**: Cloudflare Dashboard → Workers & Pages → lead-form-handler
- **Environment Variables** (Settings → Variables):
  - `AIRTABLE_BASE_ID`: The Airtable base ID (starts with `app...`)
  - `AIRTABLE_API_KEY`: Airtable Personal Access Token (starts with `pat...`)
  - `FORM_TOKEN`: Shared secret for CSRF protection (generate: `openssl rand -hex 32`)
  - `ENVIRONMENT`: `production` or `development`
- **KV Binding** (Bindings tab):
  - Namespace: `RATE_LIMIT` (used for rate limiting)

### Next.js Environment Variables
Add to `.env.local`:
```
NEXT_PUBLIC_FORM_TOKEN=<same-token-as-worker>
```

### Security Features

| Feature | Implementation |
|---------|---------------|
| **Rate Limiting** | Cloudflare KV-based, 5 requests per IP per minute |
| **Input Validation** | Email regex, required fields, field length limits |
| **Honeypot** | Hidden `website` field, silently rejects if filled |
| **Request Size Limit** | Rejects payloads > 10KB |
| **CORS** | Environment-based (no localhost in production) |
| **CSRF Protection** | `X-Form-Token` header with shared secret |
| **Input Sanitization** | Strips HTML tags, script injections, trims whitespace |

### Airtable Structure
- **Workspace**: Arkustomers
- **Table**: `leads`
- **Columns** (all text type):
  - `name`, `email`, `country`, `phone-number`, `service-of-interest`, `budget`, `notes`, `contact-method`, `language`

### Form Fields Mapping
| Form Field | Worker Payload Key | Airtable Column |
|------------|-------------------|-----------------|
| Name | `name` | `name` |
| Email | `email` | `email` |
| Country | `country` | `country` |
| Phone | `phoneNumber` | `phone-number` |
| Service | `serviceOfInterest` | `service-of-interest` |
| Budget | `budget` | `budget` |
| Message | `notes` | `notes` |
| Preferred Method | `contactMethod` | `contact-method` |
| Locale | `language` | `language` |
| Honeypot | `website` | (not stored - used for bot detection) |

## Build Pipeline

1. Push to GitHub `main` branch
2. Vercel detects push, triggers build
3. Next.js builds static pages
4. MDX content compiled
5. Deploy to Vercel edge network
5. Deploy to Vercel edge network
6. Preview deployments for non-main branches

## Performance Optimization

### Image Preloading
To ensure smooth component transitions (specifically for Services cards and Contact page background), we implement a **Client-Side Gradient Preloader**.

- **Strategy**: Deferred loading of large background images
- **Implementation**: `components/util/GradientPreloader.tsx`
- **Behavior**:
  - Checks for data saver mode or slow connections (2g)
  - Waits 2 seconds after hydration to avoid blocking LCP
  - Prefetches all gradient images defined in `public/images/gradients`
  - Uses standard browser cache so subsequent requests are instant
- **Benefit**: Removes "pop-in" effect when users interact with the Service cards or navigate to Contact page.
