import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import { Property } from "@/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";


const periodLabel = {
    DAILY: "/ day",
    WEEKLY: "/ week",
    MONTHLY: "/ month",
    YEARLY: "/ year",
};

const statusStyle: { AVAILABLE: string, RENTED: string, UNAVAILABLE: string } = {
    AVAILABLE: "bg-emerald-50 text-emerald-700 border-emerald-200",
    RENTED: "bg-neutral-100 text-neutral-600 border-neutral-200",
    UNAVAILABLE: "bg-red-50 text-red-700 border-red-200",
};

export default function LandlordPropertyCard({ property }: { property: Property }) {
    return (
        <div className="w-full flex items-center justify-center bg-neutral-50 p-2 self-stretch">
            <Card className="w-full h-full max-w-sm flex flex-col justify-between shadow-sm ">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg leading-snug">
                            <Tooltip>
                                <TooltipTrigger>
                                    {property.title.length > 15 ? `${property.title.slice(0, 15)}...` : property.title}
                                </TooltipTrigger>
                                {
                                    property.title.length > 15 && <TooltipContent>
                                        {property.title}
                                    </TooltipContent>
                                }
                            </Tooltip>
                        </CardTitle>
                        <Badge
                            variant="outline"
                            className={`shrink-0 font-medium ${statusStyle[property.status] ?? ""}`}
                        >
                            {property.status.charAt(0) + property.status.slice(1).toLowerCase()}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-3">
                    <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                        <MapPin className="h-4 w-4" />
                        <span>{property.city}, {property.district}</span>
                    </div>

                    <p className="text-sm text-neutral-600">
                        {property.description ?? (
                            <span className="italic text-neutral-400">No description added yet.</span>
                        )}
                    </p>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t border-neutral-100 pt-4">
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-semibold text-neutral-900">৳{property.price}</span>
                        <span className="text-sm text-neutral-500">{periodLabel[property.pricePeriod]}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <EditButton />
                        <DeleteButton propertyId={property.id}/>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}