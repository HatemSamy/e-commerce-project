
import { create, find, findById, findByIdAndDelete, findByIdAndUpdate } from "../../../../DB/DBMethods.js";
import categorymodel from "../../../../DB/model/category.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { asynchandiler } from "../../../services/errorHandling.js";
import slugify from "slugify"
import { pagination } from "../../../services/pagination.js";
import brandModel from "../../../../DB/model/brand.model.js";

export const createBrand = asynchandiler(

    async (req, res, next) => {
        if (!req.file) {
            return next(new Error("image is requierd", { cause: 400 }))
        } else {

            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: "onlineEcommerce/Brand" })
            const { name } = req.body
            const brand = await create({
                model: brandModel,
                data: {

                    name,

                    logopic: secure_url,
                    slug: slugify(name),
                    imagepublicId: public_id,
                    addedby: req.user._id

                }
            })

            return brand ? res.json({ massage: "done", brand }) : next(new Error("fill to add new brand", { cause: 400 }))
        }


    }

)

export const updateBrand = asynchandiler(

    async (req, res, next) => {
        const { id } = req.params
        if (req.file) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,
                { folder: "onlineEcommerce/brand" })

            req.body.image = secure_url
            req.body.imagepublicId = public_id
        }
        if (req.body.name) {
            req.body.slug = slugify(req.body.name)
        }
        req.body.updatedby = req.user._id

        const Brand = await findByIdAndUpdate({
            model: brandModel, filter: { _id: id },
            data: req.body,
            options: { new: true}

        })
        if (Brand) {
            if (req.file) {
                await cloudinary.uploader.destroy(Brand.imagepublicId)

            }
            res.json({ massage: "done", Brand })

        } else {
            await cloudinary.uploader.destroy(req.body.imagepublicId)
            console.log(req.body.imagepublicId);
            return next(new Error("fill to update", { cause: 400 }))
        }


    }







)


export const allBrand = asynchandiler(

    async (req, res, next) => {
        const { page, size } = req.query
        const { skip, limit } = pagination(page, size)
        const Brand = await find({
            model: brandModel, populate: [{

                path: "addedby",
                select: "userName email"

            }
            ],
            skip,
            limit,
        })


        return res.status(200).json({ massage: "Brand added success", Brand })

    }




)






