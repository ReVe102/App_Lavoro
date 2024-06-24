import mongoose from "mongoose";

const StanzeSchema = new mongoose.Schema({
    name: String,
    message: [{
        message: String,
        name: String,
        timestamp: String
        // id
    }]
});

export default mongoose.model("stanze", StanzeSchema);
