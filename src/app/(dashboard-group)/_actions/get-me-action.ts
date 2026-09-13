"use server";

export async function getMe () {
    const response = await fetch(`${process.env.BACKEND_URL}/users/me`)
    const result = await response.json();

    
}