"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Navbar() {
    const t = useTranslations("Navbar");

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-xl font-bold">Arko MKT</div>
                <div className="hidden md:flex space-x-8">
                    <a href="#home">{t("home")}</a>
                    <a href="#about">{t("about")}</a>
                    <a href="#services">{t("services")}</a>
                    <a href="#projects">{t("projects")}</a>
                    <a href="#contact">{t("contact")}</a>
                </div>
                {/* Language Toggle Placeholder */}
                <div className="flex items-center space-x-4">
                    <button className="text-sm">ES</button>
                </div>
            </div>
        </nav>
    );
}
