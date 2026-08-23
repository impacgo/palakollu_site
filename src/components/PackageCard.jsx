import { Link } from "react-router-dom";
import PhotoSlot from "./PhotoSlot";
import { BoatIcon } from "./icons";

export default function PackageCard({ pkg }) {
  return (
    <Link
      to={`/packages/${pkg.id}`}
      className={`group flex h-full flex-col overflow-hidden rounded-sm border bg-soil-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_-20px_rgba(0,0,0,0.55)] ${
        pkg.featured
          ? "border-turmeric/40 hover:border-turmeric/70"
          : "border-turmeric/15 hover:border-turmeric/50"
      }`}
    >
      <div className="relative">
        <PhotoSlot Icon={BoatIcon} tone={pkg.tone} src={pkg.photo} aspect="aspect-[16/10]" alt={pkg.title} />
        <span className="absolute left-4 top-4 rounded-full bg-soil-deep/85 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-widest-3 text-husk backdrop-blur-sm">
          {pkg.duration}
        </span>
        {pkg.featured && (
          <span className="absolute right-4 top-4 rounded-full bg-terracotta/90 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-widest-3 text-husk backdrop-blur-sm">
            Signature
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-[24px] text-husk">{pkg.title}</h3>
        <p className="mt-1.5 text-[13.6px] text-husk-dim">{pkg.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {pkg.chips.map((c) => (
            <span
              key={c}
              className="rounded-full border border-turmeric/30 bg-turmeric/10 px-3 py-1 text-[11px] text-turmeric-soft"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-baseline justify-between border-t border-dashed border-husk/20 pt-4">
          <div>
            <span className="font-display text-[26px] text-turmeric-soft">
              ₹{pkg.price.toLocaleString("en-IN")}
            </span>
            <span className="ml-1.5 text-[12px] text-husk-dim">per person</span>
          </div>
          <span className="flex items-center gap-1.5 font-sans text-[11px] font-medium uppercase tracking-widest-3 text-husk transition-colors group-hover:text-turmeric">
            View Journey
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
