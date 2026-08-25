"use server"

import { RegisterStateInterface } from "@/types";
import z from "zod";

const registerAction = async (initialState: RegisterStateInterface, formData: FormData) => {
    console.log(Object.fromEntries(formData))

    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")
    const confirmPassword = formData.get("confirm-password");

    console.log(name, email, password, confirmPassword)

    const registerFormSchema = z.object({
        name: z.string("Name is required.").min(3, "Name length must contain at least 2 charrecters."),
        email: z.email("Email is required."),
        password: z.string("Password is required.").min(5, "Password should contain at least 5 charecters."),
        confirmPassword: z.string("Confirm-Password is required.").min(5, "Confirm-Password should contain least 5 charecters")
    }).refine((data) => data.password === data.confirmPassword, "Password and confir-password should have the save value.")

    const parsedData = registerFormSchema.safeParse({ name, email, password, confirmPassword });

    if (!parsedData.success) {
        return {
            ...initialState,
            success: false,
            message: parsedData.error.message,
        }
    }

    const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: parsedData.data.name,
            email: parsedData.data.email,
            password: parsedData.data.password
        })
    });

    if (!response.ok) {
        return {
            ...initialState,
            success: false,
            message: "Register failed!"
        }
    }

    const result: RegisterStateInterface = await response.json();

    return { ...result }
}

export default registerAction;