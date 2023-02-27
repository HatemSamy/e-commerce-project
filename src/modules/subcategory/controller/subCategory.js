import slugify from "slugify"
import { create, find, findById, findOneAndUpdate } from "../../../../DB/DBMethods.js";
import categorymodel from "../../../../DB/model/category.model.js";
import subCategorymodel from "../../../../DB/model/subcategory.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { asynchandiler } from "../../../services/errorHandling.js";
import { pagination } from "../../../services/pagination.js";

export const createsubCategory = asynchandiler(

    async (req, res, next) => {
        if (!req.file) {
         return   next(new Error("image is requierd", { cause: 400 }))
        } else {
            const { categoryId } = req.params
            console.log(categoryId);
            const category = await findById({ model: categorymodel, filter: categoryId })

            if (!category) {
                return  next(new Error("fill to find main caregory", { cause: 400 }))
            } else {

                const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `online Ecommerce/categories/${category._id}` })
                const { name } = req.body
                const subCategory = await create({
                    model: subCategorymodel,
                    data: {

                        name,
                        image: secure_url,
                        slug: slugify(name),
                        imagepubilcId: public_id,
                        Createdby: req.user._id,
                        categoryId: category._id
                    }
                })
                subCategory ? res.json({ massage: "done", subCategory }) : next(new Error("fill to add", { cause: 400 }))

            }

        }


    }

)

export const updatesubCategory = asynchandiler(

    async (req, res, next) => {
        const { categoryId, id } = req.params
        console.log(categoryId, id);
        if (req.file) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,
                { folder: `online Ecommerce/categories/${categoryId}` })

            req.body.image = secure_url
            req.body.imagepubilcId = public_id
        }
        if (req.body.name) {
            req.body.slug = slugify(req.body.name)
        }
        req.body.updatedby = req.user._id
        const subCategory = await findOneAndUpdate({
            model: subCategorymodel, filter: { categoryId, _id: id },
            data: req.body,
            options: { new: false }


        })

        res.json({ massage: "done", subCategory })

        if (subCategory) {
            if (req.file) {
                await cloudinary.uploader.destroy(subCategory.imagepubilcId)
                res.json({ massage: "done", subCategory })
            }

        } else {
            await cloudinary.uploader.destroy(req.body.imagepubilcId)

            return next(new Error("fill to update", { cause: 400 }))

        }

    }




)


export const findsubCategory = asynchandiler(

    async (req, res, next) => {
        const { page, size } = req.query
        const { skip, limit } = pagination(page, size)
        const subcategories = await find({
            model: subCategorymodel, populate: [{
                path: "Createdby",
                select: "userName email"
            },
            {
                path: "updatedby",
                select: "userName email"

            }




            ],
            skip,
            limit
        })

        return res.json({ massage: "done", subcategories })



    })


export const specialCategory = asynchandiler(

    async (req, res, next) => {
        const subcategories = await findById({
            model: subCategorymodel, filter: {_id:req.params.id}, populate: [{
                path: "Createdby",
                select: "userName email"
            },
            {
                path: "updatedby",
                select: "userName email"

            }




            ],

        })

        return res.json({ massage: "done", subcategories })



    })

