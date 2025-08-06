'use client'

import { MessageCard } from '@/components/MessageCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Message } from '@/model/user'
import { acceptMessageSchema } from '@/Schemas/accceptMessageSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2, RefreshCcw } from 'lucide-react'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const Page = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }

  const { data: session } = useSession()

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  })

  const { register, watch, setValue } = form
  const acceptMessages = watch('acceptMessages')

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get('/api/accept-messages')
      setValue('acceptMessages', response.data?.isAcceptingMessages)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || "Failed to fetch message settings")
    } finally {
      setIsSwitchLoading(false)
    }
  }, [setValue])

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages')
      setMessages(response.data.messages || [])
      if (refresh) {
        toast.success("🔄 Latest messages loaded.")
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || "Failed to fetch messages")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!session || !session.user) return
    fetchMessages()
    fetchAcceptMessages()
  }, [session, fetchMessages, fetchAcceptMessages])

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessages,
      })
      setValue('acceptMessages', !acceptMessages)
      toast.success(response.data.message)
      fetchAcceptMessages()
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || "Update failed")
    }
  }

  const user: User = session?.user
  const username = user?.username

  const baseUrl =
    typeof window !== 'undefined'
      ? `${window.location.protocol}//${window.location.host}`
      : ''
  const profileUrl = `${baseUrl}/u/${username}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast.success('✅ Profile link copied to clipboard!')
  }

  if (!session || !session.user) {
    return <div className="text-center mt-20 text-white">Please Login</div>
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gradient-to-br from-[#1e1e2f] via-[#2b2c3b] to-[#1e1e2f] px-4 py-12">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-6 text-center animate-fade-in">
          Dashboard
        </h1>

        <div className="mb-6 space-y-2">
          <h2 className="text-lg text-white font-semibold">Your Shareable Link</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="w-full p-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none"
            />
            <Button variant="secondary" onClick={copyToClipboard}>
              Copy
            </Button>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <Switch
            {...register('acceptMessages')}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span className="ml-3 text-white text-sm">
            Accept Messages:{' '}
            <span
              className={`font-semibold ${
                acceptMessages ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {acceptMessages ? 'On' : 'Off'}
            </span>
          </span>
        </div>

        <Separator className="mb-6 bg-white/20" />

        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault()
              fetchMessages(true)
            }}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard
                key={message._id}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p className="text-white text-sm">No messages to display.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
