import mongoose from "mongoose ";
const contactScheme = new mongoose.scheme({
    name:{
        type:String,
        required:[true, "Name is required"],

    },
    email:{
        type:String,
        trim:true,
        maxlength:[50, "Email must be less than 50 characters"],
        required:[true, "Email is required"],
    },
    phone:{
        type:String,    
        trim:true,
        maxlength:[15, "Phone must be less than 15 characters"],
        required:[true, "Phone is required"],
    },
    message:{
        type:String,
        trim:true,
        maxlength:[500, "Message must be less than 500 characters"],
        required:[true, "Message is required"],
    }
})
export default mongoose.model("Contact", contactScheme);
