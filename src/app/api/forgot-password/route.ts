import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { email } = await request.json();

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user || !user.isVerified) {
            return NextResponse.json(
                { success: false, message: "Email not found or not verified." },
                { status: 200 }
            );
        }

        // Generate a reset token (for demo, use a random string)
        const resetToken = Math.random().toString(36).substr(2);
        // Save token to user (in production, save with expiry)
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email (configure your SMTP in production)
        const transporter = nodemailer.createTransport({
            // Use your SMTP config here
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
        await transporter.sendMail({
            to: email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
        });

        return NextResponse.json(
            { success: true, message: "If your email exists, a reset link has been sent." },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}