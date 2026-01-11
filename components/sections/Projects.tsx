"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Project } from "@/lib/content";
import ProjectCard from "@/components/projects/ProjectCard";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";



export default function Projects({ projects, locale }: { projects: Project[], locale: string }) {
    const t = useTranslations("Projects");
    const sectionRef = useRef<HTMLElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [maxScroll, setMaxScroll] = useState(0);

    // Card and layout constants
    const CARD_WIDTH = 600;
    const CARD_GAP = 24; // gap-6 = 1.5rem = 24px
    const SIDE_PADDING = 80; // px-20 = 5rem = 80px

    useEffect(() => {
        setIsMounted(true);

        const updateMeasurements = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);

            if (!mobile && carouselRef.current) {
                // We use getBoundingClientRect for precise sub-pixel measurements
                // scrollWidth includes padding, which is what we want
                const contentWidth = carouselRef.current.scrollWidth;
                const viewportWidth = window.innerWidth;

                // Calculate max scroll: total content width - one viewport width
                // This ensures the last card touches the right edge (minus padding)
                // We subtract a tiny buffer (e.g. 1px) to avoid rounding jitter causing a flicker
                const scroll = contentWidth - viewportWidth;

                setMaxScroll(Math.max(0, scroll));
            }
        };

        updateMeasurements();
        // Re-measure after a short delay to ensure fonts/layout settled
        const timer = setTimeout(updateMeasurements, 200);

        window.addEventListener("resize", updateMeasurements);
        return () => {
            window.removeEventListener("resize", updateMeasurements);
            clearTimeout(timer);
        };
    }, [projects]);

    // Track scroll through the section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        // Start tracking when top of section hits top of viewport
        // End when bottom of section hits bottom of viewport
        offset: ["start start", "end end"]
    });

    // Map vertical scroll progress [0,1] to horizontal translation [0, -maxScroll]
    const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

    // Section height: 1 viewport + extra scroll distance for the horizontal scroll effect
    // Adding some buffer to prevent excess scroll past the last card
    const sectionHeight = isMounted && !isMobile
        ? `calc(100vh + ${maxScroll}px)`
        : "auto";

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative text-foreground"
            style={{ height: sectionHeight }}
        >
            {/* Sticky container - sticks to viewport during scroll */}
            <div
                className="w-full flex flex-col justify-center overflow-hidden"
                style={{
                    position: isMounted && !isMobile ? "sticky" : "relative",
                    top: 0,
                    height: isMounted && !isMobile ? "100vh" : "auto",
                    paddingTop: isMobile ? "5rem" : 0,
                    paddingBottom: isMobile ? "5rem" : 0,
                }}
            >


                {/* Header */}
                <div className="px-4 md:px-20 mb-8 md:mb-12 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-serif mb-4">{t("title")}</h2>
                            <p className="opacity-70 max-w-md">{t("subtitle")}</p>
                        </div>
                        <Link
                            href={`/${locale}/proyectos`}
                            className="text-sm font-bold border-b-2 border-foreground pb-1 hover:opacity-70 transition-opacity shrink-0"
                        >
                            {t("cta")}
                        </Link>
                    </div>
                </div>

                {/* Carousel Content */}
                {isMounted && !isMobile ? (
                    <motion.div
                        ref={carouselRef}
                        className="flex gap-6 pl-4 md:pl-20 pr-4 md:pr-20 w-max"
                        style={{ x }}
                    >
                        {projects.map((project) => (
                            <div
                                key={project.slug}
                                className="shrink-0 relative group overflow-hidden"
                                style={{
                                    width: `${CARD_WIDTH}px`,
                                    height: "500px",
                                    // Hardware acceleration hint
                                    transform: "translateZ(0)"
                                }}
                            >
                                <ProjectCard project={project} locale={locale} />
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    // Mobile Layout
                    <div className="w-full overflow-x-auto hide-scrollbar px-4 pb-4">
                        <div className="flex gap-4 w-max">
                            {projects.map((project) => (
                                <div
                                    key={project.slug}
                                    className="w-[85vw] max-w-[340px] h-[440px] shrink-0"
                                >
                                    <ProjectCard project={project} locale={locale} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
