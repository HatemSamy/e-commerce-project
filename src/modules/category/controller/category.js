import { model } from "mongoose";
import { create, find, findById, findByIdAndDelete, findByIdAndUpdate } from "../../../../DB/DBMethods.js";
import categorymodel from "../../../../DB/model/category.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { asynchandiler } from "../../../services/errorHandling.js";
import slugify from "slugify"
import { pagination } from "../../../services/pagination.js";

export const createCategory = asynchandiler(

    async (req, res, next) => {
        if (!req.file) {
          return  next(new Error("image is requierd", { cause: 400 }))
        } else {



            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: "onlineEcommerce/categories" })
            const { name } = req.body
            const category = await create({
                model: categorymodel,
                data: {

                    name,
                    image: secure_url,
                    slug: slugify(name),
                    imagepubilcId: public_id,
                    Createdby: req.user._id

                }
            })

          return  category ?  res.json({ massage: "done", category }) : next(new Error("fill to add", { cause: 400 }))
        }


    }

)

export const updateCategory = asynchandiler(

    async (req, res, next) => {
        const { id } = req.params
        if (req.file) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,
                { folder: "online Ecommerce/categories" })

            req.body.image = secure_url
            req.body.imagepubilcId = public_id
        }
        if (req.body.name) {
            req.body.slug = slugify(req.body.name)
        }
         req.body.updatedby=req.user._id
        const category = await findByIdAndUpdate({
            model: categorymodel, filter: { _id: id },
            data: req.body,
            options: { new: false }


        })
        if (req.file) {
            await cloudinary.uploader.destroy(category.imagepubilcId)

        }
      return  category ? res.json({ massage: "done", category }) : next(new Error("fill to update", { cause: 400 }))

    }




)


export const findCategory = asynchandiler(

    async (req, res, next) => {
        const{page,size}=req.query
       const{skip,limit}=pagination(page,size)
       const categories= await find({model:categorymodel,populate:[{
        path:"Createdby",
        select:"userName email"
       },
    {
        path:"updatedby",
        select:"userName email"

    },
    {
        path:"Subcategory"
    }
    
    
    ],
 skip,
 limit
})
 
 res.json({ massage: "done", categories }) 
        


})


export const specialCategory = asynchandiler(

    async (req, res, next) => {
      
      
       const categories= await findById({model:categorymodel,filter:req.params.id,populate:[{
        path:"Createdby",
        select:"userName email"
       },
    {
        path:"updatedby",
        select:"userName email"

    }
    
    
    
    
    ],
 
})
 
  return res.json({ massage: "done", categories }) 
        


})

