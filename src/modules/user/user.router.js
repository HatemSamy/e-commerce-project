import { Router } from "express";
import {auth, role } from "../../middleware/auth.js";
import { findusers } from "./controller/user.js";
const router = Router()




router.get('/',auth(role.User) ,(req ,res)=>{
    res.status(200).json({message:"User Module",user:req.user})
})

router.get('/user',findusers)




export default router