import { Schema, model,Types } from "mongoose";


const orderSchema = new Schema({

    userId: {
        type: Types.ObjectId,
        required: [true,"userId is required "],

    },
    paymentmethod:{
      type:String,
      enum:["cach","visa"],
      default:"cach"

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
        },
        totalprice:{
            type:Number,
            default:1

        }
    }],
    finalprice:{
        type:Number,
        document:0

    },
    unitprice:{
        type:Number
    },
    adderss:{
        type:String,
        required:[true,"adderssis require"]
    },
    phone:{ type:String,
    required:[true,"phone is  require"]},

    couponId:{
    type:Types.ObjectId,
    ref:"coupon",
    },
    status:{
       type:String,
       default:"placed",
      enum:["received","rejected","onway","placed"]
    }

   
}, {
    timestamps: true,
   

})
const orderModel = model('order', orderSchema)
export default orderModel