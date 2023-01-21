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
        type: [
            {
            name: String,
            size: Number,
            date: String,
            link: [String]
        }
    ],
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