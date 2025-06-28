import express from "express"
import { createEventController, getAllEventController } from "./eventController.js";


const router=express.Router();

router.post("/create",createEventController)

router.get("/getAll",getAllEventController)


export default router;