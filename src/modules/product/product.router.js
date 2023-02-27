import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { fileValidation, myMulter } from "../../services/multer.js";
import { endpoint } from "./product.endPoint.js";
import * as controller from "./controller/product.js"
import wishlistRouter from "../wishlist/wisglist.router.js"
import reviewRouter from "../reviews/reviews.router.js"

const router = Router()
router.use("/:productId/wishlist",wishlistRouter)
router.use("/:productId/review",reviewRouter)



router.post('/',auth(endpoint.add),myMulter(fileValidation.image).array("images",5),
controller.createproduct
)

router.get('/products',controller.products)


router.put('/:id',auth(endpoint.update),myMulter(fileValidation.image).array("images",5),
controller.update
)


export default router


