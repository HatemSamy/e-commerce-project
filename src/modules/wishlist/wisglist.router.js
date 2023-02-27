import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endpoint } from "./wishlist.endpoint.js";
import * as wishlist from "./controller/wishlist.js"
const router=Router({mergeParams:true})



router.patch("/add",auth(endpoint.add),wishlist.add)


router.patch("/remove",auth(endpoint.add),wishlist.remove)







export default router