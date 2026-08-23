import z from "zod";

const parsedData = (zodSchema, payload) => {
    return zodSchema.parse({...payload});
}

export { parsedData };