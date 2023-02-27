
import { create, find, findById, findOneAndUpdate, findOne } from "../../../../DB/DBMethods.js";
import cloudinary from "../../../services/cloudinary.js";
import { asynchandiler } from "../../../services/errorHandling.js";
import slugify from "slugify"
import { pagination } from "../../../services/pagination.js";
import subCategorymodel from "../../../../DB/model/subcategory.model.js";
import brandModel from "../../../../DB/model/brand.model.js";

import productModel from "../../../../DB/model/product.model.js";


export const createproduct = asynchandiler(

    async (req, res, next) => {
        if (!req.files?.length) {
            return next(new Error("image is requierd", { cause: 400 }))
        }

        const { name, amount, discount, CategoryId, subCategoryId, BrandId, price } = req.body
        req.body.slug = slugify(name)
        req.body.stock = amount
        if (discount) {
            req.body.finalprice = price - (price * ((discount || 0) / 100))

        }
        const category = await findOne({ model: subCategorymodel, filter: { _id: subCategoryId, CategoryId } })

        if (!category) {
            return next(new Error("in-valid category or subcategory id", { cause: 404 }))
        }

        const brand = await findById({ model: brandModel, filter: { _id: BrandId } })

        if (!brand) {
            return next(new Error("in0-valid brand id", { cause: 404 }))
        }
        req.body.Createdby = req.user._id

        const images = []
        const imagepublicIds = []

        for (const file of req.files) {
            const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: `onlineEcommerce/product/${name}` })
            images.push(secure_url)
            imagepublicIds.push(public_id)
        }
        req.body.images = images
        req.body.imagepublicIds = imagepublicIds

        const product = await create({ model: productModel, data: req.body })
        return res.status(200).json({ massage: "done", product })





    }

)



export const update = asynchandiler(

    async (req, res, next) => {
        const { id } = req.params

        const product = await findById({ model: productModel, filter: id })
        if (!product) {
            next(new Error("invalid prodduct id"))
        }

        const { name, amount, price, discount, subCategoryId, CategoryId, BrandId } = req.body
        if (name) {
            req.body.slug = slugify(name)
        }

        if (amount) {
            const calstock = amount - product.soldItem
            calstock > 0 ? req.body.stock = calstock : req.body.stock = 0

        }

        if (price & discount) {
            req.body.finalprice = price - (price * (discount / 100))
        } else if (price) {
            req.body.finalprice = price - (price * (product.discount / 100))

        } else if (discount) {
            req.body.finalprice = product.price - (product.price * (discount / 100))

        }

        if (subCategoryId && CategoryId) {
            const category = await findOne({ model: subCategorymodel, filter: { _id: subCategoryId, CategoryId } })

            if (!category) {
                return next(new Error("in-valid category or subcategory id", { cause: 404 }))
            }

        }

        if (BrandId) {
            const brand = await findById({ model: brandModel, filter: { _id: BrandId } })

            if (!brand) {
                return next(new Error("in0-valid brand id", { cause: 404 }))
            }
        }
        if (req.files.length) {
            const images = []
            const imagepublicIds = []
            for (const file of req.files) {
                const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, { folder: `onlineEcommerce/product/${name}` })
                images.push(secure_url)
                imagepublicIds.push(public_id)
            }
            req.body.images = images
            req.body.imagepublicIds = imagepublicIds

        }

        req.body.updatedby = req.user._id

        const updateproduct = await findOneAndUpdate({
            model: productModel, filter: {_id:id},
            data: req.body,
            options: { new: false }

        })


        if (updateproduct) {
            for (const imageID of product.imagepublicIds) {
                await cloudinary.uploader.destroy(imageID)
            }

            return res.json({ massage: "updatedproduct", updateproduct })
        }
        else{
            return next(new Error("in0-valid brand id",{cause:404}))


        }



    }

)


export const products = asynchandiler(

    async (req, res, next) => {
        const{page,size}=req.query
        const{skip,limit}=pagination(page,size)
        const productlist = await find({
            model: productModel, populate:[{

                path: "Createdby",
                select: "userName email"

            },
            {

                path: "updatedby",    
                select: "userName email"

            },
            {
                path: "CategoryId",
                populate:[{

                    path: "Createdby",
                    select: "userName email"
    
                }],  
            },
            {
                 path: "Review"
                },

            {
                path: "BrandId",
                populate:[{

                    path: "addedby",
                    select: "userName email"
    
                }],
            }],
            skip,
            limit
        })
        

        res.status(200).json({ massage: "products", productlist })

    }


)


