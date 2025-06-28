import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../model/userSchema.js";
import jwt from "jsonwebtoken"

export const signupController= async(req,res)=>{
    try {
        const{name,email,password}=req.body;
       
       const existingUser= await userModel.findOne({email})
       console.log(existingUser)
        if(existingUser)
        {
           return  res.status(402).send({
            message:"user already exists",
            success:false
           })
       
           
        }
        const hashedPassword= await hashPassword(password);
        console.log(hashedPassword)
    const user= await new userModel({
        name:name,
        email:email,
        password:hashedPassword
        }).save()
        if(!user) res.status(400).send("Unbale to create new user")

            res.status(200).send({
                success:true,
                message:"Succesfully created new  user",
                user,
            }) 
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Unable to create new user",
            error,
        })
    }
}

function  refreshTokenGen(user){
    
     return jwt.sign({user},process.env.REFRESH_SECRET,{expiresIn:'30d'})
      
}
function  accessTokenGen(user){
     return jwt.sign({user},process.env.ACCESS_SECRET,{expiresIn:'15m'})
    
}


export const loginController= async(req,res)=>{
    try {
   
        const {email,password,confirmPassword} =req.body;
        if(password!=confirmPassword)
        {
           return res.status(404).send("password mismatch")
        }
        
        const user= await userModel.findOne({email});
        if(!user)
        {
           return res.status(404).send("unbale to find the user")
        }

        const match= await comparePassword(password,user.password)
        if(!match)
        {
            return res.status(404).send("Password is incorrect")
        }  
            const refreshTokentoken=await refreshTokenGen(user);
            const access_Tokentoken= await accessTokenGen(user);
            res.cookie('refreshToken',refreshTokentoken,{
                httpOnly:true,
                secure:true,
                sameSite:'Strict',
                path:'/api/refresh',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
                    })
            res.status(200).send({user,access_Tokentoken})
        
    } catch (error) {
        console.log(error)
    }
}






export const getAllusers= async (req,res)=>{
    try {
            const users= await userModel.find();
            if(!users)
            {
                console.log("Unbale to fetch all users");
            }
            res.status(201).send(users)

    } catch (error) {
        console.log(error)
    }
}