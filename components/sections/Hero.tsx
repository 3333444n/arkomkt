"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/config";

export default function Hero() {
    const t = useTranslations("Hero");

    return (
        <section id="home" className="pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <motion.h1
                    className="text-4xl md:text-6xl font-sans mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {t.rich("title", {
                        b: (chunks) => <b>{chunks}</b>,
                        br: () => <br />,
                    })}
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl text-gray-mid mb-10 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {t.rich("subtitle", {
                        br: () => <br />,
                    })}
                </motion.p>
                <motion.div
                    className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Link href="#services" className="bg-foreground text-background px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
                        {t("cta.primary")}
                    </Link>
                    <div className="text-center md:text-left">
                        <Link href="/contacto" className="text-foreground font-medium underline underline-offset-4 decoration-2">
                            {t("cta.secondary")}
                        </Link>
                        <p className="text-xs text-gray-mid mt-1">
                            {t.rich("cta.note", {
                                br: () => <br />,
                            })}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
