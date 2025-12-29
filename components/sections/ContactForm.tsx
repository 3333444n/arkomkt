"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import servicesData from "@/data/services.json";
import countriesData from "@/data/countries.json";

interface Country {
    name: string;
    code: string;
    dial_code: string;
    flag: string;
}

export default function ContactForm() {
    const t = useTranslations("Contact");
    const locale = useLocale();

    // Extract categories from servicesData
    const categories = servicesData.categories;

    // State for country and phone
    const [selectedCountryCode, setSelectedCountryCode] = useState("");
    const [selectedDialCode, setSelectedDialCode] = useState("");

    // Set default dial code based on country selection
    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const countryCode = e.target.value;
        setSelectedCountryCode(countryCode);

        const country = (countriesData as Country[]).find(c => c.code === countryCode);
        if (country) {
            setSelectedDialCode(country.dial_code);
        }
    };

    return (
        <section
            className="min-h-screen py-24 px-4 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/images/gradients/gradient4.webp')" }}
        >
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center md:text-left"
                >
                    <h1 className="text-4xl md:text-5xl font-serif mb-4 text-static-white">{t("title")}</h1>
                    <p className="text-static-white/80">{t("subtitle")}</p>
                </motion.div>

                {/* Glassmorphism Form Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-static-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2 text-static-black">{t("form.name")}</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-3 rounded-lg border border-gray-mid/30 bg-static-white focus:ring-2 focus:ring-blue-500 outline-none text-static-black placeholder:text-gray-mid"
                                    placeholder={t("form.name")}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2 text-static-black">{t("form.email")}</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 rounded-lg border border-gray-mid/30 bg-static-white focus:ring-2 focus:ring-blue-500 outline-none text-static-black placeholder:text-gray-mid"
                                    placeholder={t("form.email")}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Country */}
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium mb-2 text-static-black">{t("form.country")}</label>
                                <select
                                    id="country"
                                    className="w-full p-3 rounded-lg border border-gray-mid/30 bg-static-white focus:ring-2 focus:ring-blue-500 outline-none text-static-black"
                                    value={selectedCountryCode}
                                    onChange={handleCountryChange}
                                    required
                                >
                                    <option value="" disabled>{t("form.country")}</option>
                                    {(countriesData as Country[]).map((country) => (
                                        <option key={country.code} value={country.code}>
                                            {country.flag} {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-static-black">{t("form.phone")}</label>
                                <div className="flex">
                                    <select
                                        className="p-3 border border-gray-mid/30 rounded-l-lg bg-gray-light/50 text-static-black border-r-0 focus:ring-2 focus:ring-blue-500 outline-none max-w-[120px]"
                                        value={selectedDialCode}
                                        onChange={(e) => setSelectedDialCode(e.target.value)}
                                    >
                                        <option value="" disabled>---</option>
                                        {(countriesData as Country[]).map((country) => (
                                            <option key={`${country.code}-dial`} value={country.dial_code}>
                                                {country.code} {country.dial_code}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full p-3 rounded-r-lg border border-gray-mid/30 bg-static-white focus:ring-2 focus:ring-blue-500 outline-none text-static-black placeholder:text-gray-mid"
                                        placeholder={t("form.phone")}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Service / Project Type */}
                        <div>
                            <label htmlFor="service" className="block text-sm font-medium mb-2 text-static-black">{t("form.service")}</label>
                            <select
                                id="service"
                                className="w-full p-3 rounded-lg border border-gray-mid/30 bg-static-white focus:ring-2 focus:ring-blue-500 outline-none text-static-black"
                                required
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
                            <label className="block text-sm font-medium mb-4 text-static-black">{t("form.budget")}</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['range1', 'range2', 'range3', 'range4'].map((range) => (
                                    <label key={range} className="flex items-center p-4 border border-gray-mid/30 rounded-lg cursor-pointer hover:bg-gray-light/50 transition-colors text-static-black">
                                        <input type="radio" name="budget" value={range} className="mr-3" required />
                                        <span>{t(`form.budgetOptions.${range}`)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2 text-static-black">{t("form.message")}</label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full p-3 rounded-lg border border-gray-mid/30 bg-static-white focus:ring-2 focus:ring-blue-500 outline-none text-static-black placeholder:text-gray-mid"
                                placeholder={t("form.messagePlaceholder")}
                                required
                            ></textarea>
                        </div>

                        {/* Preferred Response Method */}
                        <div>
                            <label className="block text-sm font-medium mb-4 text-static-black">{t("form.preferredMethod")}</label>
                            <div className="flex space-x-6">
                                <label className="flex items-center cursor-pointer text-static-black">
                                    <input type="radio" name="preferredMethod" value="email" className="mr-2" required />
                                    <span>{t("form.emailMethod")}</span>
                                </label>
                                <label className="flex items-center cursor-pointer text-static-black">
                                    <input type="radio" name="preferredMethod" value="whatsapp" className="mr-2" required />
                                    <span>{t("form.whatsappMethod")}</span>
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3 bg-static-black text-static-white rounded-full font-bold hover:opacity-90 transition-opacity"
                        >
                            {t("form.submit")}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
