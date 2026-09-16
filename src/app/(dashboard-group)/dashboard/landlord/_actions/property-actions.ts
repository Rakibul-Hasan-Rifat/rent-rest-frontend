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

const cookieStore = await cookies();
const accessToken = cookieStore.get("access-token")?.value

export const createPropertyAction = async (initialState: IResponse<Property | null>, formData: FormData) => {

    const formInfo = Object.fromEntries(formData);
    const images = formInfo.images ? (formInfo.images as string).split(",").map(image => image.startsWith(" ") || image.endsWith(" ") ? image.trim() : image) : []
    const addressLine = formInfo.address;
    const price = Number(formInfo.price);


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
        body: JSON.stringify(parsedData.data),
    })

    const result: IResponse<Property> = await response.json();

    if (result.error || !result.success) {
        return {
            success: false,
            message: "Propery creation failed!",
            data: null,
            error: result.error
        }
    }

    revalidateTag("lanlord-properties", { expire: 0 })

    return result;
}

export const getPropertiesByLandlordAction = async () => {

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

export const deletePropertyByLandlordAction = async (
    id: string
) => {
    console.log('delete button', id)

    const doesPropertyExist: IResponse<Property | null> = await (await fetch(`${process.env.LOCAL_BACKEND_URL}/properties/${id}`)).json()

    if (!doesPropertyExist.success) {
        return {
            ...doesPropertyExist,
            success: false,
            message: doesPropertyExist.message || "Property with id is not found!",
        }
    }

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

    const result: IResponse<null> = await (await fetch(`${process.env.LOCAL_BACKEND_URL}/landlord/properties/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    })).json()

    if (!result.success || result.error) {
        return {
            success: false,
            message: result.message || "Property not deleted successfully!"
        }
    }

    revalidateTag("landlord-properties", { expire: 0 })

    return result;
}

export const updatePropertyByLandlordAction = async (propertyId: string, initialState: IResponse<Property>, formData: FormData) => {
    console.log('property-id in property-update-action', propertyId, formData)

    const formInfo = Object.fromEntries(formData);
    const images = formInfo.images ? (formInfo.images as string).split(",").map(image => image.startsWith(" ") || image.endsWith(" ") ? image.trim() : image) : []
    const price = Number(formInfo.price);

    if (!accessToken) {
        redirect("/auth/login")
    }

    const decoded = jwt.decode(accessToken)

    if (typeof decoded === 'string' || null) {
        redirect("/auth/login")
    }


    const result: IResponse<Property> = await (await fetch(`${process.env.LOCAL_BACKEND_URL}/landlord/properties/${propertyId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            ...formInfo,
            images,
            price
        })
    })).json()

    revalidateTag("landlord-properties", { expire: 0 })

    return result
}