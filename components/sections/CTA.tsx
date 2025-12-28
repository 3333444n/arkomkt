"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
    const t = useTranslations("CTA");

    return (
        <section className="py-20 bg-baby-blue">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-serif mb-8">{t("title")}</h2>
                    <Link href="/contacto" className="bg-foreground text-background px-12 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-shadow">
                        {t("button")}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
