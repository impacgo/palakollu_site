import { Link } from "react-router-dom";
import { getPlaces, getPackages } from "../lib/contentStore";
import { getEnquiries } from "../lib/enquiryStore";
import { AdminPageHeader, StatCard, PrototypeBanner, AdminCard } from "./AdminUI";

export default function Dashboard() {
  const places = getPlaces();
  const packages = getPackages();
  const enquiries = getEnquiries();
  const pending = enquiries.filter((e) => e.status === "new").length;
  const popular = packages.find((p) => p.featured) || packages[0];
  const recent = enquiries.slice(0, 5);

  return (
    <>
      <AdminPageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="A snapshot of packages, places and enquiries."
      />
      <PrototypeBanner />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Packages" value={packages.length} />
        <StatCard label="Places" value={places.length} />
        <StatCard label="Pending Enquiries" value={pending} hint={`${enquiries.length} total`} />
        <StatCard
          label="Popular Trail"
          value={popular ? popular.duration.split(" / ")[1] : "—"}
          hint={popular?.title || "No packages yet"}
        />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <AdminCard className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-soil">Recent enquiries</h2>
            <Link to="/admin/enquiries" className="font-sans text-[11px] uppercase tracking-widest-3 text-terracotta">
              View all →
            </Link>
          </div>
          <div className="mt-5 divide-y divide-soil/10">
            {recent.length === 0 && <p className="py-4 text-[13.5px] text-soil/60">No enquiries yet.</p>}
            {recent.map((e) => (
              <div key={e.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                <div>
                  <p className="text-[14px] font-medium text-soil">{e.name}</p>
                  <p className="text-[12.5px] text-soil/55">{e.pkg || "No package selected"} · {e.dates || "Dates flexible"}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-widest-3 ${
                    e.status === "new"
                      ? "bg-terracotta/15 text-terracotta"
                      : e.status === "contacted"
                        ? "bg-paddy-deep/15 text-paddy-deep"
                        : "bg-soil/10 text-soil/60"
                  }`}
                >
                  {e.status}
                </span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-soil">Content status</h2>
            <Link to="/admin/packages" className="font-sans text-[11px] uppercase tracking-widest-3 text-terracotta">
              Manage →
            </Link>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            {packages.map((p) => (
              <Link
                key={p.id}
                to={`/admin/packages/${p.id}`}
                className="flex items-center justify-between rounded-sm border border-soil/10 px-3 py-2.5 text-[13px] text-soil transition-colors hover:border-terracotta/40"
              >
                <span>{p.title}</span>
                <span className="text-[11px] uppercase tracking-widest-3 text-soil/50">Edit →</span>
              </Link>
            ))}
          </div>
        </AdminCard>
      </div>
    </>
  );
}
