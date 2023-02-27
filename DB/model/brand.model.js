import {model,Schema,Types} from "mongoose"



const brandSchema= new Schema({


name:{type:String,
    required:[true,"name is required"],
    unique:true

},
logopic:{type:String,required:true},
imagepublicId:{type:String,required:true},

addedby:{
    type:Types.ObjectId,
    ref:"User",
    required:true
},
updatedby:{
    type:Types.ObjectId,
    ref:"User",
}
}) 

const brandModel= model("Brand",brandSchema)
export default brandModel