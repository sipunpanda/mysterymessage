import {z} from 'zod'
export const usernameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username maximum 20 characters")
  .regex(/^[a-zA-Z][a-zA-Z0-9_]{2,19}$/, "Username must not contain special characters")
    

    export const signUpSchema = z.object({
        username: usernameValidation,
        email: z.string().email({message: "Invalid email address"}),
        password: z.string().min(6,{message: "Invalid Password"})
    })