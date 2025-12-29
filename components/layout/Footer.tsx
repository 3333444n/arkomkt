"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/config";

export default function Footer() {
    const t = useTranslations("Footer");
    const nav = useTranslations("Navbar");

    const socialLinks = [
        { key: "instagram", name: t("social.instagram"), href: t("links.instagram") },
        { key: "facebook", name: t("social.facebook"), href: t("links.facebook") },
        { key: "youtube", name: t("social.youtube"), href: t("links.youtube") },
        { key: "tiktok", name: t("social.tiktok"), href: t("links.tiktok") },
        { key: "linkedin", name: t("social.linkedin"), href: t("links.linkedin") },
    ];

    const navLinks = [
        { name: nav("home"), href: "/#home" },
        { name: nav("about"), href: "/#about" },
        { name: nav("services"), href: "/#services" },
        { name: nav("projects"), href: "/#projects" },
        { name: nav("contact"), href: "/contacto" },
    ];

    return (
        <footer className="bg-background border-t border-gray-light py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
                    {/* Navigation Column */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-foreground">
                            {t("navigationTitle")}
                        </h3>
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-mid hover:text-baby-blue transition-colors duration-300"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Channels Column */}
                    <div className="md:text-right">
                        <h3 className="text-xl font-bold mb-6 text-foreground">
                            {t("channelsTitle")}
                        </h3>
                        <ul className="space-y-4">
                            {socialLinks.map((link) => (
                                <li key={link.key}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-mid hover:text-baby-blue transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-light flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-mid">
                    <div className="font-bold text-foreground">
                        Arko <span className="text-baby-blue">MKT</span>
                    </div>
                    <p>{t("copyright")}</p>
                </div>
            </div>
        </footer>
    );
}
