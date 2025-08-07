'use client';

import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { useCompletion } from 'ai/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import * as z from 'zod';
import { ApiResponse } from '@/types/ApiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/Schemas/messageSchema';
import { toast } from 'sonner';

const specialChar = '||';
const parseStringMessages = (messageString: string): string[] =>
  messageString.split(specialChar);

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: '/api/suggest-messages',
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch('acceptMessages');
  const handleMessageClick = (message: string) =>
    form.setValue('acceptMessages', message);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast.success(response.data.message);
      form.reset({ ...form.getValues(), acceptMessages: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error('Error sending message', {
        description:
          axiosError.response?.data.message ?? 'Something went wrong!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    try {
      complete('');
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <div className="container mx-auto my-10 px-6 max-w-3xl  text-white animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
        Send Anonymous Message
      </h1>

      <div className="bg-zinc-900 p-6 rounded-xl shadow-lg shadow-pink-500/20 border border-zinc-800 transition-all duration-300">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="acceptMessages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-zinc-300">
                    Message for @{username}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous message here..."
                      className="resize-none bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-pink-500"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isLoading || !messageContent}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 shadow-md shadow-pink-500/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="my-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Suggested Messages</h2>
          <Button
            variant="outline"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            onClick={fetchSuggestedMessages}
            disabled={true || isSuggestLoading}
          >
            Generate Suggestions
          </Button>
        </div>
        <p className="text-sm text-pink-500 mb-4">
          Temporary: Suggestion button is disabled.
        </p>

        <Card className="bg-zinc-900 border border-zinc-800">
          <CardHeader>
            <h3 className="text-lg font-medium text-white">
              Click to select a message
            </h3>
          </CardHeader>
          <CardContent className="space-y-2">
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              parseStringMessages(completion).map((msg, i) => (
                <Button
                  key={i}
                  variant="outline"
                  onClick={() => handleMessageClick(msg)}
                  className="w-full border-zinc-700 text-left text-zinc-600 hover:bg-zinc-500 hover:text-white"
                >
                  {msg}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8 bg-zinc-700" />

      <div className="text-center space-y-4">
        <p className="text-white">Want to receive anonymous messages?</p>
        <Link href="/sign-up">
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 shadow-md shadow-purple-500/30">
            Create Your Account
          </Button>
        </Link>
      </div>
    </div>
  );
}
