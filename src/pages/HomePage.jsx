import Hero from "../components/Hero";
import Arrival from "../components/Arrival";
import About from "../components/About";
import GodavariFacts from "../components/GodavariFacts";
import FollowTheWater from "../components/FollowTheWater";
import Places from "../components/Places";
import Packages from "../components/Packages";
import Stays from "../components/Stays";
import Traditions from "../components/Traditions";
import Food from "../components/Food";
import SlowTravel from "../components/SlowTravel";
import PlanTrailCTA from "../components/PlanTrailCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Arrival />
      <About />
      <GodavariFacts />
      <FollowTheWater />
      <Places />
      <Packages />
      <Stays />
      <Traditions />
      <Food />
      <SlowTravel />
      <PlanTrailCTA />
    </>
  );
}
