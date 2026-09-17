import { getRentalRequests } from "./_actions/rental-request-actions"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { RentRequest, RentRequestStatus } from "@/types";
import ApproveButton from "./_components/approve-button";
import RejectButton from "./_components/reject-button";

const statusStyle = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
    ACTIVE: "bg-blue-50 text-blue-700 border-blue-200",
    COMPLETED: "bg-neutral-100 text-neutral-600 border-neutral-200",
};

const label = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

export default async function RentalRequestsList({ requests = [] }) {

    const { success, message, data } = await getRentalRequests()

    if (!data.length) {
        return (
            <p className="text-sm text-neutral-500 py-8 text-center">
                No rental requests yet.
            </p>
        );
    }

    return (
        <Card className="">
            <CardHeader className="pb-3">
                <CardTitle className="text-base">
                    Rental requests
                    <span className="ml-2 text-sm font-normal text-neutral-500">
                        ({data.length})
                    </span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
                <ul className="divide-y divide-neutral-100">
                    {data.map((rent: RentRequest) => (
                        <li
                            key={rent.id}
                            className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-neutral-50"
                        >
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-neutral-900">
                                    {rent.property?.title}
                                </p>
                                <p className="truncate text-xs text-neutral-500">
                                    {rent.tenant?.name} ·{" "}
                                    {new Date(rent.startDate).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className={`text-xs font-medium ${statusStyle[rent.status as keyof typeof statusStyle] ?? ""}`}
                                >
                                    {label(rent.status as string)}
                                </Badge>
                                    <>
                                        <ApproveButton status={rent.status as RentRequestStatus} rentalRequestId={rent.id as string}/>
                                        <RejectButton status={rent.status as RentRequestStatus} rentalRequestId={rent.id as string} />
                                    </>
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}