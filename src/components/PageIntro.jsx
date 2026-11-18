const PageIntro = ({
  icon: Icon,
  eyebrow,
  title,
  highlight,
  description,
}) => (
  <header className="relative isolate overflow-hidden px-5 pb-10 pt-14 sm:px-8 sm:pb-12 sm:pt-16 lg:pt-20">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-24 -top-28 -z-10 h-72 w-72 rounded-full bg-brand-purple-100/70 blur-3xl"
    />
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-24 -top-16 -z-10 h-64 w-64 rounded-full bg-brand-gold-100/70 blur-3xl"
    />

    <div className="mx-auto max-w-4xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-brand-purple-200 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-purple-800 shadow-sm sm:px-5 sm:text-sm">
        {Icon && <Icon size={16} aria-hidden="true" />}
        {eyebrow}
      </div>

      <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
        {title}
        <span className="mt-1 block font-serif font-medium italic text-brand-purple-700">
          {highlight}
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
        {description}
      </p>
    </div>
  </header>
);

export default PageIntro;
