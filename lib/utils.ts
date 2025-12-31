import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const FALLBACK_IMAGES = [
    '/images/gradients/gradient1.webp',
    '/images/gradients/gradient2.webp',
    '/images/gradients/gradient3.webp',
    '/images/gradients/gradient4.webp'
];

export function getFallbackImage(seed: string, index: number = 0) {
    const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return FALLBACK_IMAGES[(hash + index) % FALLBACK_IMAGES.length];
}

export function getValidImage(src: string | undefined | null, seed: string, index: number = 0) {
    if (src && src.trim().length > 0) return src;
    return getFallbackImage(seed, index);
}
