import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute";
import fileRoute from "./routes/fileRoute";
dotenv.config();

// mongodb connection
const mongo_url = process.env.MONGO_URI || "";
mongoose.set('strictQuery', false)
mongoose.connect("mongodb://127.0.0.1/file-share")
.then(() => console.log("Connected to the Database"))
.catch((err) => console.error(err));

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/file", fileRoute);

app.get("/", (req, res) => { res.send('<h1>File-share api</h1>'); });

app.listen(PORT, () => console.log("Listening on port "+PORT));