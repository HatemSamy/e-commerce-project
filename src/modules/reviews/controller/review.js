import { create, findOne } from "../../../../DB/DBMethods.js"
import orderModel from "../../../../DB/model/order.model.js"
import reviewModel from "../../../../DB/model/review.model.js"
import { asynchandiler } from "../../../services/errorHandling.js"


export const addreview=asynchandiler(
   async (req,res,next)=>{

        const {_id}=req.user._id
        const {productId}=req.params
         const {text,rating}=req.body
         const checkreview= await findOne({model:reviewModel,filter:{
            userId:_id,productId
         }})

         if (checkreview) {
            return next ( new Error("you are aready review"))
         } 
            const order= await findOne({model:orderModel,filter:{userId:_id,"products.productId":productId,status:"recevied"}})
         if (!order) {
            return next (new Error("you are not buy this order"))
            
         }
          const review= await create({model:reviewModel,data:{
            userId:_id,
            productId,
            text ,
            rating

          }})
          return res.status(200).json({massage:"done",review})
    
    
    
    
    
    }
)