import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import toolsData from '@/data/tools.json';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export interface Project {
    slug: string; // The file name without extension
    title: string;
    client: string;
    clientLogo: string;
    clientLocation?: string;
    clientSlogan?: string;
    clientDescription?: string;
    serviceCategories: string[];
    year: string;
    tools: string[];
    outcome: string;
    description: string;
    coverImage: string;
    images?: string[];
    testimonial?: {
        text: string;
        author: string;
        position: string;
        photo: string;
    };
    featured?: boolean;
    content: string; // The MDX body
}

// Helper to get tool logo by name
export function getToolLogo(toolName: string): string | null {
    const tools = toolsData as Record<string, string>;
    return tools[toolName] || null;
}

export async function getProjects(locale: string): Promise<Project[]> {
    const localeDir = path.join(projectsDirectory, locale);

    if (!fs.existsSync(localeDir)) {
        return [];
    }

    const files = fs.readdirSync(localeDir);

    const projects = files.map((filename) => {
        const slug = filename.replace(/\.mdx$/, '');
        const fullPath = path.join(localeDir, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title,
            client: data.client,
            clientLogo: data.clientLogo,
            clientLocation: data.clientLocation,
            clientSlogan: data.clientSlogan,
            clientDescription: data.clientDescription,
            serviceCategories: data.serviceCategories || [],
            year: data.year,
            tools: data.tools || [],
            outcome: data.outcome,
            description: data.description,
            coverImage: data.coverImage,
            images: data.images || [],
            testimonial: data.testimonial,
            featured: data.featured,
            content,
        } as Project;
    });

    return projects;
}

export async function getProject(slug: string, locale: string): Promise<Project | null> {
    const fullPath = path.join(projectsDirectory, locale, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title,
        client: data.client,
        clientLogo: data.clientLogo,
        clientLocation: data.clientLocation,
        clientSlogan: data.clientSlogan,
        clientDescription: data.clientDescription,
        serviceCategories: data.serviceCategories || [],
        year: data.year,
        tools: data.tools || [],
        outcome: data.outcome,
        description: data.description,
        coverImage: data.coverImage,
        images: data.images || [],
        testimonial: data.testimonial,
        featured: data.featured,
        content,
    } as Project;
}

export async function getProjectSlugs(): Promise<string[]> {
    // Assuming 'es' has all projects, or verify across locales
    // For now, look at 'es' as the source of truth for slugs
    const localeDir = path.join(projectsDirectory, 'es');
    if (!fs.existsSync(localeDir)) return [];

    const files = fs.readdirSync(localeDir);
    return files.map((filename) => filename.replace(/\.mdx$/, ''));
}
