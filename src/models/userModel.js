import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Please provide an username"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Please provide an password"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide an password"]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }, 
    forgetPasswordToken: String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    VerifyTokenExpiry:Date,
});

const User = mongoose.models.users || mongoose.model('User',userSchema);

export default User;