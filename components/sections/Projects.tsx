"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Projects() {
    const t = useTranslations("Navbar"); // Using Navbar namespace for 'projects' title if needed, or site.json

    return (
        <section id="projects" className="py-20 bg-foreground text-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-serif">{t("projects")}</h2>
                    </div>
                    <button className="text-sm font-bold border-b-2 border-background pb-1 mt-4 md:mt-0">
                        View All Projects
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Project Featured Cards Placeholder */}
                    {[1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="group cursor-pointer"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="aspect-video bg-gray-dark rounded-2xl mb-6 overflow-hidden">
                                {/* Image Placeholder */}
                                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 group-hover:scale-105 transition-transform duration-500"></div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Project Name {i}</h3>
                            <p className="opacity-60">Digital Marketing • Creative Direction</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
