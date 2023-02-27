import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import { endpoint } from "./subcategory.endPoint.js";
import * as controller from "./controller/subCategory.js"
const router = Router({mergeParams:true})




router.post('/',auth(endpoint.add),myMulter(fileValidation.image).single("image"),
controller.createsubCategory
)

router.put('/:id',auth(endpoint.update),myMulter(fileValidation.image).single("image"),
controller.updatesubCategory
)

router.get('/subcategories',controller.findsubCategory)
router.get('/:id',controller.specialCategory)


export default router