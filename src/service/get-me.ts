import { IResponse, User } from "@/types";
import { cookies } from "next/headers"

const getMe = async (): Promise<IResponse<User> | null> => {
    const token = (await cookies()).get("access-token")?.value;

    if (!token) {
        return null
    }

    const res = await fetch(`${process.env.BACKEND_URL}/users/me`, {
        headers: {
            // "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },      
        credentials: "include"
    })
    const result = await res.json();

    return result
}

export default getMe;