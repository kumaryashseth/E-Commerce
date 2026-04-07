import express from 'express'
import  {registerController,loginController,testController} from "../controllers/authController.js";
import { isAdmin,requireSignIn } from '../middlewares/authmiddleware.js';


const router=express.Router()


router.post('/register',registerController)
router.post('/login',loginController)
router.post('/test',requireSignIn,isAdmin,testController)

export default router;