# Content Management

## Overview

Content is managed through a hybrid approach:
- **JSON files** for structured, static data (services, clients, site metadata)
- **MDX files** for rich content (projects, blog posts)

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

```json
{
  "categories": [
    {
      "id": "audiovisual",
      "name": {
        "es": "Audiovisual",
        "en": "Audiovisual",
        "fr": "Audiovisuel"
      },
      "color": "baby-blue",
      "services": [
        {
          "id": "video-editing",
          "name": {
            "es": "Edicion de video",
            "en": "Video Editing",
            "fr": "Montage video"
          },
          "description": {
            "es": "...",
            "en": "...",
            "fr": "..."
          }
        }
      ]
    }
  ]
}
```

## Clients Data (data/clients.json)

```json
{
  "clients": [
    {
      "name": "Client Name",
      "logo": "/logos/client.svg",
      "url": "https://client.com"
    }
  ]
}
```

## UI Translations (messages/es.json)

```json
{
  "Navbar": {
    "home": "Inicio",
    "about": "Acerca de Arko",
    "services": "Servicios",
    "projects": "Proyectos",
    "contact": "Contacto"
  },
  "Hero": {
    "title": "...",
    "subtitle": "..."
  },
  "CTA": {
    "title": "...",
    "button": "..."
  }
}
```

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
