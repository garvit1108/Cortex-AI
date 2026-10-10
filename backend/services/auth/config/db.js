import mongoose from "mongoose";

 const connectDB =async()=>{
try {
    await mongoose.connect(process.env.MONGODB_URL);
   
    console.log(
      "DB Connected"
    );
    
} catch (error) {
    console.log("Db Error",error)
}

};

export default connectDB