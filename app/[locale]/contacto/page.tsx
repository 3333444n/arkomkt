import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/layout/Footer";

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <main className="min-h-screen">
            <Navbar />
            <ContactForm />
            <Footer />
        </main>
    );
}
