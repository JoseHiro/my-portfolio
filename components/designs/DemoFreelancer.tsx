"use client";

export function DemoFreelancer() {
  return (
    <main className="bg-white dark:bg-slate-900">
      {/* Hero - minimal, black/white + accent */}
      <section className="border-b border-slate-200 px-6 py-20 dark:border-slate-800 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Jane Doe
          </h1>
          <p className="mt-3 text-xl text-blue-600 dark:text-blue-400">
            Web Developer & Designer
          </p>
          <p className="mt-6 text-slate-600 dark:text-slate-400">
            I build fast, beautiful websites and digital products that help you stand out.
          </p>
          <button
            type="button"
            className="mt-8 rounded-lg border-2 border-slate-900 bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800 dark:border-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            View My Work
          </button>
        </div>
      </section>

      {/* Project cards */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Selected Work</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {[
              { title: "E-commerce Redesign", client: "Retail Co" },
              { title: "SaaS Dashboard", client: "TechStart" },
            ].map((p) => (
              <article
                key={p.title}
                className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
              >
                <div className="aspect-video bg-slate-100 dark:bg-slate-800">
                  <img
                    src="https://picsum.photos/seed/freelancer1/600/340"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{p.client}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services + Contact */}
      <section className="border-t border-slate-200 bg-slate-50 px-6 py-16 dark:border-slate-800 dark:bg-slate-800/50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Services</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Web design, development, and consulting. Let&apos;s work together.
          </p>
          <button
            type="button"
            className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  );
}
