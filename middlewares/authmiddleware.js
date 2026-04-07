import JWT from 'jsonwebtoken'
import userModel from "../models/userModel.js";

export const requireSignIn= async (req,res,next) => {
    try {
        const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user=decode
        next()
    } catch (error) {
        console.log(error);
        
    }
}

export const isAdmin= async (req,res,next) => {
    try {
        console.log("req.user:",req.user);
        const user=await userModel.findById(req.user._id)
        console.log("DB user:", user);
        
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }    
        if(user.role!==1){
            return res.status(403).send({
                success:false,
                message:"Not an admin"
            })
        }
        else{
            next()
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in Admin Middleware"
        })
    }
}