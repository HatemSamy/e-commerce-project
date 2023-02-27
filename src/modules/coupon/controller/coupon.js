import { create, findOne, findOneAndDelete, findOneAndUpdate } from "../../../../DB/DBMethods.js";
import couponModel from "../../../../DB/model/coupon.model.js";
import { asynchandiler } from "../../../services/errorHandling.js";


export const createcoupon= asynchandiler(
     async(req,res,next)=>{

        const findcoupon = await findOne({model:couponModel,filter:{name:req.body.name}})

          if (findcoupon) {
             return next(new Error("coupon name must be uniqe",{casue:400}))
          }
          req.body.createdby = req.user._id

        const coupon = await create({model:couponModel,data:req.body})

          return res.json({massage:"done",coupon})

     }
    )

    export const updatecoupon= asynchandiler(
      async(req,res,next)=>{
        const {id}=req.params
        req.body.updatedby = req.user._id
         const updatecoupon = await findOneAndUpdate({model:couponModel,
          filter:{_id:id},
          data:req.body,
          options:{new:true}
        })

         return updatecoupon? res.json({massage:"done coupon updated",updatecoupon}) : next(new Error("in-valid coupon"))
 
      }
     )

     export const deletecoupon= asynchandiler(
      async(req,res,next)=>{
        const {id}=req.params
        
         const deletecoupon = await findOneAndDelete({model:couponModel,
          filter:{_id:id},
        })

         return deletecoupon? res.json({massage:"done coupon deleted",deletecoupon}) : next(new Error("in-valid coupon"))
 
      }
     )









