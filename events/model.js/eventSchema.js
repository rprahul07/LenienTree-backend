import mongoose  from "mongoose";
import { type } from "os";

const eventSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    college:{
    type:String,
    required:true,
    },
    location:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        enum:["hackathon","ideathon","summit","conference"],
        required:true,
        default:"hackathon"
    },
    community:{
        type:String,
        trim:true
    }

},{timestamps:true});


const eventModel= mongoose.model('event',eventSchema);

export default eventModel;