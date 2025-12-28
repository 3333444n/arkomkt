"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Clients() {
    const t = useTranslations("Clients");

    return (
        <section className="py-12 border-y border-gray-light overflow-hidden">
            <div className="container mx-auto px-4 mb-8">
                <h3 className="text-center text-sm uppercase tracking-widest text-gray-mid">
                    {t("title")}
                </h3>
            </div>
            <div className="relative flex">
                <motion.div
                    className="flex space-x-12 animate-marquee whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Logo Placeholders - Will be populated from clients.json */}
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="text-2xl font-bold text-gray-300">
                            CLIENT LOGO {i}
                        </div>
                    ))}
                    {/* Duplicate for infinite loop */}
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={`dup-${i}`} className="text-2xl font-bold text-gray-300">
                            CLIENT LOGO {i}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
