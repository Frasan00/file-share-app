import express from "express";
import { getFiles, download,  upload, del } from "../controllers/fileController";
import { validateJwt } from "../middlewares/jwtValidation";

const router = express.Router();

router.get("/:userName", validateJwt, getFiles);
router.get("/download/:fileName/:userName", validateJwt, download);
router.post("/upload/:fileName/:userName/:size",  upload);
router.delete("/del/:fileName/:userName", validateJwt, del)


export default router;