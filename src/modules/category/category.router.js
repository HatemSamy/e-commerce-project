import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import { endpoint } from "./category.endPoint.js";
import * as controller from "./controller/category.js"
import subcategoryRouter from "../subcategory/subcategory.router.js"

const router = Router()

router.use('/:categoryId/subcategory',subcategoryRouter)


router.post('/category',auth(endpoint.add),myMulter(fileValidation.image).single("image"),
controller.createCategory
)

router.put('/:id',auth(endpoint.update),myMulter(fileValidation.image).single("image"),
controller.updateCategory
)


router.get('/categories',controller.findCategory)
router.get('/category/:id',controller.specialCategory)




export default router