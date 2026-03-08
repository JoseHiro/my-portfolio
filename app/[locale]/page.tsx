import dynamic from "next/dynamic";
import { ScrollSequence } from "@/components/sections/ScrollSequence";
import { SectionSkeleton } from "@/components/ui/SectionSkeleton";

const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => ({ default: m.Testimonials })),
  { ssr: true }
);
const Contact = dynamic(
  () => import("@/components/sections/Contact").then((m) => ({ default: m.Contact })),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

export default async function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-white dark:bg-slate-900" role="main">
      <ScrollSequence />
      <Testimonials />
      <Contact />
    </main>
  );
}
