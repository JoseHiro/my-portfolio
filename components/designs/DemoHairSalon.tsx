"use client";

export function DemoHairSalon() {
  const services = [
    { name: "Cut & Style", price: "from $65" },
    { name: "Color & Highlights", price: "from $120" },
    { name: "Treatments", price: "from $45" },
  ];

  return (
    <main className="bg-rose-50/50 dark:bg-slate-900">
      {/* Hero - elegant, image-heavy */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/salon1/1200/600"
            alt=""
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/40" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-200">
            Salon Luxe
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Transform Your Look
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-rose-100">
            Expert stylists, premium products, and a relaxing experience.
          </p>
          <button
            type="button"
            className="mt-10 rounded-full bg-rose-500 px-8 py-4 font-semibold text-white hover:bg-rose-600"
          >
            Book Appointment
          </button>
        </div>
      </section>

      {/* Services & Pricing */}
      <section className="border-b border-slate-200 px-6 py-16 dark:border-slate-800">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white">
            Services & Pricing
          </h2>
          <ul className="mt-10 space-y-6">
            {services.map((s) => (
              <li
                key={s.name}
                className="flex items-center justify-between border-b border-slate-200 py-4 dark:border-slate-700"
              >
                <span className="font-medium text-slate-900 dark:text-white">{s.name}</span>
                <span className="text-slate-600 dark:text-slate-400">{s.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery + Booking */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Gallery</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-700"
              >
                <img
                  src={`https://picsum.photos/seed/salon${i}/400/400`}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button
              type="button"
              className="rounded-lg border-2 border-slate-900 px-6 py-3 font-semibold text-slate-900 hover:bg-slate-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
