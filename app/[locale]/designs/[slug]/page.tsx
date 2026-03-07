import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { DESIGN_SLUGS, designSlugToItemKey, isDesignSlug } from "@/lib/designs";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { DesignDemos } from "@/components/designs/DesignDemos";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return DESIGN_SLUGS.map((slug) => ({ slug }));
}

export default async function DesignDemoPage({ params }: Props) {
  const { slug } = await params;
  if (!isDesignSlug(slug)) notFound();

  const t = await getTranslations("designShowcase");
  const itemKey = designSlugToItemKey(slug);
  const title = t(`items.${itemKey}.title`);
  const backToShowcase = t("backToShowcase");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Demo header bar */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/#design-showcase"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            {backToShowcase}
          </Link>
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            {title}
          </span>
          <span className="w-20" aria-hidden />
        </div>
      </header>

      <DesignDemos slug={slug} />
    </div>
  );
}
