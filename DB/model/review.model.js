import {model,Schema,Types} from "mongoose"



const reviewSchema= new Schema({


text:{type:String,
 required:[true,"massage is required"],

},


userId:{
    type:Types.ObjectId,
    ref:"User",
    required:true
},


status:{
    type:String,
    default:"plased",
    enum:['plased','onway','recevied']
    
},
productId:{
    type:Types.ObjectId,
    ref:"product",
    required:true
},
rating:{
    type:String,
    min:[1,"min is 1"],
    max:[5,"max is 5"],
    required:true
}
}) 

const reviewModel= model("review",reviewSchema)
export default reviewModel