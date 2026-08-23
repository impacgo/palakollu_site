import { useState } from "react";
import {
  getSiteSettings,
  saveSiteSettings,
  getGodavariFacts,
  setGodavariFacts,
  getFoodItems,
  setFoodItems,
  resetAllContent,
} from "../lib/contentStore";
import { AdminPageHeader, PrototypeBanner, AdminCard } from "./AdminUI";

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

export default function SiteSettings() {
  const [settings, setSettingsForm] = useState(getSiteSettings);
  const [facts, setFactsForm] = useState(getGodavariFacts);
  const [food, setFoodForm] = useState(getFoodItems);
  const [saved, setSaved] = useState(false);

  function setField(field, value) {
    setSettingsForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  }

  function updateFact(i, key, value) {
    setFactsForm((list) => list.map((f, idx) => (idx === i ? { ...f, [key]: value } : f)));
    setSaved(false);
  }

  function updateFood(i, key, value) {
    setFoodForm((list) => list.map((f, idx) => (idx === i ? { ...f, [key]: value } : f)));
    setSaved(false);
  }

  function addFoodItem() {
    setFoodForm((list) => [...list, { title: "", body: "" }]);
  }

  function removeFoodItem(i) {
    setFoodForm((list) => list.filter((_, idx) => idx !== i));
  }

  function handleSave(e) {
    e.preventDefault();
    saveSiteSettings(settings);
    setGodavariFacts(facts);
    setFoodItems(food);
    setSaved(true);
  }

  function handleReset() {
    if (!window.confirm("Reset ALL site content (places, packages, facts, contact info) back to defaults? This can't be undone.")) return;
    resetAllContent();
    window.location.reload();
  }

  return (
    <>
      <AdminPageHeader
        eyebrow="Site-wide"
        title="Settings"
        description="Contact details, the Godavari river facts, and the Food categories shown across the site."
      />
      <PrototypeBanner />

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        <Section title="Contact details">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className={labelClass}>
              Phone
              <input className={fieldClass} value={settings.phone} onChange={(e) => setField("phone", e.target.value)} />
            </label>
            <label className={labelClass}>
              WhatsApp
              <input className={fieldClass} value={settings.whatsapp} onChange={(e) => setField("whatsapp", e.target.value)} />
            </label>
            <label className={labelClass}>
              Email
              <input className={fieldClass} value={settings.email} onChange={(e) => setField("email", e.target.value)} />
            </label>
            <label className={labelClass}>
              Coordinates
              <input className={fieldClass} value={settings.coordinates} onChange={(e) => setField("coordinates", e.target.value)} />
            </label>
          </div>
          <label className={labelClass}>
            Address
            <input className={fieldClass} value={settings.address} onChange={(e) => setField("address", e.target.value)} />
          </label>
          <p className="text-[12px] italic text-soil/50">
            Appears in the footer, the homepage closing CTA, and the /contact page.
          </p>
        </Section>

        <Section title="The Godavari — river facts">
          <p className="text-[13px] text-soil/60">
            The four stat blocks shown on the homepage and About page. Distances, dates and
            historical details here have been checked against public sources — edit with care.
          </p>
          {facts.map((f, i) => (
            <div key={i} className="rounded-sm border border-soil/10 p-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className={labelClass}>
                  Stat
                  <input className={fieldClass} value={f.stat} onChange={(e) => updateFact(i, "stat", e.target.value)} />
                </label>
                <label className={labelClass}>
                  Label
                  <input className={fieldClass} value={f.label} onChange={(e) => updateFact(i, "label", e.target.value)} />
                </label>
              </div>
              <label className={labelClass}>
                Body
                <textarea
                  className={`${fieldClass} min-h-[70px] resize-none`}
                  value={f.body}
                  onChange={(e) => updateFact(i, "body", e.target.value)}
                />
              </label>
            </div>
          ))}
        </Section>

        <Section title="Taste the Delta — food categories">
          <p className="text-[13px] text-soil/60">
            Shown on the homepage Food section. The defaults name real, well-documented Andhra
            dishes — swap in specific homestay menus and food photos whenever you have them confirmed.
          </p>
          {food.map((f, i) => (
            <div key={i} className="rounded-sm border border-soil/10 p-4">
              <div className="flex items-center justify-between">
                <span className={labelClass}>Item {i + 1}</span>
                <button type="button" onClick={() => removeFoodItem(i)} className="text-[12px] text-terracotta">
                  Remove
                </button>
              </div>
              <input
                className={fieldClass}
                placeholder="Title"
                value={f.title}
                onChange={(e) => updateFood(i, "title", e.target.value)}
              />
              <textarea
                className={`${fieldClass} min-h-[60px] resize-none`}
                placeholder="Description"
                value={f.body}
                onChange={(e) => updateFood(i, "body", e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addFoodItem}
            className="w-fit font-sans text-[11.5px] font-semibold uppercase tracking-widest-3 text-terracotta"
          >
            + Add food category
          </button>
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
            onClick={handleReset}
            className="ml-auto font-sans text-[11.5px] font-semibold uppercase tracking-widest-3 text-terracotta/70 hover:text-terracotta"
          >
            Reset all content to defaults
          </button>
        </div>
      </form>
    </>
  );
}
