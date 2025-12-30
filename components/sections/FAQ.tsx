"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/config";

interface FAQItemProps {
    index: number;
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
    return (
        <div className="border-b border-gray-light last:border-0 w-full max-w-full">
            <button
                onClick={onToggle}
                className="flex justify-between items-center w-full py-6 text-left focus:outline-none group gap-4"
            >
                <div className="flex-1 min-w-0">
                    <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-foreground' : 'text-gray-dark group-hover:text-foreground'}`}>
                        {question}
                    </span>
                </div>
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
                        className="overflow-hidden"
                    >
                        <div className="pb-8 text-gray-mid text-lg leading-relaxed">
                            <p
                                dangerouslySetInnerHTML={{ __html: answer }}
                                className="whitespace-normal"
                                style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
                            />
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
        <section id="faq" className="py-20 bg-background overflow-hidden w-full">
            <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-24 w-full overflow-hidden">
                    {/* Left Column: Title and Description */}
                    <div className="xl:col-span-5 flex flex-col justify-between min-w-0">
                        <motion.div
                            className="text-center xl:text-left"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-serif mb-6">{t("title")}</h2>
                            <p className="text-xl text-gray-mid leading-relaxed mb-10 max-w-lg mx-auto xl:mx-0">
                                {t("description")}
                            </p>
                        </motion.div>

                        {/* Still have questions? - Desktop */}
                        <motion.div
                            className="hidden xl:block pt-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-2xl font-bold mb-4">{t("stillQuestions")}</h3>
                            <Link
                                href="/contacto"
                                className="inline-block py-3 px-8 border border-foreground rounded-full font-bold hover:bg-foreground hover:text-background transition-all"
                            >
                                {t("contactButton")}
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right Column: Questions */}
                    <motion.div
                        className="xl:col-span-7 w-full min-w-0 overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="w-full max-w-full overflow-hidden">
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
                        </div>

                        {/* Still have questions? - Mobile/Tablet */}
                        <motion.div
                            className="xl:hidden mt-12 pt-10 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-2xl font-bold mb-4">{t("stillQuestions")}</h3>
                            <Link
                                href="/contacto"
                                className="inline-block py-3 px-8 border border-foreground rounded-full font-bold hover:bg-foreground hover:text-background transition-all"
                            >
                                {t("contactButton")}
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
