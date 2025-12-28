"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItemProps {
    index: number;
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
    return (
        <div className="border-b border-gray-light last:border-0 overflow-hidden">
            <button
                onClick={onToggle}
                className="flex justify-between items-center w-full py-6 text-left focus:outline-none group"
            >
                <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-foreground' : 'text-gray-dark group-hover:text-foreground'}`}>
                    {question}
                </span>
                <motion.span
                    className="text-2xl ml-4 flex-shrink-0"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    +
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="pb-8 text-gray-mid text-lg leading-relaxed">
                            {/* Using dangerouslySetInnerHTML for b tags until we decide on t.rich complexity */}
                            {/* next-intl's t.rich is safer, but for simple b tags this works well with trusted message content */}
                            <p dangerouslySetInnerHTML={{ __html: answer }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQ() {
    const t = useTranslations("FAQ");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Using raw to get the items array from translations
    const items = t.raw("items") as { question: string; answer: string }[];

    return (
        <section id="faq" className="py-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-serif mb-4">{t("title")}</h2>
                </motion.div>

                <motion.div
                    className="bg-white/5 dark:bg-white/5 rounded-3xl p-4 md:p-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="divide-y divide-gray-light">
                        {items.map((item, index) => (
                            <FAQItem
                                key={index}
                                index={index}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openIndex === index}
                                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
