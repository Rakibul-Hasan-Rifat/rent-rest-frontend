"use server"

import { RentRequestState } from "@/types"
import { cookies } from "next/headers"
import jwt, { Secret } from "jsonwebtoken"

export default async function rentRequestAction(prevState: RentRequestState, formData: FormData): Promise<RentRequestState> {

    console.log("request action", formData, prevState)

    const token = (await cookies()).get("access-token")?.value

    if(!token) throw new Error("Not Authorized!");

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as Secret)

    if (typeof decoded === "string") throw new Error("Unauthorized");

    console.log("decoded token", decoded)

    const tenantId = decoded.id;
    const {startDate, endDate, propertyId} = Object.fromEntries(formData)

    console.log("form data", startDate, endDate, propertyId, tenantId)
    return { ...prevState }
}