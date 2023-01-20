import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    data: {
        type: Date,
        require: true,
    },
    owner: {
        type: String,
        require: true
    },
});

export default mongoose.model("File", fileSchema);