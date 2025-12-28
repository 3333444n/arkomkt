"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Services() {
    const t = useTranslations("Services");

    return (
        <section id="services" className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-3xl md:text-5xl font-serif mb-4"
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

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Service Cards Placeholder - Will be populated from services.json */}
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="p-8 rounded-2xl border border-gray-light bg-background hover:shadow-xl transition-shadow"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 * i }}
                        >
                            <div className="w-12 h-12 rounded-full bg-baby-blue mb-6"></div>
                            <h3 className="text-xl font-bold mb-3">Service {i}</h3>
                            <p className="text-gray-mid mb-6">Description of the awesome service we provide in this category.</p>
                            <button className="text-sm font-bold underline">Learn More</button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="bg-foreground text-background px-8 py-3 rounded-full font-medium">
                        {t("cta")}
                    </button>
                </div>
            </div>
        </section>
    );
}
