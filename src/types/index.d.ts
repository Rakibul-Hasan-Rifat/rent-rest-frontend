export interface LoginStateInterface {
    success: boolean
    message: string
    data: {
        accessToken: string
        refreshToken: string
    }
    meta?: Record<string, unknown>
    error?: Record<string, unknown> | null
}

export interface RegisterStateInterface {
    success: boolean
    message: string
    data: {
        id?: string
        name: string
        email: string
        password: string
        phone?: string
        profilePhoto?: string
        role?: "TENANT" | "LANDLORD" | "ADMIN"
        status?: "ACTIVE" | "INACTIVE" | "PENDING"
        createdAt?: Date
        updatedAt?: Date
    }
    meta?: Record<string, unknown>
    error?: Record<string, unknown> | null
}

export interface User {
    id: string
    name: string
    email: string
    role: "TENANT" | "LANDLORD" | "ADMIN"
}