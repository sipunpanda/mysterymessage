import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if (!session || !session.user) {

        return Response.json({
            success: false,
            message: "Not Authenticated"
        },
            {
                status: 401
            })
    }

    const userId = user._id

    const { acceptMessages } = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId,
            { isAcceptingMessage: acceptMessages },
            { new: true }
        )
        if (!updatedUser) {

            return Response.json({
                success: false,
                message: "Failed to update user status message acceptance"
            },
                {
                    status: 401
                })
        }

         return Response.json({
            success: true,
            message: "Successfully update user status acceptance"
        },
            {
                status: 200
            })

    } catch (error) {
        console.log(
            "Failed to update user status to accept messages"
        );

        return Response.json({
            success: false,
            message: "Failed to update user status to accept messages"
        },
            {
                status: 500
            })


    }

}

export async function GET(request:Request){
     await dbConnect();

    const session = await getServerSession(authOptions)
    const user: User = session?.user

    if (!session || !session.user) {

        return Response.json({
            success: false,
            message: "Not Authenticated"
        },
            {
                status: 401
            })
    }

    const userId = user._id

    try {
         const foundUser = await UserModel.findByIdAndUpdate(userId)
        if (!foundUser) {

            return Response.json({
                success: false,
                message: "Failed to fetch message acceptance status"
            },
                {
                    status: 401
                })
        }

         return Response.json({
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessage,
            message: "Successfully fetched message acceptance status"
        },
            {
                status: 200
            })

        
    } catch (error) {
        console.log(
            "Failed to fetch message acceptance status"
        );

        return Response.json({
            success: false,
            message: "Failed to fetch message acceptance status"
        },
            {
                status: 500
            })


    }

}