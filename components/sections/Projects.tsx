"use client";

interface ProjectsProps {
    projects: any[]; // We'll fix type import in a sec, or import Project from lib/content
    locale: string;
}

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Project } from "@/lib/content";
import ProjectCard from "@/components/projects/ProjectCard";
import Link from "next/link";
import { useRef } from "react";

export default function Projects({ projects, locale }: { projects: Project[], locale: string }) {
    const t = useTranslations("Projects");
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section id="projects" className="py-20 text-foreground overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-end">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-serif mb-4">{t("title")}</h2>
                        <p className="opacity-70 max-w-md">{t("subtitle")}</p>
                    </div>
                    <Link
                        href={`/${locale}/proyectos`}
                        className="text-sm font-bold border-b-2 border-foreground pb-1 mt-6 md:mt-0 hover:opacity-70 transition-opacity"
                    >
                        {t("cta")}
                    </Link>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="pl-4 md:pl-[max(1rem,calc((100vw-1200px)/2))] overflow-x-auto pb-12 hide-scrollbar">
                <div className="flex gap-6 w-max pr-8">
                    {projects.map((project, index) => (
                        <div key={project.slug} className="w-[85vw] md:w-[600px] h-[400px] md:h-[500px]">
                            <ProjectCard project={project} locale={locale} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
