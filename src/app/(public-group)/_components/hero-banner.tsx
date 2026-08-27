import { Button } from "@/components/ui/button"
import { MapPin, Search } from "lucide-react"
import Image from "next/image"

export function HeroBanner() {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/rental-hero.png"
        alt="A welcoming modern rental home at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
        width={500}
        height={500}
        loading="eager"
      />

      {/* Dark overlay for text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
          <MapPin className="h-4 w-4" />
          Find your next home
        </span>

        <h1 className="text-balance text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          Rent a home you&apos;ll love to live in
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
          Browse thousands of verified rental houses and apartments. Simple search,
          transparent pricing, and a place that feels right.
        </p>

        {/* Search bar */}
        <div className="mt-10 w-full max-w-2xl">
          <div className="flex flex-col gap-3 rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:rounded-full sm:p-2">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by city, neighborhood, or ZIP"
                className="w-full bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                aria-label="Search rentals by location"
              />
            </div>
            <Button size="lg" className="rounded-full sm:px-8">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
