import type { Metadata } from "next";
import { Urbanist, Instrument_Serif } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/config";
import { notFound } from "next/navigation";
import "../globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arko MKT",
  description: "Digital Marketing & AI Agency",
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

import { Providers } from "@/components/layout/Providers";

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
    <html lang={locale} className={`${urbanist.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>

      </head>
      <body
        className="antialiased"
      >
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
