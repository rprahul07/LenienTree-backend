import express from "express";
import { createEvent, updateEvent, deleteEvent, getAllEvents } from "../controllers/eventController.js";

const router = express.Router();

// Create event
router.post("/create", createEvent);

// Update event by ID
router.put("/update/:id", updateEvent);

// Delete event by ID
router.delete("/delete/:id", deleteEvent);

// Get all events
router.get("/getAll", getAllEvents);

export default router; 