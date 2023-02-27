import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endpoint } from "./reviews.endPoint.js";
import * as review from "./controller/review.js"
const router = Router({mergeParams:true})




router.post('/', auth(endpoint.add),review.addreview)




export default router