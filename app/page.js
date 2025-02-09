import AboutUs from "./ui/components/home/aboutUs";
import Hero from "./ui/components/home/hero";
import ServiceListing from "./ui/components/home/serviceListing";
import TiffinSection from "./ui/components/home/tiffinSection";

export default function Home() {
  return (
    <main className="w-full">
      <div className="w-full relative z-10">
        <Hero />
      </div>

      <div className="mt-16">
        <ServiceListing />
      </div>

      <div>
        <AboutUs />
      </div>
    </main>
  );
}
