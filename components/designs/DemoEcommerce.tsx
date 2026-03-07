"use client";

export function DemoEcommerce() {
  const products = [
    { id: 1, name: "Classic Tee", price: "$32", seed: "ecom1" },
    { id: 2, name: "Minimal Bag", price: "$89", seed: "ecom2" },
    { id: 3, name: "Leather Watch", price: "$120", seed: "ecom3" },
    { id: 4, name: "Wireless Buds", price: "$79", seed: "ecom4" },
  ];

  return (
    <main>
      {/* Hero - bold, image-heavy */}
      <section className="bg-slate-100 px-6 py-16 dark:bg-slate-800 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                New collection
              </h1>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                Discover our latest arrivals. Curated for style and quality.
              </p>
              <button
                type="button"
                className="mt-6 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                Shop now
              </button>
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-700">
              <img
                src="https://picsum.photos/seed/ecomhero/600/600"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="border-t border-slate-200 px-6 py-16 dark:border-slate-800">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Products</h2>
            <select
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              aria-label="Sort"
            >
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <article
                key={p.id}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
                  <img
                    src={`https://picsum.photos/seed/${p.seed}/400/400`}
                    alt=""
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{p.name}</h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">{p.price}</p>
                  <button
                    type="button"
                    className="mt-3 w-full rounded-lg border border-slate-200 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
