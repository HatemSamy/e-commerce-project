import { role } from "../../middleware/auth.js";

export const endpoint={

   add:[role.admin,role.User],
   
}