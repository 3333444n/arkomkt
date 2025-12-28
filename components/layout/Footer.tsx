"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-gray-light py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <div className="text-2xl font-bold mb-4">Arko MKT</div>
                        <p className="text-gray-mid">{t("tagline")}</p>
                    </div>
                    <div className="flex space-x-6 justify-end items-end">
                        <a href="#" className="hover:text-foreground transition-colors">{t("social.instagram")}</a>
                        <a href="#" className="hover:text-foreground transition-colors">{t("social.linkedin")}</a>
                        <a href="#" className="hover:text-foreground transition-colors">{t("social.facebook")}</a>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-mid">
                    {t("copyright")}
                </div>
            </div>
        </footer>
    );
}
