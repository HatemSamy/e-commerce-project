

import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import { endpoint } from "./brand.endPoint.js";
import * as controller from "./controller/Brand.js"

const router = Router()


router.post('/addbrand',auth(endpoint.add),myMulter(fileValidation.image).single("image"),
controller.createBrand
)
router.get('/brands',controller.allBrand)


router.put('/:id',auth(endpoint.update),myMulter(fileValidation.image).single("image"),
controller.updateBrand
)


export default router


