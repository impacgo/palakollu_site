import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import SectionBackdrop from "./SectionBackdrop";
import SectionDivider from "./SectionDivider";
import { CONTACT_BACKDROP } from "../data/content";
import { getPackages, getSiteSettings } from "../lib/contentStore";
import { addEnquiry } from "../lib/enquiryStore";
import EnquiryStepper from "./EnquiryStepper";

const inputClass =
  "w-full rounded-sm border border-turmeric/20 bg-soil-2 px-4 py-3 text-[14px] text-husk placeholder:text-husk-dim/60 focus:border-turmeric focus:outline-none transition-colors";

const EMPTY_FORM = { name: "", phone: "", email: "", dates: "", travellers: "", pkg: "", notes: "" };

export default function Contact({ prefill }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(null);
  const packages = getPackages();
  const settings = getSiteSettings();

  useEffect(() => {
    if (!prefill) return;
    const matched = getPackages().find((p) => p.title === prefill);
    setForm((f) => ({
      ...f,
      pkg: matched ? matched.title : f.pkg,
      notes: matched ? f.notes : `Re: ${prefill} — `,
    }));
  }, [prefill]);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const reference = `PT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    addEnquiry({ ...form, reference });
    setSent({ ...form, reference });
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-soil-deep pb-28 md:pb-36">
      <SectionBackdrop
        tone="canal"
        src={CONTACT_BACKDROP}
        animate
        alt="A boat drifting on the Godavari canals at dusk"
      />
      <SectionDivider className="relative z-10" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:gap-12">
        <div>
          <SectionIntro
            align="left"
            eyebrow="Plan Your Trip"
            heading="Let's plan your Godavari escape"
            description="Tell us when you would like to come and how many people are travelling. We'll help shape a route and a place to stay around Palakollu."
          />

          <Reveal delay={0.2} className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-[14px] text-husk-dim">
              <span className="font-sans text-[10px] uppercase tracking-widest-3 text-turmeric">Call</span>
              <span>{settings.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-[14px] text-husk-dim">
              <span className="font-sans text-[10px] uppercase tracking-widest-3 text-turmeric">WhatsApp</span>
              <span>{settings.whatsapp}</span>
            </div>
            <div className="flex items-center gap-3 text-[14px] text-husk-dim">
              <span className="font-sans text-[10px] uppercase tracking-widest-3 text-turmeric">Email</span>
              <span>{settings.email}</span>
            </div>
            <div className="flex items-center gap-3 text-[14px] text-husk-dim">
              <span className="font-sans text-[10px] uppercase tracking-widest-3 text-turmeric">Based in</span>
              <span>{settings.address}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {sent ? (
            <div className="flex h-full flex-col justify-center rounded-sm border border-turmeric/30 bg-soil-2 p-10 text-center">
              <span className="font-display text-3xl text-turmeric">Your Godavari story has begun.</span>
              <p className="mt-3 text-[14px] text-husk-dim">
                We've received your request. We'll be in touch to shape the details of your
                journey — this confirms your enquiry, not a booking.
              </p>
              <div className="mx-auto mt-6 flex flex-col gap-2 text-left text-[13px] text-husk-dim">
                {sent.pkg && (
                  <div className="flex justify-between gap-6">
                    <span className="text-husk-dim/70">Package</span>
                    <span className="text-husk">{sent.pkg}</span>
                  </div>
                )}
                {sent.dates && (
                  <div className="flex justify-between gap-6">
                    <span className="text-husk-dim/70">Dates</span>
                    <span className="text-husk">{sent.dates}</span>
                  </div>
                )}
                {sent.travellers && (
                  <div className="flex justify-between gap-6">
                    <span className="text-husk-dim/70">Travellers</span>
                    <span className="text-husk">{sent.travellers}</span>
                  </div>
                )}
                <div className="flex justify-between gap-6 border-t border-dashed border-husk/20 pt-2">
                  <span className="text-husk-dim/70">Reference</span>
                  <span className="text-turmeric">{sent.reference}</span>
                </div>
              </div>
              <Link
                to="/"
                className="mx-auto mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-turmeric/40 px-6 py-2.5 font-sans text-[11.5px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-turmeric hover:text-soil-deep"
              >
                Return to the Delta
              </Link>
            </div>
          ) : (
            <>
              {/* Mobile: one focused question per screen (spec §26) */}
              <div className="md:hidden">
                <EnquiryStepper form={form} update={update} packages={packages} inputClass={inputClass} onSubmit={handleSubmit} />
              </div>

              {/* Desktop: compact, all fields at once */}
              <form
                onSubmit={handleSubmit}
                className="hidden flex-col gap-4 rounded-sm border border-turmeric/15 bg-soil-2/60 p-8 md:flex"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={form.name}
                    onChange={update("name")}
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    required
                    value={form.phone}
                    onChange={update("phone")}
                    className={inputClass}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={update("email")}
                  className={inputClass}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Preferred dates"
                    value={form.dates}
                    onChange={update("dates")}
                    className={inputClass}
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Number of travellers"
                    value={form.travellers}
                    onChange={update("travellers")}
                    className={inputClass}
                  />
                </div>
                <select value={form.pkg} onChange={update("pkg")} className={inputClass}>
                  <option value="">Preferred package (optional)</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.title}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="Notes / special requests…"
                  value={form.notes}
                  onChange={update("notes")}
                  className={`${inputClass} min-h-[100px] resize-none`}
                />
                <button
                  type="submit"
                  className="mt-1 rounded-sm bg-terracotta py-3 font-sans text-[13px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-turmeric hover:text-soil-deep"
                >
                  Send Enquiry
                </button>
              </form>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
