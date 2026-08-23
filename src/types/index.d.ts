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