import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import * as coupon from "./controller/coupon.js"

import { endpoint } from "./coupon.endPoint.js";

const router = Router()




router.post('/',auth(endpoint.add),coupon.createcoupon)
router.put('/:id',auth(endpoint.add),coupon.updatecoupon)
router.delete('/:id',auth(endpoint.add),coupon.deletecoupon)






export default router