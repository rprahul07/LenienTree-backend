import eventModel from "./model.js/eventSchema.js";

export const createEventController= async(req,res)=>{
    try {
        const {name,college,location,type,community} =req.body

        const existingEvent= await eventModel.findOne({name:name},{college:college})
    if(existingEvent)
    {
        console.log("this event already exists");
        return res.status(404).send({
            success:false,
            message:"this event already exists",
        })
    }
    const event= new eventModel({name,college,location,type,community,}).save();
        if(!event)return res.status(404).send({success:"false",message:"Unable to create new user",})
        res.status(201).send({
            success:true,
            message:"succsfully created new event",
            event,
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"Unable to create new Event please try again",
            error,
        })
    }
}



export const getAllEventController= async(req,res)=>{
    try {

        const events= await eventModel.find();
        if(!events) return res.status(404).send({
            success:false,
            message:"Error while fetching all data",
        })
        res.status(201).send(events)
        
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:"UNable to get all events",
            error,
        })
    }
}