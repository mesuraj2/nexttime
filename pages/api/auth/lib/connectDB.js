import mongoose  from "mongoose";


const connectDB=()=>{
    // if(mongoose.connection[0].readyState){
    //     console.log("already connected");
    //     return;
    // }
    mongoose.connect(process.env.MONGODB_URI,{},err=>{
        if(err ) throw err;
        console.log("connected successfully");
    })
}

export default connectDB;