"use client";

export function DemoRealEstate() {
  const listings = [
    { address: "123 Oak Avenue", price: "$450,000", beds: 3, baths: 2, seed: "re1" },
    { address: "456 Pine Street", price: "$520,000", beds: 4, baths: 3, seed: "re2" },
    { address: "789 Maple Drive", price: "$380,000", beds: 2, baths: 2, seed: "re3" },
  ];

  return (
    <main className="bg-slate-50 dark:bg-slate-900">
      {/* Hero - professional, trust-building */}
      <section className="bg-blue-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Find your next home
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            Search listings, compare properties, and connect with agents.
          </p>
          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap gap-3 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800">
            <input
              type="text"
              placeholder="City or ZIP"
              className="flex-1 rounded border border-slate-200 px-4 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white min-w-[120px]"
              aria-label="Location"
            />
            <select
              className="rounded border border-slate-200 px-4 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              aria-label="Bedrooms"
            >
              <option>Any beds</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
            </select>
            <button
              type="button"
              className="rounded bg-blue-600 px-6 py-2 font-semibold hover:bg-blue-500"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Featured listings</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <article
                key={l.address}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-700">
                  <img
                    src={`https://picsum.photos/seed/${l.seed}/400/300`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {l.address}
                  </p>
                  <p className="mt-1 text-blue-600 dark:text-blue-400">{l.price}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {l.beds} beds · {l.baths} baths
                  </p>
                  <button
                    type="button"
                    className="mt-4 w-full rounded-lg border border-slate-200 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700"
                  >
                    View details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="border-t border-slate-200 px-6 py-12 dark:border-slate-800">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Map view</h2>
          <div className="mt-4 aspect-video overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-700" />
        </div>
      </section>
    </main>
  );
}
