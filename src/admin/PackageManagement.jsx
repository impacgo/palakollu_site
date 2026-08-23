import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPackages, createPackage, deletePackage } from "../lib/contentStore";
import { AdminPageHeader, PrototypeBanner, AdminCard } from "./AdminUI";

export default function PackageManagement() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState(getPackages);

  function handleCreate() {
    const pkg = createPackage();
    navigate(`/admin/packages/${pkg.id}`);
  }

  function handleDelete(id, title) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    deletePackage(id);
    setPackages(getPackages());
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Content"
        title="Package Management"
        description="Every journey currently live on the site."
        actions={
          <button
            type="button"
            onClick={handleCreate}
            className="rounded-sm bg-terracotta px-5 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-soil"
          >
            + New Package
          </button>
        }
      />
      <PrototypeBanner />

      <AdminCard className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-[13.5px]">
          <thead>
            <tr className="border-b border-soil/10 text-left">
              <th className="px-5 py-3 font-sans text-[11px] uppercase tracking-widest-3 text-soil/60">Journey</th>
              <th className="px-5 py-3 font-sans text-[11px] uppercase tracking-widest-3 text-soil/60">Duration</th>
              <th className="px-5 py-3 font-sans text-[11px] uppercase tracking-widest-3 text-soil/60">Price</th>
              <th className="px-5 py-3 font-sans text-[11px] uppercase tracking-widest-3 text-soil/60">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p.id} className="border-b border-soil/5">
                <td className="px-5 py-4 font-display text-[16px] text-soil">{p.title}</td>
                <td className="px-5 py-4 text-soil/70">{p.duration}</td>
                <td className="px-5 py-4 text-soil/70">₹{Number(p.price || 0).toLocaleString("en-IN")}</td>
                <td className="px-5 py-4">
                  {p.featured ? (
                    <span className="rounded-full bg-terracotta/15 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-widest-3 text-terracotta">
                      Signature
                    </span>
                  ) : (
                    <span className="rounded-full bg-soil/10 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-widest-3 text-soil/60">
                      Published
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      to={`/admin/packages/${p.id}`}
                      className="font-sans text-[11.5px] font-semibold uppercase tracking-widest-3 text-terracotta"
                    >
                      Edit →
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id, p.title)}
                      className="font-sans text-[11.5px] font-semibold uppercase tracking-widest-3 text-soil/40 hover:text-terracotta"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-soil/50">
                  No packages yet — create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminCard>
    </>
  );
}
