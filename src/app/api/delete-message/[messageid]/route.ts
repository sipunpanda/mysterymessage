import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { User } from "next-auth";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ messageid: string }> } // 👈 FIX
) {
  const { messageid } = await context.params; // 👈 FIX (await because it's a Promise)
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user as User & { _id: string };

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: "Not Authenticated" },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageid } } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Message not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message", error);
    return NextResponse.json(
      { success: false, message: "Error deleting message" },
      { status: 500 }
    );
  }
}




// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/options";
// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/user";
// import { User } from "next-auth";

// export async function DELETE(request:Request, {params}: {params: {messageid: string}}){
//     const messageId = params.messageid
//     await dbConnect();

//   const session = await getServerSession(authOptions)
//     const user: User = session?.user

//     if (!session || !session.user) {

//         return Response.json({
//             success: false,
//             message: "Not Authenticated"
//         },
//             {
//                 status: 401
//             })
//     }


//     try {
//       const updateResult =  await UserModel.updateOne(
//             {_id: user._id},
//             {$pull: {messages: {_id: messageId}}}
//         )
//         if (updateResult.modifiedCount === 0) {
//             return Response.json(
//                 {
//                     success:false,
//                     message: "Message not found or already deleted"
//                 },
//                 {
//                     status:404
//                 }
//             )
//         }
//         return Response.json(
//                 {
//                     success:true,
//                     message: "Message deleted successfully"
//                 },
//                 {
//                     status:200
//                 }
//             )
//     } catch (error) {
//         console.log("Error deleting message", error);
        
//           return Response.json(
//                 {
//                     success:false,
//                     message: "Error deleting message"
//                 },
//                 {
//                     status:500
//                 }
//             )
        
//     }


    
// }