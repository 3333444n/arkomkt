"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/content";
import { getServiceCategoryColor, getServiceCategoryName } from "@/lib/services";
import { cn, getValidImage } from "@/lib/utils";


interface ProjectCardProps {
    project: Project;
    locale: string;
    priority?: boolean;
}

export default function ProjectCard({ project, locale, priority = false }: ProjectCardProps) {
    // Use the first category for the card's main accent color
    const mainCategory = project.serviceCategories[0];
    const accentColor = getServiceCategoryColor(mainCategory);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col h-full bg-gray-light dark:bg-gray-light backdrop-blur-md rounded-3xl overflow-hidden border border-gray-light transition-colors text-foreground"
        >
            <Link href={`/${locale}/proyectos/${project.slug}`} className="flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                        src={getValidImage(project.coverImage, project.slug)}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={priority}
                    />

                    {/* Overlay with Client Logo */}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm p-2 rounded-xl z-10 transition-opacity opacity-90 group-hover:opacity-100">
                        <img
                            src={getValidImage(project.clientLogo, project.slug, 5)}
                            alt={project.client}
                            className="h-8 w-auto max-w-[100px] object-contain"
                        />
                    </div>

                    {/* Service Pills (Overlay at bottom) */}
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10">
                        {project.serviceCategories.slice(0, 3).map((catId) => {
                            const colorName = getServiceCategoryColor(catId);
                            // Map generic color names to comprehensive styling classes
                            const colorClasses: Record<string, string> = {
                                "baby-blue": "bg-baby-blue/90 text-blue-900 border-blue-200",
                                "baby-green": "bg-baby-green/90 text-green-900 border-green-200",
                                "baby-pink": "bg-baby-pink/90 text-pink-900 border-pink-200",
                                "baby-orange": "bg-baby-orange/90 text-orange-900 border-orange-200",
                                "baby-purple": "bg-baby-purple/90 text-purple-900 border-purple-200",
                                "baby-yellow": "bg-baby-yellow/90 text-yellow-900 border-yellow-200",
                            };

                            const specificClass = colorClasses[colorName] || "bg-background/90 text-foreground border-border";

                            return (
                                <span
                                    key={catId}
                                    className={cn(
                                        "text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md border",
                                        specificClass
                                    )}
                                >
                                    {getServiceCategoryName(catId, locale)}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow relative">
                    <div className="mb-auto">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                            {project.description}
                        </p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-xs font-medium">
                        <div className="flex flex-col">
                            <span className="opacity-60 text-[10px] uppercase tracking-wider">Client</span>
                            <span>{project.client}</span>
                        </div>
                        <div className="flex flex-col items-end text-right">
                            <span className="opacity-60 text-[10px] uppercase tracking-wider">Outcome</span>
                            <span className="font-bold text-green-600 dark:text-green-400">
                                {project.outcome}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
