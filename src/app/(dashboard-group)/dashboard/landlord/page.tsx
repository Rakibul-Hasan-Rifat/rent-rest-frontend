import { GlobeX } from "lucide-react"
import { getPropertiesByLandlordAction } from "./_actions/property-actions"
import LandlordPropertyCard from "./_components/landlord-property-card"
import { IResponse, Property } from "@/types"

export default async function LandlordDashboardPage() {
    const data: IResponse<Property[]> = await getPropertiesByLandlordAction()
    // const data = {success: false, data: null, message: "No data is available"}

    if (!data.success || !data.data) {
        return (
            <>
                <div className="min-h-96 h-full flex flex-col gap-5 items-center justify-center py-10 text-gray-500">
                    <GlobeX />
                    <p className="text-lg font-medium">
                        {data.message || "No data found"}
                    </p>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    data.data.map((property) => <LandlordPropertyCard key={property.id} property={property}/>)
                }
            </div>
        </>
)
}