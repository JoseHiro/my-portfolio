"use client";

export function DemoPortfolioAgency() {
  return (
    <main className="bg-slate-900 text-white">
      {/* Hero - dark, dramatic, large type */}
      <section className="relative min-h-[70vh] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6 text-sm uppercase tracking-[0.2em] text-slate-400">
            Creative agency
          </p>
          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
            We design
            <br />
            <span className="text-blue-400">digital experiences</span>
          </h1>
          <p className="mt-10 max-w-xl text-lg text-slate-400">
            Brand, product, and motion. We help companies stand out and connect with their audience.
          </p>
          <button
            type="button"
            className="mt-10 inline-flex items-center gap-2 border-b-2 border-blue-400 pb-1 font-semibold hover:border-blue-300"
          >
            View our work
          </button>
        </div>
      </section>

      {/* Project showcase */}
      <section className="border-t border-slate-800 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-sm uppercase tracking-widest text-slate-500">Selected work</h2>
          <ul className="mt-12 space-y-16">
            {[
              { title: "Brand identity — TechCorp", tag: "Branding" },
              { title: "E-commerce redesign — StoreCo", tag: "Digital product" },
              { title: "Campaign — Fashion Week", tag: "Motion" },
            ].map((p) => (
              <li key={p.title} className="group">
                <div className="aspect-video overflow-hidden rounded-lg bg-slate-800">
                  <img
                    src="https://picsum.photos/seed/agency1/800/450"
                    alt=""
                    className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className="text-2xl font-semibold">{p.title}</h3>
                  <span className="text-sm text-slate-500">{p.tag}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Let&apos;s create together.</h2>
          <p className="mt-4 text-slate-400">Start a project or say hello.</p>
          <button
            type="button"
            className="mt-8 rounded-full bg-white px-8 py-4 font-semibold text-slate-900 hover:bg-slate-100"
          >
            Get in touch
          </button>
        </div>
      </section>
    </main>
  );
}
