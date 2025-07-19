import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";


export async function POST(request: Request) {
    await dbConnect();

    try {
        const {username, code} = await request.json()
        
        const decodeUsername = decodeURIComponent(username)

        const user = await UserModel.findOne({username: decodeUsername})

        if(!user){
             return Response.json({
            success: false,
            message: "User not found"
        },
            {
                status: 400
            })

        }

const isCodeValid = user.verifyCode === code;
const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

if(isCodeNotExpired && isCodeValid){
    user.isVerified = true
    await user.save();
     return Response.json({
            success: true,
            message: "Account Verifying Successfully"
        },
            {
                status: 200
            })

}else if(!isCodeValid){
     return Response.json({
            success: false,
            message: "Invalid Code Provided!"
        },
            {
                status: 400
            })

}else{
     return Response.json({
            success: false,
            message: "Verification code Expired, Please signUp again"
        },
            {
                status: 500
            })

}
        
    }  catch (error) {
        console.error("Error Verifying User", error);
        return Response.json({
            success: false,
            message: "Error Verifying User"
        },
            {
                status: 500
            })

    }
}