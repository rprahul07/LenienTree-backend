import eventModel from '../model.js/eventSchema.js';

// Create a new event
export const createEvent = async (req, res) => {
    try {
        // Basic validation for required fields
        const { eventname, college, location } = req.body;
        if (!eventname || !college || !location) {
            return res.status(400).json({ error: 'eventname, college, and location are required.' });
        }
        const event = new eventModel(req.body);
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'An error occurred while creating the event.', details: error.message });
    }
};

// Update an existing event
export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Event ID is required.' });
        }
        const updatedEvent = await eventModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'An error occurred while updating the event.', details: error.message });
    }
};

// Delete an event
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Event ID is required.' });
        }
        const deletedEvent = await eventModel.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.json({ message: 'Event deleted successfully.' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'An error occurred while deleting the event.', details: error.message });
    }
};

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await eventModel.find();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'An error occurred while fetching events.', details: error.message });
    }
};
