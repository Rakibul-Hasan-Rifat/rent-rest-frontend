import { User } from "@/types";
import { cookies } from "next/headers"

const getMe = async (): Promise<User | null> => {
    const token = (await cookies()).get("access-token");

    if (!token) {
        return null
    }
}

export { getMe }