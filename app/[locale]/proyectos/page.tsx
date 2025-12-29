import { getProjects } from "@/lib/content";
import ProjectsList from "@/components/projects/ProjectsList";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export default async function ProjectsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);

    const projects = await getProjects(locale);

    // We could also fetch translated page title here using next-intl
    // But for now we just render the list which has its own title mechanism if needed
    // or we render a header here.

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4 mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-serif font-medium mb-4">
                    Proyectos
                </h1>
                <p className="opacity-60 max-w-2xl mx-auto">
                    Explora nuestro portafolio de casos de éxito y soluciones digitales.
                </p>
            </div>

            <ProjectsList projects={projects} locale={locale} />
        </div>
    );
}
