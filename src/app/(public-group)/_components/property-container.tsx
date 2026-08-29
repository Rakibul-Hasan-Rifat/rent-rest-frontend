import { Suspense } from "react";
import PropertyCard from "./property-card";
import { IResponse, Property } from "@/types";
import LoadingCards from "./loading-cards";

// const properties: unknown[] = []

const getProperties = async (all: boolean) => {
    const response: Response = await fetch(`${process.env.LOCAL_BACKEND_URL}/properties`)

    if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.status}`);
    }

    const result: IResponse<Property[]> = await response.json();
    const properties = result.data
    console.log(properties)
    return properties.splice(0, all ? properties.length : 6);
}

const PropertyContainer = async ({ all = false }: { all?: boolean }) => {

    const properties = await getProperties(all);


    return (
        <div className="w-full bg-neutral-50 p-6 md:p-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex items-baseline justify-between">
                    <h2 className="text-xl font-semibold text-neutral-900 md:text-2xl">
                        Available properties
                    </h2>
                    <span className="text-sm text-neutral-500">
                        {properties.length} listings
                    </span>
                </div>

                <Suspense >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Suspense fallback={Array.from({ length: 3 }).map((_, i) => (<LoadingCards key={i} />))}>
                            {properties?.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </Suspense>
                    </div>
                </Suspense>
            </div>
        </div>
    )
}

export default PropertyContainer;