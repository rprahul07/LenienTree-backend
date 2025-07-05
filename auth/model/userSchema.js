import mongoose  from "mongoose"
import validator from "validator";



const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
       type:String,
        required:true,
        validate(value){
            if (!validator.isEmail(value))
            {
                throw new Error(" the value need to be an email");
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:7,
        trim:true,
        unique:true,
    }

},{timestamps:true})

const userModel=mongoose.model("users",userSchema)

export default userModel;


