import Image from "next/image";
import Hero from "./components/home/hero";
import ServiceListing from "./components/home/serviceListing";
import TiffinSection from "./components/home/tiffinSection";
import HousingSection from "./components/home/housingSection";
import MaidSection from "./components/home/maidSection";

export default function Home() {
  return (
    <main className="w-full">
      <div className="w-full">
        <Hero />
      </div>

      <div className="mt-16">
        <ServiceListing />
      </div>

      <div>
        <TiffinSection />
      </div>

      <div>
        <HousingSection />
      </div>

      <div>
        <MaidSection />
      </div>
    </main>
  );
}
