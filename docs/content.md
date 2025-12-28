# Content Management

## Overview

Content is managed through a hybrid approach:
- **JSON files with HTML strings** for main page sections (Hero, About, Services, FAQ)
- **JSON files** for structured, static data (services, clients, site metadata)
- **MDX files** for rich content (projects, blog posts)
- **i18n translation files** for UI strings and main page content

## Directory Structure

```
content/
├── projects/
│   ├── es/
│   │   └── project-slug.mdx
│   ├── en/
│   │   └── project-slug.mdx
│   └── fr/
│       └── project-slug.mdx
└── blog/
    ├── es/
    ├── en/
    └── fr/

data/
├── services.json
├── clients.json
└── site.json

messages/
├── es.json
├── en.json
└── fr.json
```

## Project MDX Format

```mdx
---
title: "Project Title"
client: "Client Name"
tags: ["video-editing", "social-media"]
testimonial: "Quote from client..."
description: "Brief project description"
date: "2024-01-15"
featured: true
coverImage: "/projects/project-slug/cover.jpg"
---

## Overview

Full project content in MDX format...

## Results

- Metric 1
- Metric 2
```

### Project Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Project title |
| client | string | Yes | Client name |
| tags | string[] | Yes | Service IDs from services.json |
| testimonial | string | No | Client quote |
| description | string | Yes | Brief description |
| date | string | Yes | ISO date format |
| featured | boolean | No | Show on main page |
| coverImage | string | Yes | Path to cover image |

## Blog MDX Format

```mdx
---
title: "Blog Post Title"
excerpt: "Brief excerpt for listings"
date: "2024-01-15"
author: "Author Name"
authorImage: "/authors/author.jpg"
tags: ["marketing", "ai"]
coverImage: "/blog/post-slug/cover.jpg"
---

Blog content here...
```

## Services Data (data/services.json)

Services are organized by categories, each with multiple service items. Each service has:
- **title**: Service name
- **subtitle**: Brief tagline
- **description**: Detailed description
- **footer**: Additional info or CTA text

```json
{
  "categories": [
    {
      "id": "audiovisual",
      "name": { "es": "...", "en": "...", "fr": "..." },
      "color": "baby-blue",
      "services": [
        {
          "id": "video-editing",
          "title": { "es": "...", "en": "...", "fr": "..." },
          "subtitle": { "es": "...", "en": "...", "fr": "..." },
          "description": { "es": "...", "en": "...", "fr": "..." },
          "footer": { "es": "...", "en": "...", "fr": "..." }
        }
      ]
    }
  ]
}
```

## Clients Data (data/clients.json)

Client logos with names (shown on hover) and optional URLs.

```json
{
  "clients": [
    { "name": "...", "logo": "/logos/client.svg", "url": "https://..." }
  ]
}
```

## Main Page Content (messages/es.json, en.json, fr.json)

Main page sections use **JSON with HTML strings** to support formatting (bold, italics, line breaks).

### Structure

```json
{
  "Navbar": { "home": "...", "about": "...", "services": "...", "projects": "...", "contact": "..." },
  "Footer": { "tagline": "...", "copyright": "...", "social": { "instagram": "...", "linkedin": "...", "facebook": "..." } },
  "Hero": { "title": "...", "subtitle": "...", "cta": { "primary": "...", "secondary": "...", "note": "..." } },
  "About": { "title": "...", "content": "...", "cta": "..." },
  "Clients": { "title": "..." },
  "Services": { "title": "...", "subtitle": "...", "cta": "..." },
  "FAQ": { "title": "...", "items": [{ "question": "...", "answer": "..." }] }
}
```

**Note**: Actual content is in the translation files. Services section titles are here, but service details are in `data/services.json`.

### HTML Formatting Guidelines

- **Bold**: Use `<b>text</b>` or `<strong>text</strong>`
- **Italic**: Use `<i>text</i>` or `<em>text</em>`
- **Line breaks**: Use `<br>` or `<br/>`
- **Links**: Use `<a href="url">text</a>` (only for trusted content)
- Keep HTML simple - complex markup should use components instead

### Rendering HTML Content

While `dangerouslySetInnerHTML` can be used for raw HTML, the preferred and safer method with **next-intl** is using `t.rich()`. This avoids common `FORMATTING_ERROR` and `UNCLOSED_TAG` issues.

```tsx
import { useTranslations } from 'next-intl';

function HeroSection() {
  const t = useTranslations('Hero');
  
  return (
    <section>
      <h1>
        {t.rich('title', {
          b: (chunks) => <b>{chunks}</b>,
          br: () => <br />
        })}
      </h1>
      <p>
        {t.rich('subtitle', {
          br: () => <br />
        })}
      </p>
    </section>
  );
}
```

**Security Note**: Use `t.rich()` to safely map tags to React components. Only use `dangerouslySetInnerHTML` if absolutely necessary and with trusted content.

## Adding New Content

### New Project
1. Create MDX file in `content/projects/es/new-project.mdx`
2. Create corresponding EN and FR versions
3. Add images to `public/projects/new-project/`
4. Build will pick up new content

### New Blog Post
1. Create MDX file in `content/blog/es/new-post.mdx`
2. Create corresponding EN and FR versions
3. Add images to `public/blog/new-post/`

### New Service
1. Edit `data/services.json`
2. Add to appropriate category
3. Include all three language translations

## Content Helpers

```typescript
// lib/content.ts

// Get all projects for a locale
export async function getProjects(locale: string): Promise<Project[]>

// Get single project by slug and locale
export async function getProject(slug: string, locale: string): Promise<Project>

// Get all project slugs (for generateStaticParams)
export async function getProjectSlugs(): Promise<string[]>

// Filter projects by tags
export function filterProjectsByTags(projects: Project[], tags: string[]): Project[]
```
