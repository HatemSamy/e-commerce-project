import { create, findByIdAndUpdate, findOne } from "../../../../DB/DBMethods.js";
import couponModel from "../../../../DB/model/coupon.model.js";
import orderModel from "../../../../DB/model/order.model.js";
import productModel from "../../../../DB/model/product.model.js";
import { asynchandiler } from "../../../services/errorHandling.js";

 export const addorder=asynchandiler(

 async(req,res,next)=>{
   
    const{couponId,products}=req.body
         let sumTotal=0;
         const finallist=[]
        for (let i = 0; i < products.length; i++) {
            const checkproduct= await findOne({model:productModel,filter:{_id:products[i].productId,stock:{$gte:products[i].quantity}}})
            if (!checkproduct) {
                return next(new Error("in valid place order",{casue:409})) 
                
            }
            products[i].totalprice= (checkproduct.finalprice * products[i].quantity)
            sumTotal+= products[i].totalprice
            finallist.push(products[i])
            
            req.body.unitprice= checkproduct.finalprice
        }
        req.body.finalprice=sumTotal
       
         if (couponId) {
            const checkcoupon= await findOne({model:couponModel,filter:{
                _id:couponId,usedBy:{$nin:req.user._id}
            }}) 

            if (!checkcoupon) {
                return next (new Error("in-valid coupon",{cause:409}))
             }
             req.body.finalprice= sumTotal - (sumTotal*(checkcoupon.amount/100))

         }
         req.body.userId=req.user._id

        const order = await create({model: orderModel,data:req.body})
           req.body.userId= req.user._id

          req.body.products=finallist
        if (order) {
            if (couponId) {
                const updateCoupon= await findByIdAndUpdate({model:couponModel,filter:{_id:couponId},data:{

                    $addToSet: { usedBy:req.user._id} 
               }})
                 return res.status(200).json({massage:'order done',order})
    
            } 
            
         return res.status(200).json({massage:'order done',order})

        } else {
           return next (new Error("fill to add order",{cause:404}))
            
        }
 }

 )