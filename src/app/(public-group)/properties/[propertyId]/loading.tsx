import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const PropertyDetailsPageLoader = () => {
    return (
        <section className="mx-auto max-w-5xl w-full px-4 py-8 sm:px-6 lg:px-8">
            {/* Gallery */}
            <Skeleton className="min-w-md min-h-72 w-full h-full rounded-none sm:col-span-3" />

            <div className="mt-8 flex flex-col gap-8 lg:flex-row">
                {/* Main column */}
                <div className="flex-1 space-y-8">
                    <div>
                        <div className="flex items-start justify-between gap-4">
                            <Skeleton className="h-8 w-2/3" />
                            <Skeleton className="h-6 w-20 shrink-0 rounded-full" />
                        </div>
                        <Skeleton className="mt-3 h-4 w-1/2" />
                    </div>

                    <Separator />

                    {/* Quick facts */}
                    <div className="grid grid-cols-3 divide-x divide-neutral-200 rounded-xl border border-neutral-200">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 py-4">
                                <Skeleton className="h-5 w-5 rounded-full" />
                                <Skeleton className="h-4 w-8" />
                                <Skeleton className="h-3 w-14" />
                            </div>
                        ))}
                    </div>

                    <Separator />

                    {/* Description */}
                    <div>
                        <Skeleton className="h-5 w-40" />
                        <div className="mt-3 space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>

                    <Separator />

                    {/* Location */}
                    <div>
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="mt-3 h-4 w-3/4" />
                        <Skeleton className="mt-3 h-4 w-28" />
                    </div>
                </div>

                {/* Price / booking sidebar */}
                <div className="w-full lg:w-80">
                    <Card className="lg:sticky lg:top-6">
                        <CardContent className="p-5">
                            <Skeleton className="h-7 w-28" />
                            <Skeleton className="mt-4 h-10 w-full rounded-md" />
                            <Skeleton className="mt-4 h-3 w-32" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default PropertyDetailsPageLoader;