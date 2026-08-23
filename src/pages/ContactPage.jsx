import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import Contact from "../components/Contact";
import { CONTACT_BACKDROP } from "../data/content";
import { getSiteSettings } from "../lib/contentStore";

const MAP_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=81.63%2C16.47%2C81.83%2C16.57&layer=mapnik&marker=16.5167%2C81.73";

export default function ContactPage() {
  const settings = getSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Come find us."
        description="Palakollu, West Godavari, Andhra Pradesh — reach out and we'll help shape your route."
        image={CONTACT_BACKDROP}
        tone="canal"
      />

      <section className="relative bg-soil-deep bg-village-weave py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <Reveal className="rounded-sm border border-turmeric/15 bg-soil-2/60 p-8">
              <h3 className="font-sans text-[11px] font-semibold uppercase tracking-widest-3 text-turmeric">
                Address
              </h3>
              <p className="mt-3 font-display text-[22px] leading-snug text-husk">
                Palakollu
                <br />
                West Godavari
                <br />
                Andhra Pradesh, India
              </p>
              <span className="mt-3 inline-block font-sans text-[11px] uppercase tracking-widest-3 text-husk-dim/60">
                {settings.coordinates}
              </span>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-dashed border-husk/20 pt-6 text-[14px] text-husk-dim">
                <div>
                  <span className="block font-sans text-[10px] uppercase tracking-widest-3 text-turmeric">
                    Phone
                  </span>
                  {settings.phone}
                </div>
                <div>
                  <span className="block font-sans text-[10px] uppercase tracking-widest-3 text-turmeric">
                    WhatsApp
                  </span>
                  {settings.whatsapp}
                </div>
                <div>
                  <span className="block font-sans text-[10px] uppercase tracking-widest-3 text-turmeric">
                    Email
                  </span>
                  {settings.email}
                </div>
                <div>
                  <span className="block font-sans text-[10px] uppercase tracking-widest-3 text-turmeric">
                    Social
                  </span>
                  Instagram · Facebook
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="overflow-hidden rounded-sm border border-turmeric/15">
              <iframe
                title="Palakollu, West Godavari — map"
                src={MAP_SRC}
                className="h-full min-h-[320px] w-full"
                style={{ border: 0, filter: "sepia(15%) saturate(85%)" }}
                loading="lazy"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
