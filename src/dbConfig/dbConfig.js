import mongoose from "mongoose";

export const Connect = async() =>{
    try {
        let connect = await mongoose.connect(process.env.MONGO_URI);
        if(connect){
            console.log('Connect Successfull To DB');
        }
    } catch (error) {
        console.log('Something went wrong');
        console.log(error);
    }
}

