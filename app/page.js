import Image from "next/image";
import Hero from "./ui/components/home/hero";
import ServiceListing from "./ui/components/home/serviceListing";
import TiffinSection from "./ui/components/home/tiffinSection";
import HousingSection from "./ui/components/home/housingSection";
import MaidSection from "./ui/components/home/maidSection";

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
