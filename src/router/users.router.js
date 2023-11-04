import { Router } from "express";
import { usersManager } from "../db/manager/usersManager.js";
import { hashData, compareData } from "../utils.js";

const router= Router()

router.get("/:idUser", async(req, res)=>{
    const {idUser}= req.params;
    try {
        const user =await usersManager.getById(idUser);
        res.status(200).json({message:"user found", user})
    } catch (error) {
        res.status(500).json({error})
        
    }
});

router.post("/", async(req, res)=>{
    const { password} = req.body;
    try {
        const hashedPassword = await hashData(password);
        const createdUser= await usersManager.createOne({
        ...req.body,
         password:hashedPassword,
    });
        res.status(200).json({message:"user found", user: createdUser})
    } catch (error) {
        res.status(500).json({error})
    }
});

export default router
