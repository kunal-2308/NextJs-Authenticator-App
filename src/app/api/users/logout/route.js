import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const GET = async () => {
  try {
     const cookieStore = cookies();
    cookieStore.delete('token');

    return NextResponse.json({
      message: "Logout successful",
      success: true,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
};
