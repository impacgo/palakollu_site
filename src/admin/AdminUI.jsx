export function AdminPageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="mb-10 flex flex-wrap items-start justify-between gap-6">
      <div>
        {eyebrow && (
          <span className="font-sans text-[11px] font-medium uppercase tracking-widest-3 text-terracotta">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-1.5 font-display text-[clamp(24px,3.2vw,32px)] text-soil">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-soil/65">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
    </div>
  );
}

export function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-sm border border-soil/10 bg-white/60 p-5">
      <span className="font-display text-[30px] leading-none text-terracotta">{value}</span>
      <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-widest-3 text-soil/70">{label}</p>
      {hint && <p className="mt-1 text-[12px] text-soil/50">{hint}</p>}
    </div>
  );
}

export function PrototypeBanner({ children }) {
  return (
    <div className="mb-8 rounded-sm border border-terracotta/30 bg-terracotta/8 px-5 py-3 text-[12.5px] leading-relaxed text-soil/75">
      <span className="font-sans font-semibold uppercase tracking-widest-3 text-terracotta">Prototype</span>{" "}
      {children ||
        "This admin runs entirely in your browser (demo passcode, localStorage) — there is no backend yet. Edits here are not saved to the live site."}
    </div>
  );
}

export function AdminCard({ className = "", children }) {
  return <div className={`rounded-sm border border-soil/10 bg-white/60 ${className}`}>{children}</div>;
}
