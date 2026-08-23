import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPlaces, createPlace, deletePlace } from "../lib/contentStore";
import { AdminPageHeader, PrototypeBanner, AdminCard } from "./AdminUI";

export default function PlaceManagement() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState(getPlaces);

  function handleCreate() {
    const place = createPlace();
    navigate(`/admin/places/${place.id}`);
  }

  function handleDelete(id, name) {
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
    deletePlace(id);
    setPlaces(getPlaces());
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Content"
        title="Place Management"
        description={`${places.length} nearby places currently listed on the site.`}
        actions={
          <button
            type="button"
            onClick={handleCreate}
            className="rounded-sm bg-terracotta px-5 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-soil"
          >
            + New Place
          </button>
        }
      />
      <PrototypeBanner />

      <AdminCard className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-[13.5px]">
          <thead>
            <tr className="border-b border-soil/10 text-left">
              <th className="px-5 py-3 font-sans text-[11px] uppercase tracking-widest-3 text-soil/60">Place</th>
              <th className="px-5 py-3 font-sans text-[11px] uppercase tracking-widest-3 text-soil/60">Distance</th>
              <th className="px-5 py-3 font-sans text-[11px] uppercase tracking-widest-3 text-soil/60">Best time</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {places.map((p) => (
              <tr key={p.id} className="border-b border-soil/5">
                <td className="px-5 py-4 font-display text-[16px] text-soil">{p.name}</td>
                <td className="px-5 py-4 text-soil/70">{p.dist}</td>
                <td className="px-5 py-4 text-soil/70">{p.bestTime}</td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      to={`/admin/places/${p.id}`}
                      className="font-sans text-[11.5px] font-semibold uppercase tracking-widest-3 text-terracotta"
                    >
                      Edit →
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id, p.name)}
                      className="font-sans text-[11.5px] font-semibold uppercase tracking-widest-3 text-soil/40 hover:text-terracotta"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {places.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-soil/50">
                  No places yet — create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminCard>
    </>
  );
}
