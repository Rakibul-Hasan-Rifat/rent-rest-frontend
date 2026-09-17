"use server"

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { revalidateTag } from "next/cache";
import { IResponse, RentRequest, RentRequestStatus } from "@/types";

const cookieStore = await cookies();
const accessToken = cookieStore.get("access-token")?.value

export async function getRentalRequests() {

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in 😒",
            data: null
        }
    }

    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string)

    if (typeof decodedAccessToken === "string") {
        return {
            success: false,
            message: decodedAccessToken || "Token is invalid",
            data: null
        }
    }

    const result = await (await fetch(`${process.env.LOCAL_BACKEND_URL}/landlord/rental-requests`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        next: {
            tags: ["landlord-rental-requests"]
        }
    })).json()

    console.log("--------------", "decoded-token", "--------------")
    console.log(decodedAccessToken)
    console.log("--------------"), "request", "---------------"
    console.log(result);

    return result

}

export async function requestStatusAction(rentalRequestId: string, prevState: IResponse<RentRequest | null>, formData: FormData) {

    
    const status = formData.get("status")
    console.log("----------------------------", status, formData, prevState, rentalRequestId, "----------------------------")

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in 😒",
            data: null
        }
    }

    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string)

    if (typeof decodedAccessToken === "string") {
        return {
            success: false,
            message: decodedAccessToken || "Token is invalid",
            data: null
        }
    }

    if (status !== "APPROVED" && status !== "REJECTED") {
        return {
            success: false,
            message: "You don't have access to do so.",
            data: null
        }
    }

    const result: IResponse<RentRequest | null> = await (await fetch(`${process.env.LOCAL_BACKEND_URL}/landlord/rental-requests/${rentalRequestId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ status })
    })).json()

    revalidateTag("landlord-rental-requests", {
        expire: 0
    })

    console.log(result, "--------- result ---------")

    return result
}