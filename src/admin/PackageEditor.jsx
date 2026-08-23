import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getPackages, getPlaces, savePackage, deletePackage } from "../lib/contentStore";
import { AdminPageHeader, PrototypeBanner, AdminCard } from "./AdminUI";
import PhotoSlot from "../components/PhotoSlot";

const fieldClass =
  "mt-2 w-full rounded-sm border border-soil/15 bg-white px-4 py-2.5 text-[13.5px] text-soil placeholder:text-soil/40 focus:border-terracotta focus:outline-none";
const labelClass = "font-sans text-[11px] font-semibold uppercase tracking-widest-3 text-soil/60";

function Section({ title, children }) {
  return (
    <AdminCard className="p-6">
      <h2 className="font-display text-lg text-soil">{title}</h2>
      <div className="mt-5 flex flex-col gap-4">{children}</div>
    </AdminCard>
  );
}

function toForm(pkg) {
  return {
    title: pkg.title,
    duration: pkg.duration,
    price: pkg.price,
    tagline: pkg.tagline,
    chips: (pkg.chips || []).join(", "),
    featured: !!pkg.featured,
    hotelName: pkg.hotel?.name || "",
    hotelType: pkg.hotel?.type || "",
    hotelDesc: pkg.hotel?.desc || "",
    hotelAmenities: (pkg.hotel?.amenities || []).join(", "),
    priceLines: (pkg.priceLines || []).map(([label, amt]) => ({ label, amt })),
    itinerary: (pkg.itinerary || []).map(([title, desc]) => ({ title, desc })),
    placeIds: pkg.placeIds || [],
    waypoints: (pkg.waypoints || []).map((w) => ({ ...w })),
  };
}

