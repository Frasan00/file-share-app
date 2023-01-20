import User from "../database/User";
import fs from "fs";
import { findUser } from "../utilities/findUser";
import { Request, Response } from "express";

export const getFiles = async (req: Request, res: Response)=> {
    const userName = req.params.userName;
    const user = await User.findOne({userName: userName});
    res.status(200).send(user?.files);
    console.log("Files sent");
};

export const download = async (req: Request, res: Response)=> {
    const {userName, fileName} = req.params;
    const user = await User.findOne({userName: userName});
    if(!user) return res.status(400).send("Couldn't find the user");
    const fileToBeDownloaded = user.files.find((file) => file.name === fileName)
    if (!fileToBeDownloaded) return res.status(404).send("File not found");

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", "attachment; filename="+fileToBeDownloaded);

    // Pipe the file to the response
    const readStream = fs.createReadStream("uploads/"+fileToBeDownloaded);
    readStream.pipe(res);
}; 

export const upload = async (req: Request, res: Response)=> {
    // to do: superati 5gb err
    console.log(req.params)
    if(!req.params) return res.status(400).send("Couldn't upload the file");
    const size = parseInt(req.params.size);
    const { fileName, userName } = req.params;
    const user = await findUser(userName);
    if(!user) return res.status(400).send("Couldn't find the user");

    // upload 
    const writeStream = fs.createWriteStream('./uploads/'+fileName);
    req.pipe(writeStream);

    // saves on db the updates
    const newFileArray = [...user.files, {fileName, size}];
    const newOccupated = user.occupatedMemory
    user.occupatedMemory = newOccupated;
    user.files = newFileArray;
    await user.save();

    console.log("File received");
    res.status(200).send("File uploaded");
};

export const del  = async (req: Request, res: Response)=> {
    const { fileName, userName } = req.params;
    const user = await findUser(userName);
    if(!user) return res.status(400).send("Couldn't find the user");
    let sizeToRemove = 0;
    const newFileArray = user.files.filter((file) => {
        file.name !== fileName
        if(file.name === fileName && file.size) sizeToRemove+=file.size;
    });
    sizeToRemove = user.occupatedMemory-sizeToRemove;
    user.occupatedMemory = sizeToRemove;
    user.files = newFileArray;
    await user.save();
    fs.unlink("uploads/"+fileName, (err) => {
        if (err) {
          throw err;
        }});
    console.log("File eliminated");
    return res.status(200).send("File Eliminated correctly");
};3