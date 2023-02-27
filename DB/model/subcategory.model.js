import { Schema, model,Types } from "mongoose";


const subcategorySchema = new Schema({

    name: {
        type: String,
        required: [true,"name is required "],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char'],
        unique:[true,"category name must be unique"]

    },
    imagepubilcId:String,
    slug:String,
   
    Createdby: {
        type: Types.ObjectId,
        ref:"User",
        required: true,
    },
    updatedby: {
        type: Types.ObjectId,
        ref:"User",
        
    },
    image: String,
    categoryId:{

        type:Types.ObjectId,
        ref:"category",
        required:true,
    }
  
}, {
    timestamps: true
})


const subCategorymodel = model('subcategory', subcategorySchema)
export default subCategorymodel