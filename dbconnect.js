import mongoose from "mongoose";

export const dbConnect= async ()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("database connected")
        
    } catch (error) {
        console.log("conncetion failed");
        
    }


}