import connectDB from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

connectDB();

export const POST = async (request) => {
  try {
    let body = await request.json();
    const { email, password } = body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    // Check password
    const verifiedPassword = await bcryptjs.compare(password, user.password);
    if (!verifiedPassword) {
      return NextResponse.json({
        message: "Incorrect Password",
        status: 400,
      });
    }

    // Create JWT token
    const tokenData = {
      id: user._id,
      userName: user.userName,
      email: user.email, // Make sure you return the email as well
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1d' });

    // Prepare response
    const response = NextResponse.json({
      message: "Login Successful",
      status: 200,
    });

    // Set the token in cookies
    response.cookies.set('token', token, { httpOnly: true });

    return response;

  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
};
