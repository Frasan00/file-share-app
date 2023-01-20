import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    files:{
        type: [String, [String]], // a user can have single files or folders
        require: true,
        default: []
    },
    occupatedMemory: {
        type: Number,
        require: true,
        default: 0
    }
});

export default mongoose.model("User", userSchema);