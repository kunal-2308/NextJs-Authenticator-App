import { connect } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs, { genSalt } from 'bcryptjs'

connect();

export const POST = async(request) =>{
    try {
        const reqBody = await request.json();
        const{userName,email,password} = reqBody;

        //find the user if he exists:
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json(
                {message:'User already exists'},
                {status:500}
            );
        }

       //hash the password:
       const salt = await bcryptjs.genSalt(10);
       const hashedPassword = await bcryptjs.hash(password,salt);

       const newUser = new User({
        userName,
        email,
        password:hashedPassword
       });

      let savedUser =  await newUser.save();

       return NextResponse.json({
        messaege:"New user created successfully"
       },
       {status:200},savedUser);


    } catch (error) {
        return NextResponse.json({error:error.message},{status:500});
    }
}