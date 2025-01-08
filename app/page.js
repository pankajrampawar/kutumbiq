import Image from "next/image";
import Hero from "./components/home/hero";
import ServiceListing from "./components/home/serviceListing";

export default function Home() {
  return (
    <main className="w-full">
      <div className="w-full">
        <Hero />
      </div>

      <div>
        <ServiceListing />
      </div>
    </main>
  );
}
