import {z} from 'zod'

export const usernameValidation = z
    .string()
    .min(3,"Username Must be atleast 3 Characters")
    .min(20,"Username Must be atleast 20 Characters")
    .regex( /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/, "username must not contain special character")
    

    export const signUpSchema = z.object({
        username: usernameValidation,
        email: z.string().email({message: "Invalid email address"}),
        password: z.string().min(6,{message: "Invalid email address"})
    })