import { comparePassword, hashedPassword } from "../helpers/authHelpers.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'

export const registerController = async (req, res) => {
    try {
        const { name, password, email } = req.body;

        if (!name) {
            return res.send("Enter the Name");
        }
        if (!password) {
            return res.send("Enter the Password");
        }
        if (!email) {
            return res.send("Enter the Email");
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.send("Already Registered User");
        }

        const hashedPass = await hashedPassword(password);

        const registerUser = await userModel.create({
            name,
            email,
            password: hashedPass
        });

        return res.send("Register Success");

    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong");
    }
};

export const loginController =async(req,res)=>{
    try {
        const {email,password}=req.body

        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
            const user= await userModel.findOne({email})
            if(!user){
                return res.status(404).send({
                    success:false,
                    message:"Email is not registered"
                })
            }
            const match=await comparePassword(password,user.password)
            if(!match){
                return res.status(404).send({
                    success:false,
                    message:"Invalid Password"
                })
            }

            const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

            res.status(200).send({
                success:true,
                message:'login succsess',
                users:{
                    name:user.name,
                    email:user.email,
                },
                token
            })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
        
    }

}

export const testController=(req,res)=>{
    res.send("Protected Route")
}