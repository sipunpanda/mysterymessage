import {z} from "zod"

export const messageSchema = z.object({
   acceptMessages: z
   .string()
   .min(10,{message: "Content must be at least of 10 character"})
   .max(300,{message: "Content must be no longer than 300 character"})
})