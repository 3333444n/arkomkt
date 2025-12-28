"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import servicesData from "@/data/services.json";

export default function ContactForm() {
    const t = useTranslations("Contact");
    const locale = useLocale();

    // Extract categories from servicesData
    const categories = servicesData.categories;

    return (
        <section className="py-20 px-4">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center md:text-left"
                >
                    <h1 className="text-4xl font-serif mb-4">{t("title")}</h1>
                    <p className="text-gray-mid">{t("subtitle")}</p>
                </motion.div>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">{t("form.name")}</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full p-3 rounded-lg border border-gray-light bg-background focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder={t("form.name")}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">{t("form.email")}</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full p-3 rounded-lg border border-gray-light bg-background focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder={t("form.email")}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Country */}
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium mb-2">{t("form.country")}</label>
                            <input
                                type="text"
                                id="country"
                                className="w-full p-3 rounded-lg border border-gray-light bg-background focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder={t("form.country")}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-2">{t("form.phone")}</label>
                            <div className="flex">
                                <span className="p-3 border border-gray-light rounded-l-lg bg-gray-light text-gray-mid">🌐</span>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="w-full p-3 rounded-r-lg border border-l-0 border-gray-light bg-background focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder={t("form.phone")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Service / Project Type */}
                    <div>
                        <label htmlFor="service" className="block text-sm font-medium mb-2">{t("form.service")}</label>
                        <select
                            id="service"
                            className="w-full p-3 rounded-lg border border-gray-light bg-background focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">{t("form.servicePlaceholder")}</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {/* @ts-ignore - dynamic key based on locale */}
                                    {category.name[locale] || category.name['es']}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Budget Range */}
                    <div>
                        <label className="block text-sm font-medium mb-4">{t("form.budget")}</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {['range1', 'range2', 'range3', 'range4'].map((range) => (
                                <label key={range} className="flex items-center p-4 border border-gray-light rounded-lg cursor-pointer hover:bg-gray-light/50 transition-colors">
                                    <input type="radio" name="budget" value={range} className="mr-3" />
                                    <span>{t(`form.budgetOptions.${range}`)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">{t("form.message")}</label>
                        <textarea
                            id="message"
                            rows={4}
                            className="w-full p-3 rounded-lg border border-gray-light bg-background focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder={t("form.messagePlaceholder")}
                        ></textarea>
                    </div>

                    {/* Preferred Response Method */}
                    <div>
                        <label className="block text-sm font-medium mb-4">{t("form.preferredMethod")}</label>
                        <div className="flex space-x-6">
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="preferredMethod" value="email" className="mr-2" />
                                <span>{t("form.emailMethod")}</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input type="radio" name="preferredMethod" value="whatsapp" className="mr-2" />
                                <span>{t("form.whatsappMethod")}</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full md:w-auto px-8 py-3 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-opacity"
                    >
                        {t("form.submit")}
                    </button>
                </form>
            </div>
        </section>
    );
}
