// "use client"

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { toast } from "sonner"
// import { motion } from "framer-motion"
// import Link from "next/link"

// const forgotPasswordSchema = z.object({
//     email: z.string().email({ message: "Please enter a valid email address" }),
// })

// const ForgotPasswordPage = () => {
//     const [isSubmitting, setIsSubmitting] = useState(false)

//     const form = useForm<z.infer<typeof forgotPasswordSchema>>({
//         resolver: zodResolver(forgotPasswordSchema),
//         defaultValues: {
//             email: "",
//         },
//     })

//     const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
//         setIsSubmitting(true)
//         try {
//             // Replace with your API endpoint for forgot password
//             // await axios.post("/api/forgot-password", { email: data.email })
//             toast("If your email exists, a reset link has been sent.", {
//                 description: "Please check your inbox and spam folder.",
//             })
//             form.reset()
//         } catch (error) {
//             toast("Error", {
//                 description: "Something went wrong. Please try again later.",
//             })
//         } finally {
//             setIsSubmitting(false)
//         }
//     }

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-black">
//             <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7, ease: "easeOut" }}
//                 className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20"
//             >
//                 <div className="text-center">
//                     <h1 className="text-3xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
//                         Forgot Password
//                     </h1>
//                     <p className="text-gray-300 text-sm mb-4">
//                         Enter your email address and we'll send you a link to reset your password.
//                     </p>
//                 </div>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                         <FormField
//                             name="email"
//                             control={form.control}
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className="text-white">Email Address</FormLabel>
//                                     <Input
//                                         {...field}
//                                         type="email"
//                                         className="bg-[#1e293b] text-white border border-gray-700 focus:ring-purple-500"
//                                         placeholder="you@example.com"
//                                     />
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <Button
//                             type="submit"
//                             className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-xl shadow-md transition-all duration-300"
//                             disabled={isSubmitting}
//                         >
//                             {isSubmitting ? "Sending..." : "Send Reset Link"}
//                         </Button>
//                     </form>
//                 </Form>
//                 <div className="text-center mt-6">
//                     <Link href="/sign-in" className="text-purple-400 hover:underline text-sm">
//                         Back to Sign In
//                     </Link>
//                 </div>
//             </motion.div>
//         </div>
//     )
// }