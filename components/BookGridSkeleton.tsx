export function BookGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:px-8 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-white p-2">
          <div className="aspect-[2/3] w-full rounded-xl bg-cream" />
          <div className="mt-2 h-4 w-3/4 rounded bg-cream" />
          <div className="mt-1 h-3 w-1/2 rounded bg-cream" />
        </div>
      ))}
    </div>
  );
}
