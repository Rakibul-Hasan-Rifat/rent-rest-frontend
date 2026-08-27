"use server";
import { cookies } from "next/headers";

const logoutAction = async () => {

    (await cookies()).delete("access-token");
    (await cookies()).delete("refresh-token");
}

export default logoutAction;