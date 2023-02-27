import { find } from "../../../../DB/DBMethods.js"
import userModel from "../../../../DB/model/User.model.js"
import { pagination } from "../../../services/pagination.js";

 export const  findusers =async(req,res)=>{
    const {page,size}=req.body
     const {skip,limit} =pagination(page,size)
     const user =await find({model:userModel,skip:skip,limit:limit,select:"email userName wishlist"})
 
     res.status(200).json({message:"User pagenate",user})
 

 }