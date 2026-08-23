import { useState } from "react";
import { getEnquiries, updateEnquiryStatus, removeEnquiry } from "../lib/enquiryStore";
import { AdminPageHeader, PrototypeBanner, AdminCard } from "./AdminUI";

const STATUSES = ["new", "contacted", "closed"];

export default function Enquiries() {
  const [list, setList] = useState(getEnquiries);

  function setStatus(id, status) {
    setList(updateEnquiryStatus(id, status));
  }

  function handleRemove(id) {
    setList(removeEnquiry(id));
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Trip Requests"
        title="Enquiries"
        description="Submissions from the Plan Your Trail form. Includes a few sample entries so this view isn't empty on first use."
      />
      <PrototypeBanner>
        Stored in this browser's localStorage — clearing site data will reset the list.
      </PrototypeBanner>

      <div className="flex flex-col gap-4">
        {list.length === 0 && (
          <AdminCard className="p-8 text-center text-[13.5px] text-soil/60">No enquiries yet.</AdminCard>
        )}

        {list.map((e) => (
          <AdminCard key={e.id} className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg text-soil">{e.name || "Unnamed enquiry"}</h3>
                <p className="mt-1 text-[12.5px] uppercase tracking-widest-3 text-soil/45">{e.reference}</p>
              </div>
              <div className="flex items-center gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(e.id, s)}
                    className={`rounded-full px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-widest-3 transition-colors ${
                      e.status === s
                        ? "bg-terracotta text-husk"
                        : "border border-soil/15 text-soil/60 hover:border-terracotta/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 text-[13.5px] text-soil/75 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <span className="block text-[10.5px] uppercase tracking-widest-3 text-soil/45">Phone</span>
                {e.phone || "—"}
              </div>
              <div>
                <span className="block text-[10.5px] uppercase tracking-widest-3 text-soil/45">Email</span>
                {e.email || "—"}
              </div>
              <div>
                <span className="block text-[10.5px] uppercase tracking-widest-3 text-soil/45">Dates</span>
                {e.dates || "Flexible"}
              </div>
              <div>
                <span className="block text-[10.5px] uppercase tracking-widest-3 text-soil/45">Travellers</span>
                {e.travellers || "—"}
              </div>
            </div>

            {e.pkg && (
              <p className="mt-3 text-[13px] text-soil/70">
                <span className="text-[10.5px] uppercase tracking-widest-3 text-soil/45">Package — </span>
                {e.pkg}
              </p>
            )}
            {e.notes && <p className="mt-2 text-[13px] italic text-soil/60">"{e.notes}"</p>}

            <div className="mt-4 flex items-center justify-between border-t border-dashed border-soil/15 pt-3">
              <span className="text-[11.5px] text-soil/40">
                {new Date(e.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </span>
              <button
                type="button"
                onClick={() => handleRemove(e.id)}
                className="p-2 text-[11.5px] font-semibold uppercase tracking-widest-3 text-terracotta"
              >
                Remove
              </button>
            </div>
          </AdminCard>
        ))}
      </div>
    </>
  );
}
