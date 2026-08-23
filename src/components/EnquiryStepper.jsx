import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STEPS = ["When are you coming?", "Who's travelling with you?", "What do you want to experience?", "How can we reach you?"];

const EASE = [0.22, 1, 0.36, 1];

/**
 * The mobile enquiry flow: one focused question per screen, per spec §26.
 * Desktop keeps the compact all-fields-at-once form (see Contact.jsx) —
 * this component is only mounted below the md breakpoint.
 */
export default function EnquiryStepper({ form, update, packages, inputClass, onSubmit }) {
  const [step, setStep] = useState(0);
  const lastStep = step === STEPS.length - 1;

  function next() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }
  function handleContinue(e) {
    e.preventDefault();
    if (lastStep) onSubmit(e);
    else next();
  }

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-6 rounded-sm border border-turmeric/15 bg-soil-2/60 p-6">
      <div>
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10.5px] uppercase tracking-widest-3 text-turmeric">
            Step {step + 1} of {STEPS.length}
          </span>
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${i <= step ? "bg-turmeric" : "bg-husk/15"}`}
              />
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.h3
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-3 font-display text-[22px] leading-snug text-husk"
          >
            {STEPS[step]}
          </motion.h3>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="flex flex-col gap-4"
        >
          {/* No autoFocus here: this component also mounts pre-scroll on
              /contact, and on every place/package detail page (embedded
              near the bottom) — autoFocus on mount forces the browser to
              scroll the whole page down to this field on load. */}
          {step === 0 && (
            <input
              type="text"
              placeholder="Preferred dates (e.g. 12–14 Dec 2026)"
              value={form.dates}
              onChange={update("dates")}
              className={inputClass}
            />
          )}

          {step === 1 && (
            <input
              type="number"
              min="1"
              autoFocus
              placeholder="Number of travellers"
              value={form.travellers}
              onChange={update("travellers")}
              className={inputClass}
            />
          )}

          {step === 2 && (
            <>
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
            </>
          )}

          {step === 3 && (
            <>
              <input
                type="text"
                autoFocus
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
              <input
                type="email"
                placeholder="Email address (optional)"
                value={form.email}
                onChange={update("email")}
                className={inputClass}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={back}
            className="rounded-sm border border-turmeric/30 px-5 py-3 font-sans text-[12.5px] font-semibold uppercase tracking-widest-3 text-husk-dim transition-colors hover:border-turmeric hover:text-husk"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className="flex-1 rounded-sm bg-terracotta py-3 font-sans text-[13px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-turmeric hover:text-soil-deep"
        >
          {lastStep ? "Send Enquiry" : "Continue"}
        </button>
      </div>
    </form>
  );
}
