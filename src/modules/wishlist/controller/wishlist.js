import { findByIdAndDelete, findByIdAndUpdate } from "../../../../DB/DBMethods.js";
import userModel from "../../../../DB/model/User.model.js";
import { asynchandiler } from "../../../services/errorHandling.js";



export const add= asynchandiler(

async(req,res,next)=>{

 const {productId}=req.params
  
 const wishlist= await findByIdAndUpdate({
    model:userModel,
    filter:{_id:req.user._id},
    data:{ $addToSet: {wishlist: productId}}

 })

 return res.json({massage:"wishlist done",wishlist})


}
)
export const remove= asynchandiler(

    async(req,res,next)=>{
    
     const {productId}=req.params
      
     const wishlist= await findByIdAndUpdate({
        model:userModel,
        filter:{_id:req.user._id},
        data:{$pull: {wishlist: productId }}
    
    
     })
    
     return res.json({massage:"wishlist removed",wishlist})
    
    
    }
    









)