import Hero from "./ui/components/home/hero";
import ServiceListing from "./ui/components/home/serviceListing";
import TiffinSection from "./ui/components/home/tiffinSection";

export default function Home() {
  return (
    <main className="w-full">
      <div className="w-full">
        <Hero />
      </div>

      <div className="mt-16 relative -z-10">
        <ServiceListing />
      </div>

      <div className="mb-40">
        <TiffinSection />
      </div>
    </main>
  );
}
