import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endpoint } from "./cart.endPoint.js";
import * as cart from "./controller/cart.js"
const router = Router()




router.post('/addtoCart',auth(endpoint.add), cart.addtoCart)




export default router