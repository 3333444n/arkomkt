import servicesData from '@/data/services.json';

export interface ServiceCategory {
    id: string;
    name: {
        es: string;
        en: string;
        fr: string;
    };
    color: string;
}

export function getServiceCategory(id: string): ServiceCategory | undefined {
    return servicesData.categories.find((category) => category.id === id);
}

export function getServiceCategoryColor(id: string): string {
    const category = getServiceCategory(id);
    return category ? category.color : 'gray-500'; // Default fallback
}

export function getServiceCategoryName(id: string, locale: string): string {
    const category = getServiceCategory(id);
    if (!category) return id;
    return (category.name as any)[locale] || category.name.es;
}
