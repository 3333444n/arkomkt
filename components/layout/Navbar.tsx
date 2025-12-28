"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/config";
import { motion } from "framer-motion";

export default function Navbar() {
    const t = useTranslations("Navbar");

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">Arko MKT</Link>
                <div className="hidden md:flex space-x-8">
                    <Link href="/#home">{t("home")}</Link>
                    <Link href="/#about">{t("about")}</Link>
                    <Link href="/#services">{t("services")}</Link>
                    <Link href="/#projects">{t("projects")}</Link>
                    <Link href="/contacto">{t("contact")}</Link>
                </div>
                {/* Language Toggle Placeholder */}
                <div className="flex items-center space-x-4">
                    <button className="text-sm">ES</button>
                </div>
            </div>
        </nav>
    );
}
