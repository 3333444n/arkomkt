"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import servicesData from "@/data/services.json";

interface Service {
    id: string;
    title: Record<string, string>;
    subtitle: Record<string, string>;
    description: Record<string, string>;
    footer: Record<string, string>;
}

interface Category {
    id: string;
    name: Record<string, string>;
    color: string;
    services: Service[];
}

export default function Services() {
    const t = useTranslations("Services");
    const locale = useLocale();
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    const categories = servicesData.categories as Category[];

    const getColorClass = (color: string) => {
        const colors: Record<string, string> = {
            "baby-blue": "bg-baby-blue",
            "baby-green": "bg-baby-green",
            "baby-pink": "bg-baby-pink",
            "baby-orange": "bg-baby-orange",
            "baby-purple": "bg-baby-purple",
            "baby-yellow": "bg-baby-yellow",
            "baby-red": "bg-baby-red",
        };
        return colors[color] || "bg-gray-light";
    };

    const handleServiceClick = (serviceId: string) => {
        setSelectedServiceId(selectedServiceId === serviceId ? null : serviceId);
    };

    return (
        <section id="services" className="py-20 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-6xl font-serif mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p
                        className="text-lg text-static-black max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center items-start max-w-5xl mx-auto">
                    {categories.map((category) => (
                        <div key={category.id} className="flex flex-wrap gap-4 contents">
                            {/* Category Pill */}
                            <div
                                className={`px-8 py-3 rounded-full ${getColorClass(category.color)} text-static-black text-xl font-serif hover:font-bold transition-all whitespace-nowrap cursor-default`}
                            >
                                {category.name[locale as keyof typeof category.name] || category.name["es"]}
                            </div>

                            {/* Service Pills */}
                            {category.services.map((service) => {
                                const isSelected = selectedServiceId === service.id;
                                return (
                                    <div key={service.id} className="relative">
                                        <AnimatePresence mode="wait">
                                            {!isSelected ? (
                                                <motion.button
                                                    layoutId={service.id}
                                                    onClick={() => handleServiceClick(service.id)}
                                                    whileHover={{ scale: 1.05 }}
                                                    className={`px-8 py-3 rounded-full ${getColorClass(category.color)} text-static-black text-xl font-sans hover:font-bold transition-all whitespace-nowrap`}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    {service.title[locale as keyof typeof service.title] || service.title["es"]}
                                                </motion.button>
                                            ) : (
                                                <motion.div
                                                    layoutId={service.id}
                                                    className={`p-8 rounded-[2rem] ${getColorClass(category.color)} text-static-black w-full md:max-w-xl min-w-[300px] z-10 shadow-2xl relative`}
                                                    initial={{ borderRadius: "9999px" }}
                                                    animate={{ borderRadius: "2rem" }}
                                                >
                                                    <button
                                                        onClick={() => setSelectedServiceId(null)}
                                                        className="absolute top-4 right-6 text-2xl font-bold hover:scale-110 transition-transform"
                                                    >
                                                        ×
                                                    </button>
                                                    <h3 className="text-2xl font-bold mb-4 font-sans">
                                                        {service.title[locale as keyof typeof service.title] || service.title["es"]}
                                                    </h3>
                                                    <p className="text-lg font-bold mb-2 font-sans opacity-80">
                                                        {service.subtitle[locale as keyof typeof service.subtitle] || service.subtitle["es"]}
                                                    </p>
                                                    <p className="text-base mb-6 font-sans">
                                                        {service.description[locale as keyof typeof service.description] || service.description["es"]}
                                                    </p>
                                                    <div className="pt-4 border-t border-black/10">
                                                        <p className="text-sm italic font-sans">
                                                            {service.footer[locale as keyof typeof service.footer] || service.footer["es"]}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <motion.button
                        className="bg-foreground text-background px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        {t("cta")}
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
