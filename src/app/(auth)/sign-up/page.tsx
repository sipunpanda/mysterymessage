"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/Schemas/signUpSchema"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';
import { motion } from "framer-motion"

const Page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)

  const debouncedUsername = useDebounceCallback(setUsername, 300)
  // toast("Event has been created.")
  const router = useRouter()

  //zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }

  })

  useEffect(() => {
    
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true)
        // setUsername('')
        try {
          console.log("line47",debouncedUsername);
          
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          console.log("inline 48",response);
          
          setUsernameMessage(response.data.message)
          
        } catch (error) {
          console.log("axios error", error);
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(axiosError.response?.data.message ?? "Error checking Username")

        } finally {
          setIsCheckingUsername(false)
        }
      }
    }

    checkUsernameUnique()
  }, [username])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)

    try {
      console.log("jjj1", username);
      const response = await axios.post<ApiResponse>('/api/sign-up', data)
      console.log("jjj2", username);
      
      toast("Success", {
        description: response.data.message
      })

      
      router.replace(`/verify/${username}`)
      setIsSubmitting(false)

    } catch (error) {
      console.log("Error in SignUp of User", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message

      toast("SignUp Failed", {
        description: errorMessage,
      })

      setIsSubmitting(false)
    }
  }

return (
  <div className="flex justify-center items-center min-h-screen bg-gray-900 px-4">
   <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20"
      >        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Join True Feedback
          </h1>
          <p className="text-gray-300 text-sm">
            Sign up to start your anonymous adventure
          </p>
        </motion.div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    debouncedUsername(e.target.value);
                  }}
                  className="bg-gray-800 text-white border-gray-600"
                />
                {isCheckingUsername && <Loader2 className="animate-spin text-white mt-1" />}
                {!isCheckingUsername && usernameMessage && (
                  <p
                    className={`text-sm mt-1 ${
                      usernameMessage === 'Username is unique'
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {usernameMessage}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <Input
                  {...field}
                  className="bg-gray-800 text-white border-gray-600"
                />
                <p className="text-gray-400 text-xs mt-1">
                  We will send you a verification code
                </p>
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
                  className="bg-gray-800 text-white border-gray-600"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">
          Already a member?{' '}
          <Link href="/sign-in" className="text-blue-400 hover:text-blue-500 underline">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  </div>
);


}

export default Page;