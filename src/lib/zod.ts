import z from "zod";

const parsedData = <T>(zodSchema: z.ZodObject, payload: T) => {
    return zodSchema.parse({...payload});
}

export { parsedData };