export default function PackageEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const base = getPackages().find((p) => p.id === id);
  const places = getPlaces();
  const [form, setForm] = useState(() => (base ? toForm(base) : null));
  const [saved, setSaved] = useState(false);

  if (!base) return <Navigate to="/admin/packages" replace />;

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  }

  function updateRow(listKey, index, key, value) {
    setForm((f) => {
      const list = [...f[listKey]];
      list[index] = { ...list[index], [key]: value };
      return { ...f, [listKey]: list };
    });
    setSaved(false);
  }

  function addRow(listKey, blank) {
    setForm((f) => ({ ...f, [listKey]: [...f[listKey], blank] }));
  }

  function removeRow(listKey, index) {
    setForm((f) => ({ ...f, [listKey]: f[listKey].filter((_, i) => i !== index) }));
  }

  function moveRow(listKey, index, dir) {
    setForm((f) => {
      const list = [...f[listKey]];
      const target = index + dir;
      if (target < 0 || target >= list.length) return f;
      [list[index], list[target]] = [list[target], list[index]];
      return { ...f, [listKey]: list };
    });
  }

  function togglePlace(placeId) {
    setForm((f) => ({
      ...f,
      placeIds: f.placeIds.includes(placeId)
        ? f.placeIds.filter((p) => p !== placeId)
        : [...f.placeIds, placeId],
    }));
  }

  function handleSave(e) {
    e.preventDefault();
    savePackage({
      ...base,
      title: form.title,
      duration: form.duration,
      price: Number(form.price) || 0,
      tagline: form.tagline,
      chips: form.chips.split(",").map((c) => c.trim()).filter(Boolean),
      featured: form.featured,
      hotel: {
        name: form.hotelName,
        type: form.hotelType,
        desc: form.hotelDesc,
        amenities: form.hotelAmenities.split(",").map((a) => a.trim()).filter(Boolean),
      },
      priceLines: form.priceLines.map((r) => [r.label, r.amt]),
      itinerary: form.itinerary.map((r) => [r.title, r.desc]),
      placeIds: form.placeIds,
      waypoints: form.waypoints,
    });
    setSaved(true);
  }

  function handleDelete() {
    if (!window.confirm(`Delete "${base.title}"? This can't be undone.`)) return;
    deletePackage(id);
    navigate("/admin/packages");
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Package Editor"
        title={base.title}
        actions={
          <Link
            to="/admin/packages"
            className="font-sans text-[11px] uppercase tracking-widest-3 text-soil/60 hover:text-terracotta"
          >
            ← Back to Packages
          </Link>
        }
      />
      <PrototypeBanner>Saves live to the site immediately — this browser only, no server.</PrototypeBanner>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <Section title="Basic Information">
          <label className={labelClass}>
            Title
            <input className={fieldClass} value={form.title} onChange={(e) => set("title", e.target.value)} />
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Duration
              <input className={fieldClass} value={form.duration} onChange={(e) => set("duration", e.target.value)} />
            </label>
            <label className={labelClass}>
              Price (₹ / person)
              <input
                type="number"
                className={fieldClass}
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
              />
            </label>
          </div>
          <label className={labelClass}>
            Tagline
            <textarea
              className={`${fieldClass} min-h-[70px] resize-none`}
              value={form.tagline}
              onChange={(e) => set("tagline", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Highlight chips (comma separated)
            <input className={fieldClass} value={form.chips} onChange={(e) => set("chips", e.target.value)} />
          </label>
        </Section>

        <Section title="Hero Media">
          <div className="flex items-center gap-4">
            <div className="h-24 w-36 overflow-hidden rounded-sm border border-soil/15">
              <PhotoSlot src={base.photo} tone={base.tone} aspect="aspect-auto h-full" className="h-full" alt={base.title} />
            </div>
            <p className="text-[13px] text-soil/60">
              Image uploads need a backend/storage bucket — not part of this frontend prototype.
            </p>
          </div>
        </Section>

        <Section title="Accommodation">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Property name
              <input className={fieldClass} value={form.hotelName} onChange={(e) => set("hotelName", e.target.value)} />
            </label>
            <label className={labelClass}>
              Type
              <input className={fieldClass} value={form.hotelType} onChange={(e) => set("hotelType", e.target.value)} />
            </label>
          </div>
          <label className={labelClass}>
            Description
            <textarea
              className={`${fieldClass} min-h-[70px] resize-none`}
              value={form.hotelDesc}
              onChange={(e) => set("hotelDesc", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Amenities (comma separated)
            <input
              className={fieldClass}
              value={form.hotelAmenities}
              onChange={(e) => set("hotelAmenities", e.target.value)}
            />
          </label>
          <p className="text-[12px] italic text-soil/50">
            Accommodation is placeholder inventory until real partner properties are confirmed —
            the public page always shows a "subject to confirmation" note beneath it.
          </p>
        </Section>

        <Section title="Pricing">
          {form.priceLines.map((row, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                className={fieldClass}
                placeholder="Line item"
                value={row.label}
                onChange={(e) => updateRow("priceLines", i, "label", e.target.value)}
              />
              <input
                className={`${fieldClass} max-w-[140px]`}
                placeholder="₹ amount"
                value={row.amt}
                onChange={(e) => updateRow("priceLines", i, "amt", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeRow("priceLines", i)}
                className="shrink-0 text-[12px] text-terracotta"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addRow("priceLines", { label: "", amt: "" })}
            className="w-fit font-sans text-[11.5px] font-semibold uppercase tracking-widest-3 text-terracotta"
          >
            + Add line item
          </button>
        </Section>

        <Section title="Itinerary (Day by day)">
          {form.itinerary.map((row, i) => (
            <div key={i} className="rounded-sm border border-soil/10 p-4">
              <div className="flex items-center justify-between">
                <span className={labelClass}>Day {i + 1}</span>
                <button
                  type="button"
                  onClick={() => removeRow("itinerary", i)}
                  className="text-[12px] text-terracotta"
                >
                  Remove
                </button>
              </div>
              <input
                className={fieldClass}
                placeholder="Day title"
                value={row.title}
                onChange={(e) => updateRow("itinerary", i, "title", e.target.value)}
              />
              <textarea
                className={`${fieldClass} min-h-[60px] resize-none`}
                placeholder="Day description"
                value={row.desc}
                onChange={(e) => updateRow("itinerary", i, "desc", e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addRow("itinerary", { title: "", desc: "" })}
            className="w-fit font-sans text-[11.5px] font-semibold uppercase tracking-widest-3 text-terracotta"
          >
            + Add day
          </button>
        </Section>

        <Section title="Route builder (animated cart sequence)">
          <p className="text-[13px] text-soil/60">
            These stops drive the cinematic animated route on the package page — order matters.
            Optionally link each stop to a place for its photo and a "View place" link.
          </p>
          {form.waypoints.map((wp, i) => (
            <div key={i} className="rounded-sm border border-soil/10 p-4">
              <div className="flex items-center justify-between">
                <span className={labelClass}>Stop {i + 1}</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => moveRow("waypoints", i, -1)} disabled={i === 0} className="text-[12px] text-soil/60 disabled:opacity-30">
                    ↑
                  </button>
                  <button type="button" onClick={() => moveRow("waypoints", i, 1)} disabled={i === form.waypoints.length - 1} className="text-[12px] text-soil/60 disabled:opacity-30">
                    ↓
                  </button>
                  <button type="button" onClick={() => removeRow("waypoints", i)} className="text-[12px] text-terracotta">
                    Remove
                  </button>
                </div>
              </div>
              <input
                className={fieldClass}
                placeholder="Stop title"
                value={wp.title}
                onChange={(e) => updateRow("waypoints", i, "title", e.target.value)}
              />
              <textarea
                className={`${fieldClass} min-h-[50px] resize-none`}
                placeholder="Short line shown as the cart passes this stop"
                value={wp.desc}
                onChange={(e) => updateRow("waypoints", i, "desc", e.target.value)}
              />
              <select
                className={fieldClass}
                value={wp.placeId || ""}
                onChange={(e) => updateRow("waypoints", i, "placeId", e.target.value)}
              >
                <option value="">No linked place</option>
                {places.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addRow("waypoints", { title: "", desc: "", placeId: "" })}
            className="w-fit font-sans text-[11.5px] font-semibold uppercase tracking-widest-3 text-terracotta"
          >
            + Add stop
          </button>
        </Section>

        <Section title="Included places">
          <p className="text-[13px] text-soil/60">Shown as "Places on this trail" tags on the package page.</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {places.map((p) => (
              <label key={p.id} className="flex items-center gap-2.5 text-[13.5px] text-soil">
                <input
                  type="checkbox"
                  checked={form.placeIds.includes(p.id)}
                  onChange={() => togglePlace(p.id)}
                  className="h-4 w-4 accent-terracotta"
                />
                {p.name}
              </label>
            ))}
          </div>
        </Section>

        <Section title="Publish">
          <label className="flex items-center gap-2.5 text-[13.5px] text-soil">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="h-4 w-4 accent-terracotta"
            />
            Mark as Signature Journey
          </label>
        </Section>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="rounded-sm bg-terracotta px-6 py-3 font-sans text-[13px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-soil"
          >
            Save Changes
          </button>
          {saved && <span className="text-[13px] text-paddy-deep">Saved — now live on the public site.</span>}
          <button
            type="button"
            onClick={handleDelete}
            className="ml-auto font-sans text-[11.5px] font-semibold uppercase tracking-widest-3 text-terracotta/70 hover:text-terracotta"
          >
            Delete this package
          </button>
        </div>
      </form>
    </>
  );
}
