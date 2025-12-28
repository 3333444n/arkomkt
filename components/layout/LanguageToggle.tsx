'use client';

import { useLocale } from 'next-intl';
import { locales, usePathname, useRouter } from '@/i18n/config';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LanguageToggle() {
    const currentLocale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleOpen = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLocaleChange = (newLocale: string) => {
        setIsOpen(false);
        router.replace(pathname, { locale: newLocale });
    };

    const getLocaleLabel = (locale: string) => {
        switch (locale) {
            case 'es': return 'ES';
            case 'en': return 'EN';
            case 'fr': return 'FR';
            default: return locale.toUpperCase();
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleOpen}
                className="flex items-center space-x-1 px-3 py-2 rounded-md border border-gray-light bg-background hover:bg-gray-light transition-colors focus:outline-none text-sm font-medium"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span>{getLocaleLabel(currentLocale)}</span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-20 rounded-md shadow-lg bg-background border border-gray-light z-50 overflow-hidden"
                    >
                        <div className="py-1">
                            {locales.map((locale) => (
                                <button
                                    key={locale}
                                    onClick={() => handleLocaleChange(locale)}
                                    className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-gray-light ${currentLocale === locale ? 'font-bold text-baby-blue' : ''
                                        }`}
                                >
                                    {getLocaleLabel(locale)}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
