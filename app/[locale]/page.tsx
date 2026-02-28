import dynamic from "next/dynamic";
import { Container, Section, Heading } from "@/components/ui";
import { Hero } from "@/components/sections/Hero";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";
import { getTranslations } from "next-intl/server";
import { getBlurDataUrls } from "@/lib/getBlurDataUrl";
import { PROJECT_IMAGE_URLS } from "@/lib/projects";

const Projects = dynamic(
  () => import("@/components/sections/Projects").then((m) => ({ default: m.Projects })),
  { ssr: true, loading: () => <SectionSkeleton /> }
);
const TechStack = dynamic(
  () => import("@/components/sections/TechStack").then((m) => ({ default: m.TechStack })),
  { ssr: true }
);
const Services = dynamic(
  () => import("@/components/sections/Services").then((m) => ({ default: m.Services })),
  { ssr: true, loading: () => <SectionSkeleton /> }
);
const CodeShowcase = dynamic(
  () => import("@/components/sections/CodeShowcase").then((m) => ({ default: m.CodeShowcase })),
  { ssr: true }
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => ({ default: m.Testimonials })),
  { ssr: true }
);
const Contact = dynamic(
  () => import("@/components/sections/Contact").then((m) => ({ default: m.Contact })),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

export default async function HomePage() {
  const t = await getTranslations("about");
  const blurDataUrls = await getBlurDataUrls([...PROJECT_IMAGE_URLS]);
  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-slate-900" role="main">
      <Hero />
      <Section spacing="lg">
        <Container maxWidth="lg" className="space-y-12">
          <div id="about" className="scroll-mt-24">
            <Heading as="h2" size="md" className="mb-4">
              {t("title")}
            </Heading>
            <p className="text-slate-600 dark:text-slate-400">{t("content")}</p>
          </div>
        </Container>
      </Section>

      <Projects blurDataUrls={blurDataUrls} />

      <TechStack />

      <Services />

      <CodeShowcase />

      <Testimonials />

      <Contact />
    </main>
  );
}
