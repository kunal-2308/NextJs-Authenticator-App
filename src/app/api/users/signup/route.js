import connectDB from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

// Connect to the database
connectDB();

export const POST = async (request) => {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { userName, email, password } = reqBody;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create and save the new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        message: "New user created successfully",
        user: {
          id: savedUser._id,
          userName: savedUser.userName,
          email: savedUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
};
