import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectDB from "@/dbConfig/dbConfig";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/userModel";
connectDB();

export const GET = async(request)=>{
    try {
          const _id = await getDataFromToken(request);
          const user = await User.findById(_id,{userName:1,email:1});
        return NextResponse.json({
            message:"User details fetched successfully",
            user,
            status:500
        });

    } catch (error) {
        return NextResponse.json({
            message:error.message,
            status:500
        })
    }
}