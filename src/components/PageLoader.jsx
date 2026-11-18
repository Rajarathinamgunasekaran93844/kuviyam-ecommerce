const PageLoader = () => (
  <div
    className="fixed inset-0 z-[999] flex items-center justify-center bg-[#f8f6f0]"
    role="status"
    aria-live="polite"
  >
    <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-brand-purple-800" aria-hidden="true" />
      Loading Kuviyam Publications
    </div>
  </div>
);

export default PageLoader;
