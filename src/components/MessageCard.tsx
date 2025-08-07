// 'use client'
// import { Message } from '@/model/user';
// import { ApiResponse } from '@/types/ApiResponse';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';
// import { motion } from 'framer-motion';

// type MessageCardProps = {
//   message: Message;
//   onMessageDelete: (messageId: string) => void;
// };

// const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
//   const handleDeleteConfirm = async () => {
//     try {
//       const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);
//       toast.success(response.data.message, {
//         duration: 3000,
//         style: {
//           background: '#1f2937',
//           color: '#facc15',
//           border: '1px solid #facc15',
//         },
//         iconTheme: {
//           primary: '#facc15',
//           secondary: '#1f2937',
//         },
//       });
//       onMessageDelete(message._id as string);
//     } catch (error) {
//       toast.error("Failed to delete message", {
//         duration: 3000,
//         style: {
//           background: '#7f1d1d',
//           color: '#fff',
//           border: '1px solid #ef4444',
//         },
//       });
//     }
//   };

//   return (
//     <>

//       <motion.div
//         className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 space-y-2"
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <div className="text-gray-200">{message.content}</div>
//         <div className="text-xs text-gray-400">{new Date(message.createdAt).toLocaleString()}</div>
//         <button
//           onClick={handleDeleteConfirm}
//           className="text-red-400 hover:text-red-200 text-sm transition-colors "
//         >
//           Delete
//         </button>
//       </motion.div>
//     </>
//   );
// };

// export default MessageCard;






//this work ok
'use client'

import axios, { AxiosError } from 'axios';
// import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { Message } from '@/model/user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { ApiResponse } from '@/types/ApiResponse';
import { toast } from 'sonner';

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
console.log("MessageCard rendered with message:", message);


  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      toast(response.data.message);
      onMessageDelete(message._id);

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast('Error:',{

        description:
          axiosError.response?.data.message ?? 'Failed to delete message',
      });
    } 
  };

  return (
    <Card className="card-bordered">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{message.content}</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive'>
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm">
          
          {/* {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')} */}
           {new Date(message.createdAt).toLocaleString()}
        </div>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}












// 'use client'
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { Button } from "./ui/button"
// import { X } from "lucide-react"
// import { Message } from "@/model/user"
// import { toast } from "sonner"
// import axios from "axios"
// import { ApiResponse } from "@/types/ApiResponse"

// type MessageCardProps ={
//   message: Message,
//   onMessageDelete: (messageId: string) => void
// }

// const MessageCard = ({message, onMessageDelete}: MessageCardProps) => {

// const handleDeleteConfirm = async ()=>{
//  const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
 
//  toast(response.data.message)

//  onMessageDelete(message._id)

// }


//   return (
//    <Card>
//   <CardHeader>
//     <CardTitle>Card Title</CardTitle>


//     {/* alet box */}

//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <Button variant="destructive"><X className="w-5 h-5"/></Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//           <AlertDialogDescription>
//             This action cannot be undone. This will permanently delete your
//             account and remove your data from our servers.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Cancel</AlertDialogCancel>
//           <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>

    
//     <CardDescription>Card Description</CardDescription>
//     <CardAction>Card Action</CardAction>
//   </CardHeader>
//   <CardContent>
//     <p>Card Content</p>
//   </CardContent>
//   <CardFooter>
//     <p>Card Footer</p>
//   </CardFooter>
// </Card>
//   )
// }

// export default MessageCard