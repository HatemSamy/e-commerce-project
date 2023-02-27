import { Router } from "express";
import { validation } from "../../middleware/validation.js";
import * as registrationRouter from "./controller/registration.js";
import * as validators from "../../modules/auth/auth.validation.js"
const router = Router()

router.post("/signup",registrationRouter.signup)
router.get("/confirmEmail/:token",registrationRouter.confirmEmail)
router.get("/refreshtoken/:token",registrationRouter.refreshtoken)

router.post("/login",validation(validators.login),registrationRouter.login)





export default router