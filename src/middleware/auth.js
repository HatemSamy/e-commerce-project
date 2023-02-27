import jwt from 'jsonwebtoken'
import { findById } from '../../DB/DBMethods.js';
import userModel from '../../DB/model/User.model.js';

export const role =
{
  admin: "admin",
  User: "User"
}

export const auth = (accessrole = []) => {
  return async (req, res, next) => {
    try {
      console.log({ bb: req.body });
      const { authorization } = req.headers
      console.log({ authorization });
      if (!authorization?.startsWith(process.env.BearerKey)) {
            return next(new Error("In-valid Bearer key", { cause: 400 }))
            
      } else {
        const token = authorization.split(process.env.BearerKey)[1]
        const decoded = jwt.verify(token, process.env.tokenSignature)
        if (!decoded?.id || !decoded?.isloggedin) {
          return res.status(400).json({ message: "In-valid token payload " })
        } else {
          const user = await findById({ model: userModel, filter: decoded.id, select: "userName role" })

          if (!user) {
            return next(new Error("not login user", { cause: 401 }))
          } else {
            if (!accessrole.includes(user.role)) {
              //    next(new Error("not autharizid  user",{cause:403}))
            return next(new Error("not autharezation user", { cause: 403 }))
      

            } else {
              req.user = user
              return next()

            }

          }
        }
      }
    } catch (error) {
      res.status(500).json({ message: "catch error", error })

    }


  }
}