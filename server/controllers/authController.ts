import { Request, Response } from "express";
import User from "../database/User";
import Session from "../database/Session";
import { findUser } from "../utilities/findUser";
import { tokenGenerator } from "../utilities/generateToke";
import fs from "fs";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    if(await findUser(userName)) return res.status(400).send("User already exists");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        userName: userName,
        password: hashedPassword
    });
    const userSaving = await newUser.save();

    // creating a folder for the user in uploads
    fs.mkdir("./uploads/"+userName, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Folder created for '+userName);
    }});

    console.log(userName+" registed");
    res.status(200).send(userName+" registed");
};

export const login = async (req: Request, res: Response) => {
    // password check
    const { userName, password } = req.body;
    const user: any = await findUser(userName);
    if(!user) return res.status(404).send("User doesn't exist");
    if(await Session.findOne({userName: userName})) return res.status(400).send("User already logged in");
    if(await bcrypt.compare(password, user.password) === false) return res.status(401).send("Wrong password ");
    
    // session
    const token = tokenGenerator(userName);
    if(token === -1) return res.status(400).send("Secret key not present for token");
    const newSession = new Session({
        userName: userName,
        token: token
    });
    const saveSession = await newSession.save();
    console.log(userName+" logged in");
    res.status(200).send(token);
};

export const logout = async (req: Request, res: Response) => {
    const userName = req.params.userName;
    const deleteUser = await Session.findOneAndDelete({userName: userName})
    .catch((err) => res.status(400).send("Couldn't delete the user: "+userName));
    console.log(userName+" logged out");
    res.status(200).send(userName+" logged out");
};