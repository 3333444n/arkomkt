"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/config";

export default function CTA() {
    const t = useTranslations("CTA");

    return (
        <section className="py-10 mx-5">
            <div className="relative min-h-[80vh] w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/gradients/gradient2.webp')" }}>
                <div className="container mx-auto px-8 md:px-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-6xl font-sans mb-6 text-static-white">{t("title")}</h2>
                        <p className="text-lg md:text-xl text-static-white/90 mb-10 max-w-2xl mx-auto">
                            {t("description")}
                        </p>
                        <Link href="/contacto" className="inline-block bg-static-white text-static-black px-12 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all shadow-lg hover:scale-105 active:scale-95">
                            {t("button")}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
