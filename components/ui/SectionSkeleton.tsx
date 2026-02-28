export function SectionSkeleton() {
  return (
    <div
      className="animate-pulse py-24 px-6 md:px-12"
      aria-hidden
    >
      <div className="max-w-7xl mx-auto">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-4 mx-auto" />
        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4 mx-auto" />
        <div className="h-6 w-96 max-w-full bg-gray-200 dark:bg-gray-700 rounded mb-12 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-gray-200 dark:bg-gray-700/50"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
