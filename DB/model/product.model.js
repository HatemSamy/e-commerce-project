
import { Schema, model,Types } from "mongoose";


const productSchema = new Schema({

    name: {
        type: String,
        required: [true,"name is required "],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char'],
        trim:true
        
    },
    
    slug:String,
    description:{
       type:String
    },

     stock:{
      type:Number,
      default:0

     },
     price:{
        type:Number,
        default:0
  
     },

       discount:{
        type:Number,
        default:0
  
     },
    price:{
        type:Number,
        default:0
  
     },
     finalprice:{
        type:Number,
        default:0
  
     },
     colors:{
       type:[String],


     }, 
     size:{
        type:[String],
        enum:["s","m","l","xl"]
 
     },
     amount:{
        type:Number,
        default:0
 
     },
     soldItem:{
        type:Number,
        default:0
     },


      images: [String],
      slug:String,
    coverimage:String,
    imagepublicIds:[String],

    CategoryId: {
        type: Types.ObjectId,
        ref:"category",
        required: true,
    },
    subCategoryId: {
        type: Types.ObjectId,
        ref:"subcategory",
        
    },

    BrandId: {
        type: Types.ObjectId,
        ref:"Brand",
        required: true,
    },

   
    Createdby: {
        type: Types.ObjectId,
        ref:"User",
        required: true,
    },
    updatedby: {
        type: Types.ObjectId,
        ref:"User",
        
    },
  
}, {
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtual:true},

})

productSchema.virtual("Review",{
ref:"review",
localField:"_id",
foreignField:"productId"
}
)



const productModel = model('product', productSchema)
export default productModel