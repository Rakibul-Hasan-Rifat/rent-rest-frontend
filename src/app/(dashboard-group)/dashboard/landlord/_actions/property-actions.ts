"use server"

import { IResponse, Property } from "@/types";
import jwt from "jsonwebtoken"
import { success, z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

const propertySchema = z.object({
    id: z.uuid().optional(), // Prisma generates
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    addressLine: z.string().min(1, "Address line is required"),
    city: z.string().min(1, "City is required"),
    district: z.string().min(1, "District is required"),
    zipCode: z.number().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    price: z.number().nonnegative(), // Decimal → number
    pricePeriod: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]).default("DAILY"),
    bedrooms: z.string().optional(),
    bathrooms: z.string().optional(),
    areaSqft: z.string().optional(),
    status: z.enum(["AVAILABLE", "RENTED", "UNAVAILABLE"]).default("AVAILABLE"),
    images: z.array(z.url().optional()).default([]),

    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),

    landlordId: z.string().min(1, "Landlord ID is required"),
    landlord: z.any().optional(), // replace with User schema if available
    categoryId: z.string().optional(),
    category: z.any().optional(), // replace with Category schema if available
    rentalRequest: z.array(z.any()).optional(), // replace with RentalRequest schema
    //   review: z.array(z.any()).optional(), // replace with Review schema
});

export const createPropertyAction = async (initialState: IResponse<Property | null>, formData: FormData) => {

    const formInfo = Object.fromEntries(formData);
    const images = formInfo.images ? (formInfo.images as string).split(",").map(image => image.startsWith(" ") || image.endsWith(" ") ? image.trim() : image) : []
    const addressLine = formInfo.address;
    const price = Number(formInfo.price);

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access-token")?.value

    if (!accessToken) {
        redirect("/auth/login")
    }

    const decoded = jwt.decode(accessToken)

    if (typeof decoded === 'string' || null) {
        redirect("/auth/login")
    }

    const landlordId = decoded?.id
    const parsedData = propertySchema.safeParse({
        ...formInfo,
        price,
        images,
        addressLine,
        landlordId,
    })

    if (!parsedData.success) {
        return {
            ...initialState,
            success: false,
            message: parsedData.error.issues.map(issue => issue.message).join(", "),
        }
    }

    const response: Response = await fetch(`${process.env.LOCAL_BACKEND_URL}/landlord/properties`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(parsedData.data)
    })
    
    const result: IResponse<Property> = await response.json();
    
    if (result.error) {
        return {
            success: false,
            message: "Propery creation failed!",
            data: null,
            error: result.error
        }
    }

    return result;
}

export const getPropertiesByLandlordAction = async () => {

    const cookieStore = await cookies()

    const accessToken = cookieStore.get("access-token")?.value

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
            message: decodedAccessToken,
            data: null
        }
    }

    console.log(decodedAccessToken, "decoded-access-token")

    const response = await fetch(`${process.env.LOCAL_BACKEND_URL}/landlord/properties`, {
        headers: {
            authorization: `Bearer ${accessToken}`
        },
        cache: "force-cache",
        next: {
            tags: ["landlord-properties"],
        },        
    });
    
    const result = await response.json();

    return result;

}