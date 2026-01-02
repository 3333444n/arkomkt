import type { Metadata } from "next";
import { Golos_Text, Instrument_Serif } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/config";
import { notFound } from "next/navigation";
import "../globals.css";

const sansSerif = Golos_Text({
  variable: "--font-sans-serif",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://arkomkt.com"),
  title: "Arko MKT",
  description: "Digital Marketing & AI Agency",
  icons: {
    icon: "/logos/icon-black.svg",
    apple: "/logos/icon-black.svg",
  },
  openGraph: {
    images: [
      {
        url: "/images/gradients/gradient1.webp",
        width: 1200,
        height: 630,
        alt: "Arko MKT Gradient",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/gradients/gradient1.webp"],
  },
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

import { Providers } from "@/components/layout/Providers";
import GradientPreloader from "@/components/util/GradientPreloader";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is a valid locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${sansSerif.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>

      </head>
      <body
        className="antialiased"
      >
        <Providers locale={locale} messages={messages}>
          <GradientPreloader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
