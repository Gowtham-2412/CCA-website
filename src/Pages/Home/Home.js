import FluidHero from '../../Utility/FluidHero';
import CardsSection from '../../Utility/CardsSection';
import AboutTeaser from './sections/AboutTeaser';
import EventsPreview from './sections/EventsPreview';
import JoinCta from './sections/JoinCta';
import '../Editorial.css';
import './HomeSections.css';

export default function Home() {
  return (
    <>
      <section
        id="hero-section"
        className="sticky top-4 z-0 w-full flex items-center justify-center overflow-hidden rounded-b-[40px]"
      >
        <div className="absolute top-0 left-0 w-full bg-[radial-gradient(circle_at_50%_0%,rgba(165,205,5,0.06),transparent_70%)] pointer-events-none" />
        <FluidHero />
      </section>

      {/* Everything below the hero shares this one wrapper, and that matters.
          #hero-section is `sticky top-4 z-0` and its containing block is the root
          flow, so it stays stuck for the whole page scroll. A positioned element
          with z-index:0 paints in the positioned-descendants layer — above the
          normal-flow layer of non-positioned siblings — so any section added as a
          bare sibling after this div would render underneath the hero and
          effectively disappear. `-mt-px` hides a 1px seam at the join. */}
      <div className="relative z-10 -mt-px">
        <CardsSection />
        <AboutTeaser />
        <EventsPreview />
        <JoinCta />
      </div>
    </>
  );
}
