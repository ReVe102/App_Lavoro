import mongoose from "mongoose";
const Schema = mongoose.Schema({
    message : String,
    name : String ,
    timestamp : String ,
    received : Boolean
    
});
export default mongoose.model("messageContent" , Schema);