"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
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

type ItemType = {
    type: "category" | "service";
    id: string;
    label: string;
    color: string;
    categoryId: string;
    serviceData?: Service;
};

export default function Services() {
    const t = useTranslations("Services");
    const locale = useLocale();
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [rowBreaks, setRowBreaks] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    const categories = servicesData.categories as Category[];

    // Flatten data for the "cloud" look
    const allItems = useMemo(() => {
        const items: ItemType[] = [];
        categories.forEach((cat) => {
            // Add category pill
            items.push({
                type: "category",
                id: `cat-${cat.id}`,
                label: cat.name[locale as keyof typeof cat.name] || cat.name["es"],
                color: cat.color,
                categoryId: cat.id,
            });
            // Add its services
            cat.services.forEach((service) => {
                items.push({
                    type: "service",
                    id: service.id,
                    label: service.title[locale as keyof typeof service.title] || service.title["es"],
                    color: cat.color,
                    categoryId: cat.id,
                    serviceData: service,
                });
            });
        });
        return items;
    }, [categories, locale]);

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

    const getGlowStyle = (color: string, isActive: boolean) => {
        if (!isActive) return {};

        // Reference the CSS variables directly from globals.css
        // Use color-mix to add transparency (80%) to the glow for a softer look
        return {
            boxShadow: `0 0 20px 4px color-mix(in srgb, var(--${color}), transparent 20%)`,
        };
    };

    const handleServiceClick = (serviceId: string) => {
        setSelectedServiceId(selectedServiceId === serviceId ? null : serviceId);
    };

    // Calculate row breaks based on item positions
    const calculateRowBreaks = useCallback(() => {
        if (!containerRef.current) return;

        const breaks: number[] = [];
        let lastTop = -1;

        allItems.forEach((item, index) => {
            const el = itemRefs.current.get(item.id);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (lastTop !== -1 && rect.top > lastTop + 10) {
                    // New row detected, mark the previous index as a row break
                    breaks.push(index);
                }
                lastTop = rect.top;
            }
        });

        setRowBreaks(breaks);
    }, [allItems]);

    useEffect(() => {
        calculateRowBreaks();
        window.addEventListener("resize", calculateRowBreaks);
        return () => window.removeEventListener("resize", calculateRowBreaks);
    }, [calculateRowBreaks]);

    // Determine which row the selected item is in and where to insert the card
    const getSelectedItemRowEndIndex = useCallback(() => {
        if (!selectedServiceId) return -1;

        const selectedIndex = allItems.findIndex(item => item.id === selectedServiceId);
        if (selectedIndex === -1) return -1;

        // Find the next row break after the selected item
        for (const breakIndex of rowBreaks) {
            if (breakIndex > selectedIndex) {
                return breakIndex;
            }
        }

        // If no row break found, the card should appear at the end
        return allItems.length;
    }, [selectedServiceId, allItems, rowBreaks]);

    const selectedItem = allItems.find(item => item.id === selectedServiceId);
    const cardInsertIndex = getSelectedItemRowEndIndex();



    return (
        <section id="services" className="py-20 overflow-hidden bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 px-4">
                    <motion.h2
                        className="text-4xl md:text-6xl font-serif mb-6 text-foreground"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-mid max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                <div
                    ref={containerRef}
                    className="flex flex-wrap gap-x-2 gap-y-2.5 justify-center items-start w-full max-w-[75vw] mx-auto min-h-[300px]"
                >
                    {allItems.map((item, index) => {
                        const isSelected = selectedServiceId === item.id;
                        const isService = item.type === "service";

                        return (
                            <div key={item.id} className="contents">
                                <div
                                    ref={(el) => {
                                        if (el) {
                                            itemRefs.current.set(item.id, el);
                                        } else {
                                            itemRefs.current.delete(item.id);
                                        }
                                    }}
                                    className="flex-shrink-0"
                                >
                                    <motion.button
                                        onClick={() => isService && handleServiceClick(item.id)}
                                        whileHover={isService ? { scale: 1.05 } : {}}
                                        className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full ${getColorClass(item.color)} text-static-black text-sm md:text-lg whitespace-nowrap
                                            ${item.type === "category" ? "font-sans cursor-default font-bold uppercase" : "font-sans cursor-pointer"}
                                            ${isService ? (isSelected ? "font-bold" : "hover:font-bold") : ""}
                                        `}
                                        style={getGlowStyle(item.color, isSelected)}
                                        animate={{
                                            boxShadow: isSelected
                                                ? getGlowStyle(item.color, true).boxShadow || "none"
                                                : "none"
                                        }}
                                        transition={{ duration: 0.3 }}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                    >
                                        {item.label}
                                    </motion.button>
                                </div>

                                <AnimatePresence>
                                    {selectedItem && cardInsertIndex === index + 1 && (
                                        <motion.div
                                            key={`card-${selectedItem.id}`}
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            transition={{ duration: 0.4, ease: "circOut" }}
                                            className="w-full flex-shrink-0 z-10 overflow-hidden"
                                            style={{ flexBasis: "100%" }}
                                        >
                                            <div
                                                className={`p-6 md:p-10 rounded-lg md:rounded-xl ${getColorClass(selectedItem.color)} text-static-white relative overflow-hidden`}
                                                style={{
                                                    backgroundImage: selectedItem.color.startsWith("baby-")
                                                        ? `url(/images/gradients/${selectedItem.color.replace("baby-", "")}.webp)`
                                                        : "none",
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                }}
                                            >
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedServiceId(null);
                                                    }}
                                                    className="absolute top-6 right-8 text-2xl md:text-3xl font-light hover:scale-110 transition-transform opacity-60 hover:opacity-100"
                                                >
                                                    ×
                                                </button>
                                                <div className="max-w-3xl">
                                                    {/* <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 font-sans">
                                                        {selectedItem.serviceData?.title[locale as keyof typeof selectedItem.serviceData.title] || selectedItem.serviceData?.title["es"]}
                                                    </h3> */}
                                                    <p className="text-base md:text-lg font-medium mb-3 md:mb-4 font-sans opacity-90 leading-relaxed">
                                                        {selectedItem.serviceData?.subtitle[locale as keyof typeof selectedItem.serviceData.subtitle] || selectedItem.serviceData?.subtitle["es"]}
                                                    </p>
                                                    <p className="text-sm md:text-base mb-6 md:mb-8 font-sans leading-relaxed opacity-80">
                                                        {selectedItem.serviceData?.description[locale as keyof typeof selectedItem.serviceData.description] || selectedItem.serviceData?.description["es"]}
                                                    </p>
                                                    <div className="pt-6 border-t border-white/20">
                                                        <p className="text-xs md:text-sm italic font-sans opacity-70">
                                                            {selectedItem.serviceData?.footer[locale as keyof typeof selectedItem.serviceData.footer] || selectedItem.serviceData?.footer["es"]}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
