"use server"

import { IResponse, RentRequest } from "@/types"
import { cookies } from "next/headers"
import jwt, { Secret } from "jsonwebtoken"

export default async function rentRequestAction(prevState: IResponse<RentRequest | null>, formData: FormData): Promise<IResponse<RentRequest | null>> {

    console.log("request action", formData, prevState)

    const token = (await cookies()).get("access-token")?.value

    if (!token) {
        // throw new Error("Not Authorized!");
        return { success: false, message: "Not authenticated 😒!", data: null }
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as Secret)

    if (typeof decoded === "string") {
        return { success: false, message: "Not authorized 😢!", data: null }
    }

    console.log("decoded token", decoded)

    const tenantId = decoded.id;
    const { startDate, endDate, propertyId } = Object.fromEntries(formData)

    console.log("form data", startDate, endDate, propertyId, tenantId)

    if (!startDate || !endDate || !propertyId || !tenantId) {
        // throw new Error("startDate, endDate, propertyId and tenantId must be given.")
        return { success: false, message: "startDate, endDate, propertyId and tenantId must be given.", data: null }
    }

    const response = await fetch(`${process.env.LOCAL_BACKEND_URL}/rentals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ startDate, endDate, propertyId, tenantId })
    })

    const result: IResponse<RentRequest> = await response.json();

    return { ...result }
}