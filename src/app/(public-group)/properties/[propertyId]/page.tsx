import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    BedDouble,
    Bath,
    Ruler,
    MapPin,
    CalendarDays,
    ExternalLink,
} from "lucide-react";
import { IResponse, Property } from "@/types";

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

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914";

export default async function PropertyDetails({
    params
}: {
    params: Promise<{ propertyId: string }>;
}) {

    const { propertyId } = await params;

    const response = await fetch(`${process.env.LOCAL_BACKEND_URL}/properties/${propertyId}`)

    if (!response.ok) {
        throw new Error(`Failed to fetch property - ${propertyId}: ${response.status}`);
    }

    const propertyResponse: IResponse<Property> = await response.json();
    const property = propertyResponse.data

    const images = property?.images;

    return (
        <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Gallery */}
            <Image
                src={images.length ? images[0] : "/images/card-image-placeholder.png"}
                alt={property.title}
                width={900}
                height={500}
                className="object-cover "
            />

            <div className="mt-8 flex flex-col gap-8 lg:flex-row">
                {/* Main column */}
                <div className="flex-1 space-y-8">
                    <div>
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
                                {property.title}
                            </h1>
                            <Badge
                                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[property.status]}`}
                            >
                                {STATUS_LABEL[property.status]}
                            </Badge>
                        </div>
                        <div className="mt-2 flex items-start gap-1.5 text-sm text-neutral-500">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>
                                {property.addressLine}, {property.city}, {property.district}
                                {property.zipCode ? ` ${property.zipCode}` : ""}
                            </span>
                        </div>
                    </div>

                    <Separator />

                    {/* Quick facts */}
                    <div className="grid grid-cols-3 divide-x divide-neutral-200 rounded-xl">
                        <div className="flex flex-col items-center gap-1 py-4">
                            <BedDouble className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium text-neutral-900">
                                {property.bedrooms ?? "—"}
                            </span>
                            <span className="text-xs text-neutral-500">Bedrooms</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 py-4">
                            <Bath className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium text-neutral-900">
                                {property.bathrooms ?? "—"}
                            </span>
                            <span className="text-xs text-neutral-500">Bathrooms</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 py-4">
                            <Ruler className="h-5 w-5 text-primary" />
                            <span className="text-sm font-medium text-neutral-900">
                                {property.areaSqft ?? "—"}
                            </span>
                            <span className="text-xs text-neutral-500">Sqft</span>
                        </div>
                    </div>

                    <Separator />

                    {/* Description */}
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-900">
                            About this property
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                            {property.description ?? "No description provided."}
                        </p>
                    </div>

                    <Separator />

                    {/* Location */}
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-900">
                            Location
                        </h2>
                        <p className="mt-3 text-sm text-neutral-600">
                            {property.addressLine}, {property.city}, {property.district}
                        </p>
                        {property.latitude && property.longitude && (
                            <Link
                                href={`https://www.google.com/maps?q=${property.latitude},${property.longitude}`}
                                target="_blank"
                                className="mt-2 inline-flex items-center gap-1 text-sm font-medium hover:underline hover:text-primary"
                            >
                                View on map
                                <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Price / booking sidebar */}
                <div className="w-full lg:w-80">
                    <Card className="lg:sticky lg:top-6">
                        <CardContent className="p-5">
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-semibold text-neutral-900">
                                    ৳{property.price}
                                </span>
                                <span className="text-sm text-neutral-500">
                                    {PERIOD_SUFFIX[property.pricePeriod]}
                                </span>
                            </div>

                            <Button
                                className="mt-4 w-full "
                                disabled={property.status !== "AVAILABLE"}
                            >
                                {property.status === "AVAILABLE"
                                    ? "Request to book"
                                    : STATUS_LABEL[property.status]}
                            </Button>

                            <div className="mt-4 flex items-center gap-1.5 text-xs text-neutral-500">
                                <CalendarDays className="h-3.5 w-3.5" />
                                Listed on {new Date(property.createdAt).toISOString()}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}