import { HeroBanner } from "@/app/(public-group)/_components/hero-banner";
import PropertyContainer from "@/app/(public-group)/_components/property-container";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <main className="flex flex-1 gap-14 w-full max-w-5xl flex-col items-center justify-between p-8 md:p-12 lg:p-16 bg-white dark:bg-black sm:items-start">
        <HeroBanner />
        <PropertyContainer />
      </main>
    </div>
  );
}
