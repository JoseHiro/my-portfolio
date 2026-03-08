import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        <header className="pt-20 pb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
            Selected work
          </p>
          <h1 className="text-6xl md:text-8xl font-bold text-black dark:text-white">
            Projects
          </h1>
        </header>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {PROJECTS.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group flex items-start gap-6 py-10 hover:opacity-60 transition-opacity duration-200"
            >
              <span className="text-sm font-mono text-gray-300 dark:text-gray-600 pt-1.5 w-7 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-1 flex items-center gap-3">
                      {project.title}
                      {project.wip && (
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                          In progress
                        </span>
                      )}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                      {project.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500 shrink-0 pt-1">
                    {project.year}
                  </span>
                </div>
              </div>

              <span className="text-gray-300 dark:text-gray-600 group-hover:translate-x-1.5 transition-transform duration-200 pt-1.5 text-lg">
                →
              </span>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
