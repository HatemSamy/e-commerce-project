import { Router } from "express";
import * as order from "./controller/order.js"
import {auth} from "../../middleware/auth.js"
import { endpoint } from "./order.endPoint.js";

const router = Router()




router.post('/',auth(endpoint.add),order.addorder)
    





export default router