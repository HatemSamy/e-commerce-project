import joi from "joi";



export const signup = {

    body: joi.object().required().keys({

        userName: joi.string().required().min(2).max(20).messages({

            "any.required": "userName is required"
        }),
        email: joi.string().required().email(),

        password: joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),

        cpassword: joi.string().valid(joi.ref("password")).required().min(2).max(20)

    })
}

export const login = {


    body: joi.object().required().keys({

        email: joi.string().required().email(),

        password: joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),

    })

}