import mongoose, { Schema, Document } from "mongoose"
import { Interface } from "readline";


export interface Message extends Document{
    _id: string,
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default:Date.now
    }
})


export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        trim:true,
        unique: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        trim:true,
        unique: true,
        match:[/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/, "Please use a Valid Email"]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode:{
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry:{
        type: Date,
        required: true,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    messages: [MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema))

export default UserModel