
import { Schema, model, Types } from "mongoose";


const userSchema = new Schema({

    userName: {
        type: String,
        required: [true,"userName is required "],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    email: {
        type: String,
        unique: [true, 'email must be unique value'],
        required: [true, 'userName is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin']
    },

    active: {
        type: Boolean,
        default: false,
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    image: String,
    DOB: String,
    wishlist:[{
        type:Types.ObjectId,
        ref:"product"
    }]

}, {
    timestamps: true
})


const userModel = model('User', userSchema)
export default userModel
// import { Schema, model } from "mongoose";
// const userSchema = new Schema({
//     userName: {
//         type: String,
//         required: [true, "userName is required"],
//         min: [6, "min length 6"],
//         max: [20, "min length 12"]

//     },
//     email: {
//         type: String,
//         required: [true, "userName is required"],
//         unique: [true, "email must be uniqe"]
//     },
//     password: {
//         type: String,
//         required: [true, "email is required"],
//     },
//     role: {
//         type: String,
//         default: "user",
//         enum: ["user", "Admin"]
//     },
//     active: {
//         type: Boolean,
//         default: false,

//     },
//     confirmEmail: {
//         type: Boolean,
//         default: false,
//     },
//     blocked: {
//         type: Boolean,
//         default: false,
//     },
//     image: String,
//     DOB: String,
//     phone: String,

// }, {
//     timestamps: true
// })

// const UserModel= model("User",userSchema)
// export default UserModel