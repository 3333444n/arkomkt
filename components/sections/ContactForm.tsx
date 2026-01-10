"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
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

    // State for multi-select services
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    // Toggle service selection
    const toggleService = (categoryId: string) => {
        setSelectedServices(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    // Get color class for category
    const getCategoryColor = (color: string) => {
        const colorMap: Record<string, string> = {
            'baby-blue': 'bg-baby-blue',
            'baby-green': 'bg-baby-green',
            'baby-pink': 'bg-baby-pink',
            'baby-orange': 'bg-baby-orange',
            'baby-purple': 'bg-baby-purple',
            'baby-yellow': 'bg-baby-yellow',
            'baby-red': 'bg-baby-red',
        };
        return colorMap[color] || 'bg-gray-light';
    };

    // State for form submission
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    // Field validation errors
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Honeypot field for bot detection
    const [honeypot, setHoneypot] = useState("");

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Validate form before submission
    const validateForm = (formData: FormData): boolean => {
        const errors: Record<string, string> = {};

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const budget = formData.get("budget") as string;
        const preferredMethod = formData.get("preferredMethod") as string;

        if (!name || name.trim() === "") {
            errors.name = t("form.required");
        }

        if (!email || email.trim() === "") {
            errors.email = t("form.required");
        } else if (!emailRegex.test(email)) {
            errors.email = t("form.invalidEmail");
        }

        if (!selectedCountryCode) {
            errors.country = t("form.required");
        }

        if (!phone || phone.trim() === "") {
            errors.phone = t("form.required");
        }

        if (selectedServices.length === 0) {
            errors.services = t("form.selectService");
        }

        if (!budget) {
            errors.budget = t("form.selectBudget");
        }

        if (!preferredMethod) {
            errors.preferredMethod = t("form.selectMethod");
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Set default dial code based on country selection
    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const countryCode = e.target.value;
        setSelectedCountryCode(countryCode);

        const country = (countriesData as Country[]).find(c => c.code === countryCode);
        if (country) {
            setSelectedDialCode(country.dial_code);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setFieldErrors({});

        const form = e.currentTarget;
        const formDataObj = new FormData(form);

        // Validate form
        if (!validateForm(formDataObj)) {
            return;
        }

        setIsSubmitting(true);

        // Get country name from code
        const country = (countriesData as Country[]).find(c => c.code === selectedCountryCode);
        const countryName = country ? `${country.flag} ${country.name}` : selectedCountryCode;

        // Get phone with dial code
        const phoneInput = formDataObj.get("phone") as string;
        const fullPhone = selectedDialCode ? `${selectedDialCode} ${phoneInput}` : phoneInput;

        // Get service names from selected IDs (multi-select)
        const serviceNames = selectedServices.map(serviceId => {
            const service = categories.find(c => c.id === serviceId);
            return service ? (service.name[locale as keyof typeof service.name] || service.name['es']) : serviceId;
        });

        // Get budget value (radio button) - send tier labels for language-independent data
        const budgetValue = formDataObj.get("budget") as string;
        const budgetMap: Record<string, string> = {
            range1: "Tier 1",
            range2: "Tier 2",
            range3: "Tier 3",
            range4: "Tier 4"
        };

        // Get preferred contact method (radio button)
        const preferredMethod = formDataObj.get("preferredMethod") as string;

        const payload = {
            name: formDataObj.get("name") as string,
            email: formDataObj.get("email") as string,
            country: countryName,
            phoneNumber: fullPhone,
            servicesOfInterest: serviceNames, // Now an array for multi-select
            budget: budgetMap[budgetValue] || budgetValue,
            notes: formDataObj.get("message") as string,
            contactMethod: preferredMethod,
            language: locale, // Include language for Airtable
            website: honeypot, // Honeypot field - should be empty for real users
        };

        console.log("Submitting form data:", payload); // Debug log

        try {
            const response = await fetch("https://lead-form-handler.the4rko.workers.dev/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Form-Token": process.env.NEXT_PUBLIC_FORM_TOKEN || "",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setSubmitted(true);
                form.reset();
                setSelectedCountryCode("");
                setSelectedDialCode("");
                setSelectedServices([]);
            } else {
                const errorText = await response.text();
                console.error("Form submission failed:", response.status, errorText);
                setError(t("form.error"));
            }
        } catch (err) {
            console.error("Form submission error:", err);
            setError(t("form.error"));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success message
    if (submitted) {
        return (
            <section
                className="min-h-screen py-24 px-4 bg-cover bg-center bg-fixed"
                style={{ backgroundImage: "url('/images/gradients/gradient4.webp')" }}
            >
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-static-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl text-center"
                    >
                        <h2 className="text-3xl font-serif mb-4 text-static-black">
                            {t("form.successTitle") || "¡Gracias por contactarnos!"}
                        </h2>
                        <p className="text-static-black/80">
                            {t("form.successMessage") || "Nos pondremos en contacto contigo pronto."}
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

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

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-static-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Honeypot field - hidden from real users, bots will fill it */}
                        <div
                            aria-hidden="true"
                            style={{
                                position: 'absolute',
                                left: '-9999px',
                                opacity: 0,
                                height: 0,
                                overflow: 'hidden',
                                pointerEvents: 'none'
                            }}
                        >
                            <label htmlFor="website">Website</label>
                            <input
                                type="text"
                                id="website"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2 text-static-black">
                                    {t("form.name")} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    maxLength={64}
                                    className={`w-full p-3 rounded-lg border bg-static-white focus:ring-2 focus:ring-blue-500 outline-none text-static-black placeholder:text-gray-mid ${fieldErrors.name ? 'border-red-500' : 'border-gray-mid/30'}`}
                                    placeholder={t("form.name")}
                                />
                                {fieldErrors.name && (
                                    <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2 text-static-black">
                                    {t("form.email")} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    maxLength={254}
                                    className={`w-full p-3 rounded-lg border bg-static-white focus:ring-2 focus:ring-blue-500 outline-none text-static-black placeholder:text-gray-mid ${fieldErrors.email ? 'border-red-500' : 'border-gray-mid/30'}`}
                                    placeholder={t("form.email")}
                                />
                                {fieldErrors.email && (
                                    <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Country */}
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium mb-2 text-static-black">
                                    {t("form.country")} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="country"
                                    name="country"
                                    className={`w-full p-3 rounded-lg border bg-static-white focus:ring-2 focus:ring-blue-500 outline-none text-static-black ${fieldErrors.country ? 'border-red-500' : 'border-gray-mid/30'}`}
                                    value={selectedCountryCode}
                                    onChange={handleCountryChange}
                                >
                                    <option value="" disabled>{t("form.country")}</option>
                                    {(countriesData as Country[]).map((country) => (
                                        <option key={country.code} value={country.code}>
                                            {country.flag} {country.name}
                                        </option>
                                    ))}
                                </select>
                                {fieldErrors.country && (
                                    <p className="text-red-500 text-sm mt-1">{fieldErrors.country}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-static-black">
                                    {t("form.phone")} <span className="text-red-500">*</span>
                                </label>
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
                                        name="phone"
                                        maxLength={15}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        onInput={(e) => {
                                            const target = e.target as HTMLInputElement;
                                            target.value = target.value.replace(/[^0-9]/g, '');
                                        }}
                                        className={`w-full p-3 rounded-r-lg border bg-static-white focus:ring-2 focus:ring-blue-500 outline-none text-static-black placeholder:text-gray-mid ${fieldErrors.phone ? 'border-red-500' : 'border-gray-mid/30'}`}
                                        placeholder={t("form.phone")}
                                    />
                                </div>
                                {fieldErrors.phone && (
                                    <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>
                                )}
                            </div>
                        </div>

                        {/* Service / Project Type - Multi-select Tag Selector */}
                        <div>
                            <label className="block text-sm font-medium mb-3 text-static-black">
                                {t("form.service")} <span className="text-red-500">*</span>
                            </label>

                            {/* Selected tags display */}
                            {selectedServices.length > 0 && (
                                <div className="flex flex-wrap gap-2 p-3 mb-3 border border-gray-mid/30 rounded-lg bg-static-white min-h-[48px]">
                                    {selectedServices.map(serviceId => {
                                        const category = categories.find(c => c.id === serviceId);
                                        if (!category) return null;
                                        return (
                                            <span
                                                key={serviceId}
                                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-static-black ${getCategoryColor(category.color)}`}
                                            >
                                                {/* @ts-ignore - dynamic key based on locale */}
                                                {category.name[locale] || category.name['es']}
                                                <button
                                                    type="button"
                                                    onClick={() => toggleService(serviceId)}
                                                    className="hover:bg-static-black/10 rounded-full p-0.5 transition-colors"
                                                    aria-label={`Remove ${category.name[locale as keyof typeof category.name] || category.name['es']}`}
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </span>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Available tags grid */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => {
                                    const isSelected = selectedServices.includes(category.id);
                                    return (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => toggleService(category.id)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2 ${isSelected
                                                ? `${getCategoryColor(category.color)} border-static-black/20 text-static-black shadow-sm`
                                                : 'bg-static-white border-gray-mid/30 text-static-black/70 hover:border-gray-mid/50 hover:bg-gray-light/30'
                                                }`}
                                        >
                                            {/* @ts-ignore - dynamic key based on locale */}
                                            {category.name[locale] || category.name['es']}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Hidden input for form validation - requires at least one selection */}
                            <input
                                type="hidden"
                                name="services"
                                value={selectedServices.join(',')}
                            />
                            {fieldErrors.services ? (
                                <p className="text-red-500 text-sm mt-2">{fieldErrors.services}</p>
                            ) : selectedServices.length === 0 && (
                                <p className="text-sm text-gray-mid mt-2">{t("form.servicePlaceholder")}</p>
                            )}
                        </div>

                        {/* Budget Range */}
                        <div>
                            <label className="block text-sm font-medium mb-4 text-static-black">
                                {t("form.budget")} <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {['range1', 'range2', 'range3', 'range4'].map((range) => (
                                    <label key={range} className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-light/50 transition-colors text-static-black ${fieldErrors.budget ? 'border-red-500' : 'border-gray-mid/30'}`}>
                                        <input type="radio" name="budget" value={range} className="mr-3" />
                                        <span>{t(`form.budgetOptions.${range}`)}</span>
                                    </label>
                                ))}
                            </div>
                            {fieldErrors.budget && (
                                <p className="text-red-500 text-sm mt-2">{fieldErrors.budget}</p>
                            )}
                        </div>

                        {/* Message */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2 text-static-black">{t("form.message")}</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                maxLength={256}
                                className="w-full p-3 rounded-lg border border-gray-mid/30 bg-static-white focus:ring-2 focus:ring-blue-500 outline-none text-static-black placeholder:text-gray-mid"
                                placeholder={t("form.messagePlaceholder")}
                            ></textarea>
                        </div>

                        {/* Preferred Response Method */}
                        <div>
                            <label className="block text-sm font-medium mb-4 text-static-black">
                                {t("form.preferredMethod")} <span className="text-red-500">*</span>
                            </label>
                            <div className="flex space-x-6">
                                <label className="flex items-center cursor-pointer text-static-black">
                                    <input type="radio" name="preferredMethod" value="Email" className="mr-2" />
                                    <span>{t("form.emailMethod")}</span>
                                </label>
                                <label className="flex items-center cursor-pointer text-static-black">
                                    <input type="radio" name="preferredMethod" value="WhatsApp" className="mr-2" />
                                    <span>{t("form.whatsappMethod")}</span>
                                </label>
                            </div>
                            {fieldErrors.preferredMethod && (
                                <p className="text-red-500 text-sm mt-2">{fieldErrors.preferredMethod}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-8 py-3 bg-static-black text-static-white rounded-full font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (t("form.submitting") || "Enviando...") : t("form.submit")}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}