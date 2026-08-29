import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Property } from "@/types";
import { ArrowUpRight, Bath, BedDouble, MapPin, Ruler } from "lucide-react"
import Image from "next/image";
import Link from "next/link";

const STATUS_STYLES = {
  AVAILABLE: "bg-emerald-600 text-white hover:bg-emerald-600",
  RENTED: "bg-amber-500 text-white hover:bg-amber-500",
  UNAVAILABLE: "bg-neutral-500 text-white hover:bg-neutral-500",
};

const STATUS_LABEL = {
  AVAILABLE: "Available",
  RENTED: "Rented",
  UNAVAILABLE: "Unavailable",
};

const PERIOD_SUFFIX = {
  DAILY: "/ day",
  WEEKLY: "/ week",
  MONTHLY: "/ month",
  YEARLY: "/ year",
};

const PropertyCard = async ({ property }: { property: Property }) => {
  console.log(property.status, property.images[0]);

  return (
    <Card className="group overflow-hidden border-neutral-200 bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
        {
          <Image
            src={property.images[0] ? property.images[0] : "/images/card-image-placeholder.png"}
            alt={property.title || "Property Image"}
            width={300}
            height={300}
            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 opacity-100 `}
          />
        }
        <Badge
          className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${STATUS_STYLES[property.status]}`}
        >
          {STATUS_LABEL[property.status]}
        </Badge>
        {property.status}
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent px-4 pb-3 pt-8">
          <span className="text-lg font-semibold text-white">
            ৳{property.price}
          </span>
          <span className="ml-1 text-xs text-white/80">
            {PERIOD_SUFFIX[property.pricePeriod]}
          </span>
        </div>
      </div>

      <CardContent className="space-y-2.5 px-4 pt-4">
        <h3 className="truncate text-[15px] font-semibold leading-tight text-neutral-900">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-sm text-neutral-500">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {property.city}, {property.district}
          </span>
        </div>
        <div className="flex items-center gap-4 pt-1 text-sm text-neutral-600">
          <span className="flex items-center gap-1">
            <BedDouble className="h-4 w-4 text-neutral-400" />
            {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-neutral-400" />
            {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="h-4 w-4 text-neutral-400" />
            {property.areaSqft} sqft
          </span>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-2">
        <Link href={`/properties/${property.id}`} className="w-full ">
          <Button
            variant="destructive"
            className="w-full justify-between border-neutral-200 text-sm font-medium"
          >
            View details
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default PropertyCard