"use client";

export function DemoSaaS() {
  return (
    <main>
      {/* Hero - minimal, blue/purple gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-blue-200">
            SaaS Product
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Ship faster with less code
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            The modern platform for building and launching your product. No setup, no DevOps.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg hover:bg-blue-50"
            >
              Start free trial
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/40 px-6 py-3 font-semibold hover:bg-white/10"
            >
              Watch demo
            </button>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="border-b border-slate-200 bg-white px-6 py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            Everything you need
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-slate-600 dark:text-slate-400">
            One platform for your entire workflow.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Deploy in seconds", desc: "Push to git, we handle the rest." },
              { title: "Scale automatically", desc: "From zero to millions of users." },
              { title: "Pay as you grow", desc: "No fixed costs. Usage-based pricing." },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            Simple pricing
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="rounded-2xl border-2 border-blue-500 bg-white p-8 shadow-xl dark:bg-slate-800">
              <p className="text-4xl font-bold text-slate-900 dark:text-white">
                $29<span className="text-lg font-normal text-slate-500">/mo</span>
              </p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Pro plan — for teams</p>
              <button
                type="button"
                className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
