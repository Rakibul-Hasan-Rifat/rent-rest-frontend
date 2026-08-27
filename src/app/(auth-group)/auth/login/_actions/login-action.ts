"use server"

import { LoginStateInterface } from "@/types";
import { cookies } from "next/headers";
import z from "zod";

const loginAction = async (initialState: LoginStateInterface, formData: FormData): Promise<LoginStateInterface> => {
    const email = formData.get("email")
    const password = formData.get("password")

    const loginFormSchema = z.object({
        email: z.email("Email is required"),
        password: z.string("Password is required").min(5, "Length must be greater than 5"),
    })

    const parsedData = loginFormSchema.safeParse({ email, password })

    if (!parsedData.success) {
        return {
            ...initialState,
            success: false,
            message: parsedData.error.message,
        }
    }

    const response = await fetch(`${process.env.LOCAL_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: parsedData.data.email,
            password: parsedData.data.password
        })
    })

    if (!response.ok) {
        return {
            success: false,
            message: "Login failed!",
            data: {
                accessToken: "",
                refreshToken: ""
            }
        }
    }

    const result: LoginStateInterface = await response.json();

    const cookieStore = await cookies()

    cookieStore.set("access-token", result.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    })
    cookieStore.set("refresh-token", result.data.refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    })

    return {
        ...result
    }

};

export default loginAction;