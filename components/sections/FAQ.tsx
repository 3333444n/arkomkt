"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function FAQ() {
    const t = useTranslations("FAQ");

    // Note: t.raw('items') would be used to get the array from messages
    // For now, we'll just scaffold the structure.

    return (
        <section className="py-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">{t("title")}</h2>

                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b border-gray-light py-6">
                            <button className="flex justify-between items-center w-full text-left font-bold text-lg">
                                <span>Sample Question {i}?</span>
                                <span className="text-2xl">+</span>
                            </button>
                            <div className="mt-4 text-gray-mid hidden">
                                Sample answer for the question above.
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
