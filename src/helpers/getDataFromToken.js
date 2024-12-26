import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request)=>{
    try {
        const token = request.cookies.get('token')?.value || '';
        let tokenData = jwt.verify(token,process.env.TOKEN_SECRET);
        return tokenData.id;
    } catch (error) {
       console.log(error);
    }

}