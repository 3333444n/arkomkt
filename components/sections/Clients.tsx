"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import clientsData from "@/data/clients.json";

interface Client {
    name: string;
    logo?: string;
    logoLight?: string;
    logoDark?: string;
    url: string;
}

export default function Clients() {
    const t = useTranslations("Clients");
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Only render logos once mounted to avoid hydration mismatch with theme
    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = mounted ? resolvedTheme || theme : 'dark';

    const clients = (clientsData as { clients: Client[] }).clients;

    return (
        <section className="py-24 border-y border-gray-light overflow-hidden bg-background w-full max-w-[100vw]">
            <div className="container mx-auto px-4 mb-20">
                <h3 className="text-center text-sm uppercase tracking-widest text-gray-mid">
                    {t("title")}
                </h3>
            </div>

            <div className="relative overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                {/* Animated Track */}
                <div className="flex w-fit animate-infinite-scroll items-center py-4">
                    {/* First set of logos */}
                    <div className="flex gap-20 items-center pr-20">
                        {clients.map((client: Client, index: number) => {
                            const logoSrc = client.logo || (currentTheme === 'dark' ? client.logoLight : client.logoDark);

                            // Specific scaling factors
                            let scale = 1;
                            if (client.name === "BBH") scale = 1.50;
                            if (client.name === "Eliel" || client.name === "Urban") scale = 2;
                            if (client.name === "Vane") scale = 0.75;

                            return (
                                <div
                                    key={`first-${index}`}
                                    className="flex h-20 w-48 sm:h-28 sm:w-64 flex-shrink-0 items-center justify-center"
                                    style={{ transform: `scale(${scale})` }}
                                >
                                    <Image
                                        src={logoSrc || "/logos/clients/joss.png"}
                                        alt={client.name}
                                        width={256}
                                        height={112}
                                        className="h-full w-full object-contain"
                                        priority={index < 4}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Duplicate set for seamless loop */}
                    <div className="flex gap-20 items-center pr-20">
                        {clients.map((client: Client, index: number) => {
                            const logoSrc = client.logo || (currentTheme === 'dark' ? client.logoLight : client.logoDark);

                            // Specific scaling factors
                            let scale = 1;
                            if (client.name === "BBH") scale = 1.5;
                            if (client.name === "Eliel" || client.name === "Urban") scale = 2;
                            if (client.name === "Vane") scale = 0.75;

                            return (
                                <div
                                    key={`second-${index}`}
                                    className="flex h-20 w-48 sm:h-28 sm:w-64 flex-shrink-0 items-center justify-center"
                                    style={{ transform: `scale(${scale})` }}
                                >
                                    <Image
                                        src={logoSrc || "/logos/clients/joss.png"}
                                        alt={client.name}
                                        width={256}
                                        height={112}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
