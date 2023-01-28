import User from "../database/User";
import fs from "fs";
import { findUser } from "../utilities/findUser";
import { Request, Response } from "express";

export const getFiles = async (req: Request, res: Response)=> {
    const userName = req.params.userName;
    const user = await findUser(userName);
    res.status(200).send(user?.files);
    console.log("Files sent");
};


// download for files deteined by the user
export const download = async (req: Request, res: Response)=> {
    const {userName, fileName} = req.params;
    const user = await findUser(userName);
    if(!user) return res.status(400).send("Couldn't find the user");
    const file = user.files.find((file) => file.name === fileName)
    if (!file) return res.status(404).send("File not found");

    res.setHeader("Content-Type", "application/octet-stream");

    // Pipe the file to the response
    const readStream = fs.createReadStream('database/uploads/'+userName+"/"+file.name);
    readStream.pipe(res);
}; 

export const upload = async (req: Request, res: Response)=> {
    if(!req.params) return res.status(400).send("Couldn't upload the file");
    const size = parseInt(req.params.size);
    const { fileName, userName } = req.params;
    const user = await findUser(userName);
    if(!user) return res.status(400).send("Couldn't find the user");

    // upload 
    const writeStream = fs.createWriteStream('database/uploads/'+userName+"/"+fileName);
    req.pipe(writeStream);

    // saves on db the updates
    const newFile = {
        name: fileName || "",
        size: size || 0,
        date: new Date().toLocaleString().toString() || "",
        link: ["Download!", 'database/uploads/'+userName+"/"+fileName] || ""
    };
    const newFileArray = user.files;
    newFileArray.push(newFile);
    const newOccupated = user.occupatedMemory+size
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
    // to do better: file size
    user.files.map(file => file.name === fileName && file.size ? sizeToRemove+=file.size: null)

    const newFileArray = user.files.filter(file => file.name !== fileName);
    sizeToRemove = user.occupatedMemory-sizeToRemove;
    user.occupatedMemory = sizeToRemove;
    user.files = newFileArray;
    await user.save();
    fs.unlink('database/uploads/'+userName+"/"+fileName, (err) => {
        if (err) {
          throw err;
    }});
    console.log("File eliminated");
    return res.status(200).send(newFileArray);
};