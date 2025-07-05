import express from "express";
import { 
    createEvent, 
    updateEvent, 
    deleteEvent, 
    getAllEvents, 
    getEventById, 
    uploadEventImage 
} from "../controllers/eventController.js";
import { 
    uploadSingleImage, 
    handleUploadError, 
    checkFileUpload 
} from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Create event with optional image upload
router.post("/create", uploadSingleImage, handleUploadError, createEvent);

// Update event by ID with optional image upload
router.put("/update/:id", uploadSingleImage, handleUploadError, updateEvent);

// Upload image for existing event
router.post("/upload-image/:id", uploadSingleImage, handleUploadError, checkFileUpload, uploadEventImage);

// Delete event by ID
router.delete("/delete/:id", deleteEvent);

// Get all events
router.get("/getAll", getAllEvents);

// Get event by ID
router.get("/get/:id", getEventById);

export default router; 