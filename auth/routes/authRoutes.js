import express from "express"
import {getAllusers, loginController, signupController } from "../controller/userController.js";


const router=express.Router();


router.post("/signup",signupController)

router.post("/login",loginController)


router.get('/getAll',getAllusers)

export default router;