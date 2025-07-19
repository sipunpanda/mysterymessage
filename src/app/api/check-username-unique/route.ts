import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import {  z } from "zod"
import { usernameValidation } from "@/Schemas/signUpSchema";


const UsernameQuerySchema = z.object({
    username: usernameValidation
})


export async function GET(request: Request) {

    if(request.method !== 'GET'){
        return Response.json({
            success: false,
            message: "Only GET request is allowed"
        },
            {
                status: 400
            })
       }
    

    await dbConnect()

    try {
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }

        const result = UsernameQuerySchema.safeParse(queryParam);
        console.log(result,"line34");

        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || []

            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(',') : 'Invalid query parameters',
            },{
                status: 400
            })

        }

        const {username} = result.data

       const existingVerifiedUser = await UserModel.findOne({username, isVerified:true})

       if(existingVerifiedUser){
        return Response.json({
            success: false,
            message: "Username is already taken"
        },
            {
                status: 500
            })
       }

       return Response.json({
            success: true,
            message: "Username is Unique"
        },
            {
                status: 500
            })

    } catch (error) {
        console.error("Error checking username", error);
        return Response.json({
            success: false,
            message: "Error checking username"
        },
            {
                status: 500
            })

    }
}