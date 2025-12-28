"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Hero() {
    const t = useTranslations("Hero");

    return (
        <section id="home" className="pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <motion.h1
                    className="text-4xl md:text-6xl font-serif mb-6"
                    dangerouslySetInnerHTML={{ __html: t("title") }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                />
                <motion.p
                    className="text-lg md:text-xl text-gray-mid mb-10 max-w-2xl mx-auto"
                    dangerouslySetInnerHTML={{ __html: t("subtitle") }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                />
                <motion.div
                    className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <button className="bg-foreground text-background px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
                        {t("cta.primary")}
                    </button>
                    <div className="text-center md:text-left">
                        <button className="text-foreground font-medium underline underline-offset-4 decoration-2">
                            {t("cta.secondary")}
                        </button>
                        <p
                            className="text-xs text-gray-mid mt-1"
                            dangerouslySetInnerHTML={{ __html: t("cta.note") }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
