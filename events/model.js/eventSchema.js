import mongoose  from "mongoose";
import { type } from "os";

const eventSchema= new mongoose.Schema({
    eventname:{
        type:String,
        required:true,
        trim:true
    },
    eventimage:{
        type:String,
        required:false,
        trim:true
    },
    college:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
    type:{
        type:String,
        required:true,
        default:"hackathon"
    },
    community:{
        type:String,
        trim:true
    },
    sponsors: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    response: {
        type: String,
        default: "You will receive the confirmation email shortly"
    },
    createdBy: {
        type: String,
        required: false,
        trim: true
    },
    role: {
        type: String,
        required: false,
        trim: true
    }
},{timestamps:true});


const eventModel= mongoose.model('event',eventSchema);

export default eventModel;