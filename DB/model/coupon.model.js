

import {model,Schema,Types} from "mongoose"



const couponSchema= new Schema({


name:{type:String,
    required:[true,"name is required"],
    unique:true,
    max:[20,"max length 20"],
    min:[2,"min length 2"],
    trim:true

},
image:{type:String},
imagepublicId:String,

createdby:{
    type:Types.ObjectId,
    ref:"User",
    required:true
},
updatedby:{
    type:Types.ObjectId,
    ref:"User",
},

amount:{
type:Number,
default:1,
max:[100,"max 100%"],
min:[2,"min 1%"],
},

usedBy:[{
    type:Types.ObjectId,
    ref:"User",
}],


expireDate:String,



},{
    timestamps: true,

})

const couponModel= model("coupon",couponSchema)
export default couponModel