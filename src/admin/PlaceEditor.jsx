import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getPlaces, savePlace, deletePlace } from "../lib/contentStore";
import { AdminPageHeader, PrototypeBanner, AdminCard } from "./AdminUI";
import PhotoSlot from "../components/PhotoSlot";
import { PLACE_ICONS } from "../components/icons";

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

function toForm(place) {
  return {
    name: place.name,
    dist: place.dist,
    bestTime: place.bestTime,
    desc: place.desc,
    story: place.story,
    highlights: (place.highlights || []).join(", "),
    icon: place.icon || "temple",
    tone: place.tone || "soil",
  };
}

export default function PlaceEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const base = getPlaces().find((p) => p.id === id);
  const [form, setForm] = useState(() => (base ? toForm(base) : null));
  const [saved, setSaved] = useState(false);

  if (!base) return <Navigate to="/admin/places" replace />;

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  }

  function handleSave(e) {
    e.preventDefault();
    savePlace({
      ...base,
      name: form.name,
      dist: form.dist,
      bestTime: form.bestTime,
      desc: form.desc,
      story: form.story,
      highlights: form.highlights.split(",").map((h) => h.trim()).filter(Boolean),
      icon: form.icon,
      tone: form.tone,
    });
    setSaved(true);
  }

  function handleDelete() {
    if (!window.confirm(`Delete "${base.name}"? This can't be undone.`)) return;
    deletePlace(id);
    navigate("/admin/places");
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Place Editor"
        title={base.name}
        actions={
          <Link
            to="/admin/places"
            className="p-2 font-sans text-[11px] uppercase tracking-widest-3 text-soil/60 hover:text-terracotta"
          >
            ← Back to Places
          </Link>
        }
      />
      <PrototypeBanner>Saves live to the site immediately — this browser only, no server.</PrototypeBanner>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <Section title="Basic Information">
          <label className={labelClass}>
            Name
            <input className={fieldClass} value={form.name} onChange={(e) => set("name", e.target.value)} />
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Distance from Palakollu
              <input className={fieldClass} value={form.dist} onChange={(e) => set("dist", e.target.value)} />
            </label>
            <label className={labelClass}>
              Best time to visit
              <input className={fieldClass} value={form.bestTime} onChange={(e) => set("bestTime", e.target.value)} />
            </label>
          </div>
          <label className={labelClass}>
            Short description (used in listings)
            <textarea
              className={`${fieldClass} min-h-[60px] resize-none`}
              value={form.desc}
              onChange={(e) => set("desc", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Story (used on the place detail page)
            <textarea
              className={`${fieldClass} min-h-[100px] resize-none`}
              value={form.story}
              onChange={(e) => set("story", e.target.value)}
            />
          </label>
          <label className={labelClass}>
            Highlights (comma separated)
            <input
              className={fieldClass}
              value={form.highlights}
              onChange={(e) => set("highlights", e.target.value)}
            />
          </label>
        </Section>

        <Section title="Hero Media">
          <div className="flex items-center gap-4">
            <div className="h-24 w-36 overflow-hidden rounded-sm border border-soil/15">
              <PhotoSlot
                Icon={PLACE_ICONS[form.icon]}
                tone={form.tone}
                src={base.photo}
                aspect="aspect-auto h-full"
                className="h-full"
                alt={base.name}
              />
            </div>
            <p className="text-[13px] text-soil/60">
              Photo uploads need a backend/storage bucket — not part of this frontend prototype.
              Until a photo is set, the icon and tone below control the placeholder art shown on
              the public site.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Icon
              <select className={fieldClass} value={form.icon} onChange={(e) => set("icon", e.target.value)}>
                {Object.keys(PLACE_ICONS).map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Tone
              <select className={fieldClass} value={form.tone} onChange={(e) => set("tone", e.target.value)}>
                {["soil", "terracotta", "paddy", "canal"].map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>
          </div>
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
            Delete this place
          </button>
        </div>
      </form>
    </>
  );
}
