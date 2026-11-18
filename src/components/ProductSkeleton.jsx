const ProductSkeleton = () => (
  <div aria-hidden="true" className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="animate-pulse">
      <div className="relative h-[260px] bg-slate-100 sm:h-[300px] md:h-[340px]">
        <div className="absolute left-5 top-5 h-7 w-24 rounded-full bg-slate-200" />
        <div className="absolute right-5 top-5 h-11 w-11 rounded-full bg-white" />
      </div>
      <div className="space-y-4 p-5 sm:p-6">
        <div className="h-3 w-40 rounded bg-slate-200" />
        <div className="h-6 w-4/5 rounded bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-100" />
        <div className="h-4 w-5/6 rounded bg-slate-100" />
        <div className="h-4 w-2/3 rounded bg-slate-100" />
        <div className="pt-4">
          <div className="h-8 w-24 rounded bg-slate-200" />
          <div className="mt-5 h-12 rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  </div>
);

export default ProductSkeleton;
