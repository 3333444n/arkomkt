"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/config";

export default function Hero() {
    const t = useTranslations("Hero");

    // Generate particles with staggered delays spread across the animation cycle
    const particles = [
        // Left edge particles (0-10%)
        { id: 1, left: "1%", size: 2, duration: 12 },
        { id: 2, left: "3%", size: 3, duration: 14.5 },
        { id: 3, left: "5%", size: 1, duration: 13 },
        { id: 4, left: "7%", size: 2, duration: 15 },
        { id: 5, left: "2%", size: 3, duration: 11.5 },
        { id: 6, left: "4%", size: 1, duration: 16 },
        { id: 7, left: "8%", size: 2, duration: 12.5 },
        { id: 8, left: "6%", size: 3, duration: 14 },
        // Right edge particles (90-100%)
        { id: 9, left: "99%", size: 2, duration: 13 },
        { id: 10, left: "97%", size: 3, duration: 15.5 },
        { id: 11, left: "95%", size: 1, duration: 12 },
        { id: 12, left: "93%", size: 2, duration: 14 },
        { id: 13, left: "98%", size: 3, duration: 16.5 },
        { id: 14, left: "96%", size: 1, duration: 11 },
        { id: 15, left: "92%", size: 2, duration: 13.5 },
        { id: 16, left: "94%", size: 3, duration: 15 },
        // Center-left particles (10-30%)
        { id: 17, left: "10%", size: 2, duration: 12 },
        { id: 18, left: "15%", size: 1, duration: 15 },
        { id: 19, left: "20%", size: 3, duration: 14 },
        { id: 20, left: "25%", size: 2, duration: 13.5 },
        { id: 21, left: "12%", size: 1, duration: 16 },
        { id: 22, left: "18%", size: 3, duration: 11.5 },
        { id: 23, left: "28%", size: 2, duration: 14.5 },
        // Center particles (30-70%)
        { id: 24, left: "35%", size: 3, duration: 11.5 },
        { id: 25, left: "40%", size: 2, duration: 11 },
        { id: 26, left: "45%", size: 1, duration: 16.5 },
        { id: 27, left: "50%", size: 1, duration: 13 },
        { id: 28, left: "55%", size: 1, duration: 14.5 },
        { id: 29, left: "60%", size: 3, duration: 16 },
        { id: 30, left: "65%", size: 2, duration: 14.5 },
        // Center-right particles (70-90%)
        { id: 31, left: "70%", size: 3, duration: 15.5 },
        { id: 32, left: "75%", size: 2, duration: 15 },
        { id: 33, left: "80%", size: 2, duration: 13 },
        { id: 34, left: "85%", size: 3, duration: 12.5 },
        { id: 35, left: "72%", size: 1, duration: 14 },
        { id: 36, left: "78%", size: 2, duration: 16 },
        { id: 37, left: "82%", size: 3, duration: 14 },
        { id: 38, left: "88%", size: 1, duration: 16.5 },
    ].map((p, index, arr) => ({
        ...p,
        // Stagger delays so particles appear gradually over a 10-second span
        delay: (index / arr.length) * 10
    }));

    return (
        <section id="home" className="py-15 px-10 md:px-60 md:py-40 lg:py-50 xl:py-60 w-full">
            {/* Particles container - breaks out of section to span full viewport */}
            <div
                className="absolute top-0 bottom-0 pointer-events-none"
                style={{
                    left: '50%',
                    marginLeft: '-50vw',
                    width: '100vw',
                    overflow: 'hidden',
                }}
            >
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute bg-baby-orange rounded-full"
                        style={{
                            left: p.left.replace('%', 'vw'), // Convert to viewport units
                            width: p.size,
                            height: p.size,
                            bottom: 0,
                        }}
                        initial={{
                            y: 0,
                            opacity: 0,
                            filter: "blur(0px)"
                        }}
                        animate={{
                            // Move from bottom upward (shorter distance to stay within component)
                            y: [0, -600],
                            // Fade in quickly at very bottom, then gradually fade out as it rises
                            opacity: [0, 0.8, 0.6, 0.3, 0],
                            // Blur gradually increases as particle moves up
                            filter: ["blur(0px)", "blur(0px)", "blur(0.5px)", "blur(1.5px)", "blur(3px)"]
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "linear",
                            // Fade in at 0-5%, then gradually fade/blur from 40% onward
                            times: [0, 0.05, 0.4, 0.7, 1]
                        }}
                    />
                ))}
            </div>
            <div className="container mx-auto px-4 text-center pt-16">
                <motion.h1
                    className="text-4xl md:text-6xl font-sans mb-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {t.rich("title", {
                        b: (chunks) => (
                            <b className="relative inline-block">
                                <span className="relative z-10">{chunks}</span>
                                {/* Glow layer - looping gradient prevents hard edges during animation */}
                                <span
                                    className="absolute -inset-6 blur-3xl opacity-70 animate-gradient-xy"
                                    style={{
                                        background: 'linear-gradient(90deg, var(--baby-blue), var(--baby-purple), var(--baby-pink), var(--baby-blue))',
                                        backgroundSize: '300% 300%',
                                    }}
                                    aria-hidden="true"
                                />
                            </b>
                        ),
                        br: () => <br />,
                    })}
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl text-gray-mid mb-10 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {t.rich("subtitle", {
                        br: () => <br />,
                    })}
                </motion.p>
                <motion.div
                    className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="relative group min-w-[300px]">
                        <div className="absolute -inset-1 bg-gradient-to-r from-baby-blue via-baby-purple to-baby-pink blur-lg opacity-75 transition duration-200 group-hover:opacity-100 animate-gradient-xy bg-[length:200%_200%] rounded-full"></div>
                        <Link href="#services" className="relative block text-sm md:text-base bg-foreground text-background px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
                            {t("cta.primary")}
                        </Link>
                    </div>
                    <div className="text-center md:text-left">
                        <Link href="/contacto" className="text-foreground font-medium underline underline-offset-4 decoration-2">
                            {t("cta.secondary")}
                        </Link>
                        <p className="text-xs text-gray-mid mt-1">
                            {t.rich("cta.note", {
                                br: () => <br />,
                            })}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
