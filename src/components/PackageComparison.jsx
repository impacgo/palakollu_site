import Reveal from "./Reveal";
import { getPackages } from "../lib/contentStore";

const FEATURES = [
  { key: "temples", label: "Temples", test: (pkg) => pkg.chips.some((c) => /temple/i.test(c)) },
  { key: "backwaters", label: "Backwaters", test: (pkg) => pkg.chips.some((c) => /backwater/i.test(c)) },
  { key: "beach", label: "Beach", test: (pkg) => pkg.chips.some((c) => /beach/i.test(c)) },
  { key: "houseboat", label: "Houseboat", test: (pkg) => pkg.chips.some((c) => /houseboat/i.test(c)) },
  { key: "farm", label: "Farm stay", test: (pkg) => pkg.chips.some((c) => /farm/i.test(c)) },
];

export default function PackageComparison() {
  const PACKAGES = getPackages();

  return (
    <Reveal delay={0.15} className="mt-16 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-[13px]">
        <thead>
          <tr>
            <th className="border-b border-turmeric/20 py-3 text-left font-sans text-[11px] font-semibold uppercase tracking-widest-3 text-husk-dim">
              Compare
            </th>
            {PACKAGES.map((pkg) => (
              <th
                key={pkg.id}
                className="border-b border-turmeric/20 px-4 py-3 text-left font-display text-[16px] font-normal text-husk"
              >
                {pkg.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-3 text-husk-dim">Duration</td>
            {PACKAGES.map((pkg) => (
              <td key={pkg.id} className="px-4 py-3 text-husk">
                {pkg.duration}
              </td>
            ))}
          </tr>
          <tr>
            <td className="border-t border-husk/10 py-3 text-husk-dim">Price</td>
            {PACKAGES.map((pkg) => (
              <td key={pkg.id} className="border-t border-husk/10 px-4 py-3 text-turmeric-soft">
                ₹{pkg.price.toLocaleString("en-IN")}
              </td>
            ))}
          </tr>
          {FEATURES.map((f) => (
            <tr key={f.key}>
              <td className="border-t border-husk/10 py-3 text-husk-dim">{f.label}</td>
              {PACKAGES.map((pkg) => (
                <td key={pkg.id} className="border-t border-husk/10 px-4 py-3 text-center">
                  {f.test(pkg) ? (
                    <span className="text-turmeric">✓</span>
                  ) : (
                    <span className="text-husk-dim/40">—</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}
