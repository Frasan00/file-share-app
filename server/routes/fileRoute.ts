import express from "express";
import { getFiles, download,  upload, del } from "../controllers/fileController";
import { validateJwt } from "../middlewares/jwtValidation";

const router = express.Router();

router.get("/:userName", validateJwt, getFiles);
router.get("/download/:fileName/:userName", download); // the auth process is made with a get req since we're working with streams
router.post("/upload/:fileName/:userName/:size",  upload);// the auth process is made with a get req since we're working with streams
router.delete("/del/:fileName/:userName", validateJwt, del)


export default router;