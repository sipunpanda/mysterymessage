import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { Message } from "@/model/user";

export async function POST(request: Request) {
    await dbConnect()

    const { acceptMessages, username } = await request.json()

    try {
        const user = await UserModel.findOne({ username })
        console.log("User found", user);
        console.log("content found", acceptMessages);
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 404
                }
            )
        }
        if (!user.isAcceptingMessage) {
            return Response.json(
                {
                    success: false,
                    message: "User is not Accepting Messages"
                },
                {
                    status: 403
                }
            )
        }

        const newMessage = { content: acceptMessages, createdAt: new Date() }

        user.messages.push(newMessage as Message)
        await user.save()
        return Response.json(
            {
                success: true,
                message: "Message sent successfully"
            },
            {
                status: 200
            }
        )


    } catch (error) {
        console.log("An unExpected Error Occured", error);

        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            },
            {
                status: 500
            }
        )
    }
}