"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/config";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useRef, useCallback, useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";

const sidebarVariants: Variants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at calc(100% - 40px) 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: "circle(24px at calc(100% - 48px) 36px)",
        transition: {
            delay: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 35,
        },
    },
};

const navListVariants: Variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const navItemVariants: Variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
};

const socialContainerVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.2,
            duration: 0.2,
        },
    },
    closed: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.15,
        },
    },
};


export default function Navbar() {
    const t = useTranslations("Navbar");
    const tFooter = useTranslations("Footer");
    // isOpen controls the animation state (open/closed)
    const [isOpen, setIsOpen] = useState(false);
    // isMenuVisible controls whether the container stays h-screen (for animations to be visible)
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const containerRef = useRef(null);
    const router = useRouter();

    const height = 1500;

    // Animation duration for closing (in ms) - must be long enough for animation to complete
    const CLOSE_ANIMATION_DURATION = 800;
    // Navigation delay - navigate once menu looks mostly closed
    const NAV_DELAY = 500;

    const navLinks = [
        { name: t("home"), href: "/#home" },
        { name: t("about"), href: "/#about" },
        { name: t("services"), href: "/#services" },
        { name: t("projects"), href: "/#projects" },
        { name: t("contact"), href: "/contacto" },
    ];

    const socialLinks = [
        { key: "instagram", name: tFooter("social.instagram"), href: tFooter("links.instagram") },
        { key: "linkedin", name: tFooter("social.linkedin"), href: tFooter("links.linkedin") },
        { key: "facebook", name: tFooter("social.facebook"), href: tFooter("links.facebook") },
        { key: "tiktok", name: tFooter("social.tiktok"), href: tFooter("links.tiktok") },
        { key: "youtube", name: tFooter("social.youtube"), href: tFooter("links.youtube") },
    ];

    // When opening: make visible immediately, then animate open
    // When closing: animate closed, then hide after animation completes
    useEffect(() => {
        if (isOpen) {
            setIsMenuVisible(true);
        } else {
            // Keep visible during closing animation, then hide
            const timer = setTimeout(() => {
                setIsMenuVisible(false);
            }, CLOSE_ANIMATION_DURATION);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const openMenu = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggleMenu = useCallback(() => {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }, [isOpen, openMenu, closeMenu]);

    // Handle navigation with smooth scroll for hash links
    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        e.stopPropagation();
        closeMenu(); // Start closing animation

        // Check if it's a hash link (same-page navigation)
        const isHashLink = href.includes('#');
        const hash = isHashLink ? href.split('#')[1] : null;

        setTimeout(() => {
            if (hash) {
                // Smooth scroll to the section
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    // If element not found, use router (might be on different page)
                    router.push(href);
                }
            } else {
                // Regular navigation for non-hash links
                router.push(href);
            }
        }, NAV_DELAY);
    }, [router, closeMenu]);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
            className={`fixed top-0 left-0 right-0 z-50 ${isMenuVisible ? 'h-screen' : 'h-auto'}`}
            style={{ pointerEvents: isMenuVisible ? 'auto' : 'none' }}
        >
            {/* Header / Top Bar - always clickable */}
            <div
                className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-3 md:px-8 bg-background/80 backdrop-blur-md border-b border-gray-light transition-colors duration-300"
                style={{ pointerEvents: 'auto' }}
            >
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight z-50 mix-blend-difference text-foreground">
                    Arko <span className="text-baby-blue">MKT</span>
                </Link>

                <div className="flex items-center gap-4 z-50">
                    {/* Toggles - fade in when menu opens */}
                    <motion.div
                        className="flex items-center gap-2 mix-blend-difference text-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: isOpen ? 0.2 : 0 }}
                        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
                    >
                        <LanguageToggle />
                        <ThemeToggle />
                    </motion.div>

                    {/* Asterisk Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="w-12 h-12 flex items-center justify-center focus:outline-none mix-blend-difference text-foreground"
                        aria-label="Toggle Menu"
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-8 h-8 md:w-10 md:h-10 text-current"
                        >
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <path d="M12 2V22M2 12H22M4.92893 4.92893L19.0711 19.0711M19.0711 4.92893L4.92893 19.0711" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.div>
                    </button>
                </div>
            </div>

            {/* Menu Overlay */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full bg-background/80 backdrop-blur-md border-r border-gray-light/20 shadow-2xl overflow-hidden"
                variants={sidebarVariants}
            >
                {/* Clickable background to close menu */}
                <div
                    className="absolute inset-0 z-0"
                    onClick={closeMenu}
                    aria-hidden="true"
                />

                {/* Two Column Layout Container */}
                <div
                    className="relative z-10 flex flex-col md:flex-row h-full w-full px-4 md:px-12 lg:px-20 overflow-auto pt-24 pb-8"
                    onClick={closeMenu}
                >

                    {/* Left Column - Social Links (Desktop) / Bottom (Mobile) */}
                    <motion.div
                        variants={socialContainerVariants}
                        className="order-2 md:order-1 md:w-1/3 flex flex-col justify-end md:justify-center items-start mt-12 md:mt-0 md:pr-8"
                    >
                        <div className="flex flex-col gap-3 md:gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.key}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center text-sm md:text-base text-gray-mid hover:text-foreground transition-colors group lowercase"
                                >
                                    {link.name}
                                    <ArrowIcon className="ml-1 w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Navigation Links */}
                    <div className="order-1 md:order-2 md:w-2/3 flex flex-col justify-center">
                        <motion.ul variants={navListVariants} className="w-full space-y-4 md:space-y-6">
                            {navLinks.map((link) => (
                                <motion.li
                                    key={link.name}
                                    variants={navItemVariants}
                                    whileHover={{ x: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border-b border-gray-light/30 pb-2 md:pb-4 last:border-none"
                                >
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="flex items-center justify-between text-3xl md:text-5xl lg:text-6xl font-normal hover:font-black uppercase text-foreground transition-all duration-300 group cursor-pointer"
                                    >
                                        <span>{link.name}</span>
                                        <ArrowIcon className="w-6 h-6 md:w-10 md:h-10 transition-colors text-foreground" />
                                    </a>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>
                </div>
            </motion.div>
        </motion.nav>
    );
}

function ArrowIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
    )
}

