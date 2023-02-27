import mongoose from 'mongoose'
const connectDB  = async ()=>{
    return await mongoose.connect(process.env.DBURI)
    .then(res=>console.log(`DB Connected successfully on .........${process.env.DBURI} `))
    .catch(err=>console.log(` Fail to connect  DB.........${err} `))
}


export default connectDB;
