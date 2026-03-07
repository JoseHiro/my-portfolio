"use client";

export function DemoMedical() {
  const services = [
    { name: "General Check-up", desc: "Comprehensive health assessment" },
    { name: "Preventive Care", desc: "Vaccinations and screenings" },
    { name: "Chronic Care", desc: "Ongoing condition management" },
  ];

  return (
    <main className="bg-slate-50 dark:bg-slate-900">
      {/* Hero - clean, calming */}
      <section className="bg-blue-600 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Wellness Clinic
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            Caring for you and your family. Book your appointment online.
          </p>
          <button
            type="button"
            className="mt-8 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-blue-50"
          >
            Book Appointment
          </button>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-slate-200 px-6 py-16 dark:border-slate-800">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Services</h2>
          <ul className="mt-8 space-y-6">
            {services.map((s) => (
              <li
                key={s.name}
                className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                  +
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{s.name}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team + Patient Info */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Our Team</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Experienced, caring professionals dedicated to your health.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
              <div className="h-24 w-24 rounded-full bg-slate-200 dark:bg-slate-600" />
              <p className="mt-3 font-medium text-slate-900 dark:text-white">Dr. Smith</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Primary Care</p>
            </div>
          </div>
          <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white">Patient Information</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              New patients: bring ID and insurance card. Forms available online.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
