import { getProject, getProjectSlugs, getToolLogo } from "@/lib/content";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getServiceCategoryName, getServiceCategoryColor } from "@/lib/services";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
    const slugs = await getProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const project = await getProject(slug, locale);

    if (!project) {
        notFound();
    }

    // Get accent color from first category
    const mainCategory = project.serviceCategories?.[0];
    const accentColor = getServiceCategoryColor(mainCategory || "");

    // MDX Components customization if needed
    const components = {
        h2: (props: any) => <h2 {...props} className="text-3xl font-serif mt-12 mb-6" />,
        p: (props: any) => <p {...props} className="mb-6 leading-relaxed opacity-80 text-lg" />,
        ul: (props: any) => <ul {...props} className="list-disc pl-6 mb-6 space-y-2" />,
        li: (props: any) => <li {...props} className="opacity-80" />,
    };

    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
                    <div className="container mx-auto">
                        {/* Breadcrumb-ish / Category Pills */}
                        <div className="flex gap-3 mb-6">
                            {project.serviceCategories.map(cat => (
                                <span key={cat} className="px-3 py-1 bg-background/20 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium">
                                    {getServiceCategoryName(cat, locale)}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 max-w-4xl">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-12 lg:px-20 -mt-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Sidebar / Metadata */}
                    <aside className="lg:col-span-4 order-2 lg:order-1">
                        <div className="bg-card border border-border rounded-xl p-8 sticky top-24 space-y-8">
                            {/* Client Info */}
                            <div>
                                <h3 className="text-xs uppercase tracking-widest opacity-50 mb-3">Client</h3>
                                <div className="flex items-center gap-3 mb-2">
                                    <img src={project.clientLogo} alt={project.client} className="h-8 w-auto max-w-[80px]" />
                                    <span className="font-bold text-lg">{project.client}</span>
                                </div>
                                {project.clientLocation && <p className="text-sm opacity-70">{project.clientLocation}</p>}
                            </div>

                            {/* Outcome */}
                            <div>
                                <h3 className="text-xs uppercase tracking-widest opacity-50 mb-3">Outcome</h3>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400 font-serif">
                                    {project.outcome}
                                </p>
                            </div>

                            {/* Tools */}
                            {project.tools && project.tools.length > 0 && (
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest opacity-50 mb-3">Tools</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {project.tools.map(tool => {
                                            const logo = getToolLogo(tool);
                                            return (
                                                <div key={tool} className="group relative flex items-center justify-center bg-muted p-2 rounded-lg w-10 h-10" title={tool}>
                                                    {logo ? (
                                                        <img src={logo} alt={tool} className="w-full h-full object-contain" />
                                                    ) : (
                                                        <span className="text-[10px]">{tool}</span>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Testimonial */}
                            {project.testimonial && (
                                <div className="pt-6 border-t border-border">
                                    <blockquote className="italic opacity-80 mb-4 text-sm">
                                        "{project.testimonial.text}"
                                    </blockquote>
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                                            <Image src={project.testimonial.photo} alt={project.testimonial.author} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{project.testimonial.author}</p>
                                            <p className="text-xs opacity-60">{project.testimonial.position}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <MDXRemote source={project.content} components={components} />
                        </div>

                        {/* Gallery */}
                        {project.images && project.images.length > 0 && (
                            <div className="mt-16 grid gap-8">
                                {project.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                                        <Image
                                            src={img}
                                            alt={`Gallery image ${idx + 1}`}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </article>
    );
}
