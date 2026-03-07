"use client";

export function DemoRestaurant() {
  const menu = [
    { name: "Seasonal soup", price: "$8" },
    { name: "House salad", price: "$10" },
    { name: "Grilled salmon", price: "$24" },
    { name: "Pasta of the day", price: "$18" },
  ];

  return (
    <main className="bg-amber-50 dark:bg-slate-900">
      {/* Hero - warm, inviting */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Since 2010
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            The Local Table
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Fresh ingredients, seasonal menus, and a warm welcome.
          </p>
          <button
            type="button"
            className="mt-8 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700"
          >
            Reserve a table
          </button>
        </div>
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl shadow-xl">
          <img
            src="https://picsum.photos/seed/restaurant1/800/400"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Menu */}
      <section className="border-t border-amber-200 bg-white px-6 py-16 dark:border-slate-800 dark:bg-slate-800">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Menu</h2>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Lunch & dinner</p>
          <ul className="mt-8 space-y-6">
            {menu.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between border-b border-slate-100 py-4 dark:border-slate-700"
              >
                <span className="font-medium text-slate-900 dark:text-white">{item.name}</span>
                <span className="text-slate-600 dark:text-slate-400">{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Location */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Find us</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            123 Main Street · Open daily 11am – 10pm
          </p>
          <div className="mt-6 aspect-video overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-700" />
        </div>
      </section>
    </main>
  );
}
