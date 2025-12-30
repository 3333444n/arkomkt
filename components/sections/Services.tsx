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

        const glowColors: Record<string, string> = {
            "baby-blue": "rgba(219, 234, 254, 0.8)",
            "baby-green": "rgba(240, 253, 244, 0.8)",
            "baby-pink": "rgba(251, 207, 232, 0.8)",
            "baby-orange": "rgba(255, 237, 213, 0.8)",
            "baby-purple": "rgba(237, 233, 254, 0.8)",
            "baby-yellow": "rgba(254, 243, 199, 0.8)",
            "baby-red": "rgba(254, 226, 226, 0.8)",
        };
        const glowColor = glowColors[color] || "rgba(255, 255, 255, 0.5)";
        return {
            boxShadow: `0 0 20px 4px ${glowColor}`,
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

    // Build the render array with the card inserted at the right position
    const renderItems = useMemo(() => {
        const items: (ItemType | { type: "card"; item: ItemType })[] = [];

        allItems.forEach((item, index) => {
            items.push(item);

            // Insert card after this row
            if (selectedItem && cardInsertIndex === index + 1) {
                items.push({ type: "card", item: selectedItem });
            }
        });

        // If card should be at the very end
        if (selectedItem && cardInsertIndex === allItems.length) {
            items.push({ type: "card", item: selectedItem });
        }

        return items;
    }, [allItems, selectedItem, cardInsertIndex]);

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
                    {renderItems.map((renderItem, index) => {
                        // Render the expanded card
                        if ("type" in renderItem && renderItem.type === "card") {
                            const item = renderItem.item;
                            return (
                                <AnimatePresence key={`card-container-${item.id}`}>
                                    <motion.div
                                        key={`card-${item.id}`}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4, ease: "circOut" }}
                                        className="w-full flex-shrink-0 z-10"
                                        style={{ flexBasis: "100%" }}
                                    >
                                        <div
                                            className={`p-6 md:p-10 rounded-lg md:rounded-xl ${getColorClass(item.color)} text-static-black relative overflow-hidden`}
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
                                                    {item.serviceData?.title[locale as keyof typeof item.serviceData.title] || item.serviceData?.title["es"]}
                                                </h3> */}
                                                <p className="text-base md:text-lg font-medium mb-3 md:mb-4 font-sans opacity-90 leading-relaxed">
                                                    {item.serviceData?.subtitle[locale as keyof typeof item.serviceData.subtitle] || item.serviceData?.subtitle["es"]}
                                                </p>
                                                <p className="text-sm md:text-base mb-6 md:mb-8 font-sans leading-relaxed opacity-80">
                                                    {item.serviceData?.description[locale as keyof typeof item.serviceData.description] || item.serviceData?.description["es"]}
                                                </p>
                                                <div className="pt-6 border-t border-black/10">
                                                    <p className="text-xs md:text-sm italic font-sans opacity-70">
                                                        {item.serviceData?.footer[locale as keyof typeof item.serviceData.footer] || item.serviceData?.footer["es"]}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            );
                        }

                        // Render regular pill items
                        const item = renderItem as ItemType;
                        const isSelected = selectedServiceId === item.id;
                        const isService = item.type === "service";

                        return (
                            <div
                                key={item.id}
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
                                        ${item.type === "category" ? "font-serif cursor-default" : "font-sans cursor-pointer"}
                                        ${isSelected ? "font-bold" : "hover:font-bold"}
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
                        );
                    })}
                </div>

                <div className="mt-24 text-center">
                    <motion.button
                        className="bg-foreground text-background px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
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
