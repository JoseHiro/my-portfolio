"use client";

export function DemoBlog() {
  const posts = [
    { title: "Getting started with design systems", category: "Design", seed: "blog1" },
    { title: "The future of web development", category: "Tech", seed: "blog2" },
    { title: "Writing for the web", category: "Writing", seed: "blog3" },
  ];

  return (
    <main className="bg-white dark:bg-slate-900">
      {/* Header */}
      <section className="border-b border-slate-200 px-6 py-12 dark:border-slate-800">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
            The Journal
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Thoughts on design, code, and building products.
          </p>
          <div className="mt-6 flex justify-center gap-4 text-sm">
            <a href="#all" className="font-medium text-slate-900 dark:text-white">
              All
            </a>
            <a href="#design" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              Design
            </a>
            <a href="#tech" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              Tech
            </a>
          </div>
        </div>
      </section>

      {/* Article grid - readable, minimal */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <ul className="space-y-12">
            {posts.map((p) => (
              <li key={p.title} className="group">
                <article>
                  <div className="overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    <img
                      src={`https://picsum.photos/seed/${p.seed}/600/320`}
                      alt=""
                      className="h-48 w-full object-cover transition-transform group-hover:scale-[1.02] md:h-56"
                    />
                  </div>
                  <p className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                    {p.category}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-bold text-slate-900 dark:text-white">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">
                    A short excerpt from the article goes here. Clean typography and plenty of
                    whitespace for comfortable reading.
                  </p>
                  <span className="mt-3 inline-block text-sm font-medium text-slate-900 dark:text-white">
                    Read more →
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
