"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/config";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";

export default function Navbar() {
    const t = useTranslations("Navbar");

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-light">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold tracking-tight">
                    Arko <span className="text-baby-blue">MKT</span>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/#home" className="hover:text-baby-blue transition-colors">{t("home")}</Link>
                    <Link href="/#about" className="hover:text-baby-blue transition-colors">{t("about")}</Link>
                    <Link href="/#services" className="hover:text-baby-blue transition-colors">{t("services")}</Link>
                    <Link href="/#projects" className="hover:text-baby-blue transition-colors">{t("projects")}</Link>
                    <Link href="/contacto" className="hover:text-baby-blue transition-colors">{t("contact")}</Link>
                </div>

                <div className="flex items-center space-x-3">
                    <LanguageToggle />
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}
