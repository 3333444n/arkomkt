"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/config";

export default function About() {
    const t = useTranslations("About");

    return (
        <section id="about" className="py-10">
            <div className="relative min-h-[80vh] w-[90vw] mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden flex items-center bg-cover bg-center" style={{ backgroundImage: "url('/images/gradients/gradient1.webp')" }}>
                <div className="container mx-auto px-8 md:px-16 lg:px-24">
                    <div className="max-w-4xl text-left">
                        <motion.h2
                            className="text-3xl md:text-4xl font-serif mb-8 text-static-white"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {t("title")}
                        </motion.h2>
                        <motion.p
                            className="text-xl md:text-2xl leading-relaxed mb-10 text-static-white/90"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {t.rich("content", {
                                b: (chunks) => <b className="text-static-white font-bold">{chunks}</b>,
                            })}
                        </motion.p>
                        <Link href="/contacto">
                            <motion.button
                                className="bg-static-white text-static-black px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg"
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
            </div>
        </section>
    );
}
