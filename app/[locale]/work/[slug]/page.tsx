import { notFound } from "next/navigation";
import { PROJECTS, getProject } from "@/lib/projects";
import { EditorialLayout, SplitLayout, WipLayout } from "@/components/work/ProjectLayouts";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  if (project.style === "editorial") return <EditorialLayout project={project} />;
  if (project.style === "split")    return <SplitLayout project={project} />;
  return <WipLayout project={project} />;
}
