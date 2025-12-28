import { getRequestConfig } from 'next-intl/server';
import { locales } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Ensure that a valid locale is used
    if (!locale || !locales.includes(locale as (typeof locales)[number])) {
        locale = 'es';
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
