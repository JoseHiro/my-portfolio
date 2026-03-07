"use client";

export function DemoSmallBusiness() {
  const services = [
    { title: "Installation & Repair", desc: "Fast, licensed, and insured." },
    { title: "Maintenance Plans", desc: "Keep your systems running smoothly." },
    { title: "24/7 Emergency", desc: "We're here when you need us." },
  ];

  return (
    <main className="bg-white dark:bg-slate-900">
      {/* Hero - professional, trust */}
      <section className="bg-blue-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Acme Home Services
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            Licensed, insured, and trusted by thousands of homeowners.
          </p>
          <button
            type="button"
            className="mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50"
          >
            Get a Free Quote
          </button>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-slate-200 px-6 py-16 dark:border-slate-800">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Services</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials + Contact */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What Customers Say</h2>
          <blockquote className="mt-6 text-slate-600 dark:text-slate-400">
            &ldquo;Professional, on time, and fair pricing. We recommend them to everyone.&rdquo;
          </blockquote>
          <p className="mt-2 text-sm font-medium text-slate-900 dark:text-white">— Sarah M.</p>
          <button
            type="button"
            className="mt-10 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Contact / Request Quote
          </button>
        </div>
      </section>
    </main>
  );
}
