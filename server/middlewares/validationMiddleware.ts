import {body, validationResult} from "express-validator";
import { Request, Response, NextFunction } from "express";

const dataValidation = [
    body("userName").exists().isLength({ min: 3, max: 10 }),
    body("password").exists().isLength({ min: 6, max: 16 }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (errors.array().length > 0) return res.status(400).json(errors.array());
        next();
    }];

export default dataValidation;

