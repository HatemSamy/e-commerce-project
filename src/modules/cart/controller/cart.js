import { create, findOne, findOneAndUpdate } from "../../../../DB/DBMethods.js";
import cartmodel from "../../../../DB/model/cart.model.js";
import { asynchandiler } from "../../../services/errorHandling.js";

export const addtoCart= asynchandiler(

 async(req,res,next)=>{

    const {products}=req.body
    const {_id}=req.user._id
   
    const findcart= await findOne({model:cartmodel,filter:{userId:_id}})
    
      if (!findcart) {
         const cart = await create({model:cartmodel,data:{userId:_id,products}})

         return res.status(200).json({massage:"cart created", cart})

      }
      for (const product of products) {
        let match = false
        for (let i = 0; i < findcart.products.length; i++) {
            if (product.productId==findcart.products[i].productId.toString()) {
                findcart.products[i]= product
               match =true
               break;

            
            }
         }
         if (!match) {
            findcart.products.push(product)
        }
      }
 const addproduct= await findOneAndUpdate({model:cartmodel,
    filter:{userId:_id},

     data:{products:findcart.products},
     options:{new:true}

})

return res.status(200).json({massage:" done product added and your cart is created",addproduct})
 }


    

)