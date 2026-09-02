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

export interface IResponse<T> {
    success: boolean
    message: string
    data: T,
    meta?: {},
    error?: {}
}

export type PropertyPricePeriod = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
 
export type PropertyStatus = "AVAILABLE" | "RENTED" | "UNAVAILABLE";
 
export interface Property {
  id: string;
  title: string;
  description: string | null;
  addressLine: string;
  city: string;
  district: string;
  zipCode: number | null;
  latitude: number | null;
  longitude: number | null;
  price: number;
  pricePeriod: PropertyPricePeriod;
  bedrooms: string | null;
  bathrooms: string | null;
  areaSqft: string | null;
  status: PropertyStatus;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
  landlordId: string;
  categoryId: string | null;
}