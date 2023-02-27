import userModel from "../../../../DB/model/User.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import sendEmail from "../../../services/email.js"
import { asynchandiler } from "../../../services/errorHandling.js"
import { findOne } from "../../../../DB/DBMethods.js"




export const signup =asynchandiler( async (req, res,next) => {
  const { userName, email, password } = req.body
  
  // const user = await userModel.findOne({ email }).select("email")
  const user = await findOne({filter:{email},model:userModel,select:"email"})///name argument

  if (user) {
   return next(Error("user aready exist",{cause:400}))

  } else {
    const hash = bcrypt.hashSync(password, parseInt(process.env.SALTROUND))
    const newuser = new userModel({ userName, email, password: hash })

    const token = jwt.sign({ id: newuser._id }, process.env.emailToken)
    const refreshtoken = jwt.sign({ id: newuser._id }, process.env.emailToken)

    const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`
    const link2 = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/refreshtoken/${refreshtoken}`

    const message = `<a href="${link}">confirmEmail<a/>
    <br/><br/>
    <a href="${link2}">newtoken<a/>
    `


    const info = await sendEmail(email, "confirmemail", message)
    if (info?.accepted?.length) {
      const savedUser = await newuser.save()
      res.status(201).json({ massage: "Done", userId: savedUser._id })
      console.log(info?.accepted?.length);

    } else {
       return  next(Error("email regicted",{cause:404}))

    
    }

  }

}
)
export const confirmEmail = asynchandiler(async (req, res) => {


  const { token } = req.params
  const decoded = jwt.verify(token, process.env.emailToken)
  if (!decoded?.id) { 
     return  next(Error("in-valid token payload",{cause:400}))

  } else {

    const user = await userModel.findOneAndUpdate({ _id: decoded.id, confirmEmail: false }, { confirmEmail: true })

    res.status(201).json({ massage: "email confirmed" })

  }


})

export const login =asynchandiler(async(req,res,next) => {
  const { email, password } = req.body
  
  const user = await userModel.findOne({ email })
  if (!user) {
    return  next(Error("user not register",{cause:404}))

  } else {
    if (!user.confirmEmail) {
      res.status(400).json({ massage: "confirm your email frist" })
      return  next(Error("confirm your email frist",{cause:403}))

    } else {
      const match = bcrypt.compareSync(password, user.password)
      if (!match) {
        return  next(Error("in-valid password",{cause:404}))
   
      } else {

        const token = jwt.sign({ id: user._id, isloggedin:true, userName:user.userName }, process.env.tokenSignature)

        return  res.status(200).json({ massage: "login success", token })

      }

    }

  }

})

export const refreshtoken = asynchandiler(async (req, res) => {
  const { token } = req.params
  const decoded = jwt.verify(token, process.env.emailToken)

  if (!decoded) {
  
    return  next(Error("in valid token",{cause:400}))


  } else {
    const user = await userModel.findById(decoded.id)
    if (!user) {
      res.status(400).json({ massage: " not register user" })

    } else {
      if (user.confirmEmail) {
        res.status(400).json({ massage: " you are aready confirmed" })

      } else {
        const token = jwt.sign({ id: user._id, userName: user.userName }, process.env.emailToken)

        const link = `${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}`

        const message = `<a href="${link}">confirmEmail<a/>
   
    `
        const info = await sendEmail(user.email, "confirmemail", message)
        if (info?.accepted?.length) {
          res.status(200).json({ massage: " your new token" })
        } else {
           return  next(Error("email regicted",{cause:404}))

        }




      }
    }
  }


}
)



