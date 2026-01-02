"use client";

import { useEffect } from "react";

const GRADIENT_IMAGES = [
    "/images/gradients/blue.webp",
    "/images/gradients/green.webp",
    "/images/gradients/orange.webp",
    "/images/gradients/pink.webp",
    "/images/gradients/purple.webp",
    "/images/gradients/yellow.webp",
    "/images/gradients/gradient1.webp",
    "/images/gradients/gradient2.webp",
    "/images/gradients/gradient3.webp",
    "/images/gradients/gradient4.webp",
];

export default function GradientPreloader() {
    useEffect(() => {
        // Only run on client side
        if (typeof window === "undefined") return;

        const preloadImages = () => {
            // Check for data saver mode
            // @ts-ignore - navigator.connection is not standard yet
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (connection && (connection.saveData || connection.effectiveType === '2g')) {
                console.log("Skipping gradient preload due to data saver or slow connection");
                return;
            }

            // Use a small delay to ensure critical resources (LCP) are prioritized
            setTimeout(() => {
                GRADIENT_IMAGES.forEach((src) => {
                    const img = new Image();
                    img.src = src;
                });
                console.log("Gradient images preloading initiated");
            }, 2000); // 2 second delay after hydration/mount
        };

        if (document.readyState === "complete") {
            preloadImages();
        } else {
            window.addEventListener("load", preloadImages);
            return () => window.removeEventListener("load", preloadImages);
        }
    }, []);

    return null;
}
