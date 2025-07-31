"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signInSchema } from "@/Schemas/signInSchema"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';
import { signIn } from "next-auth/react"


const page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  toast("Event has been created.")
  const router = useRouter()

  //zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }

  })



  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
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
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} name="email/username" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full' disabled={isSubmitting}>
             Signin
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member? Create an Account{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;