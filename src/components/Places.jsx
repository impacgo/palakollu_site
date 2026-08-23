import SectionIntro from "./SectionIntro";
import SectionDivider from "./SectionDivider";
import PlacesList from "./PlacesList";

export default function Places() {
  return (
    <section id="places" className="relative bg-soil-deep bg-village-weave pb-28 md:pb-36">
      <SectionDivider />
      <div className="mx-auto max-w-6xl px-6">
        <SectionIntro
          eyebrow="Around Palakollu"
          heading="Nearby places worth the detour"
          description="Temples, backwaters, beaches, villages and craft traditions within reach of Palakollu."
        />

        <div className="mt-16">
          <PlacesList />
        </div>
      </div>
    </section>
  );
}
