import { Schema, model,Types } from "mongoose";


const cartSchema = new Schema({

    userId: {
        type: Types.ObjectId,
        required: [true,"userId is required "],
        unique:[true,"one cart per each user"]

    },
  
   
    products: [{
        productId:
       { 
        type: Types.ObjectId,
        ref:"product",
        required: true,
    },
      quantity:{
        type :Number,
        default:1  
        }
    }],
   
}, {
    timestamps: true,
   

})



const cartmodel = model('Cart', cartSchema)
export default cartmodel