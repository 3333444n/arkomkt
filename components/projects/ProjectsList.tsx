"use client";

import { useState } from "react";
import { Project } from "@/lib/content";
import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import servicesData from "@/data/services.json";

interface ProjectsListProps {
    projects: Project[];
    locale: string;
}

export default function ProjectsList({ projects, locale }: ProjectsListProps) {
    const [filter, setFilter] = useState("all");

    const categories = servicesData.categories;

    const filteredProjects = filter === "all"
        ? projects
        : projects.filter(p => p.serviceCategories.includes(filter));

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button
                    onClick={() => setFilter("all")}
                    className={cn(
                        "px-6 py-2 rounded-full text-sm font-bold transition-all border",
                        filter === "all"
                            ? "bg-foreground text-background border-foreground"
                            : "bg-transparent text-foreground border-border hover:border-foreground/50"
                    )}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-bold transition-all border",
                            filter === cat.id
                                ? "bg-foreground text-background border-foreground"
                                : "bg-transparent text-foreground border-border hover:border-foreground/50"
                        )}
                    >
                        {(cat.name as any)[locale] || cat.name.es}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectCard project={project} locale={locale} priority={true} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-20 opacity-60">
                    <p>No projects found in this category.</p>
                </div>
            )}
        </div>
    );
}
