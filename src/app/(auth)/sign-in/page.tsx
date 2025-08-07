"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signInSchema } from "@/Schemas/signInSchema"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"


const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    const res = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })

    if (res?.error) {
      toast("Login Failed", {
        description: res?.error,
      })
    }

    if (res?.url) {
      router.replace('/dashboard')
    }
  }
  setIsSubmitting(false)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-black">

  {/* Background Anonymous Logo */}
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="/anonymous-bg.jpg" // Add your anonymous logo here (place in /public folder)
          alt="Anonymous Logo"
          className="w-full h-full object-cover"
        />
      </div>


         <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md p-6 space-y-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20"
      >        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            True Feedback 🔥
          </h1>
          <p className="text-gray-300 text-sm">
             Sign in to start your anonymous experience.
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email / Username</FormLabel>
                  <Input
                    {...field}
                    className="bg-[#1e293b] text-white border border-gray-700 focus:ring-purple-500"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <Input
                    type="password"
                    {...field}
                    className="bg-[#1e293b] text-white border border-gray-700 focus:ring-purple-500"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-xl shadow-md transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Form>
{/* 
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Forgot password?{" "}
            <Link href="/forgot-password" className="text-purple-400 hover:underline">
              Reset Password
            </Link>
          </p>
        </div> */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Not a member?{" "}
            <Link href="/sign-up" className="text-purple-400 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Page;
