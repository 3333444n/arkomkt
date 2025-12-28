"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/config";

export default function About() {
    const t = useTranslations("About");

    return (
        <section id="about" className="py-20 bg-gray-light">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-3xl md:text-4xl font-serif mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p
                        className="text-xl leading-relaxed text-gray-mid mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {t.rich("content", {
                            b: (chunks) => <b>{chunks}</b>,
                        })}
                    </motion.p>
                    <Link href="/contacto">
                        <motion.button
                            className="bg-foreground text-background px-8 py-3 rounded-full font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {t("cta")}
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
