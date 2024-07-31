const {uploadImageToCloudinary} = require("../Utilities/ImageUploader");
const {EventCard }= require("../database/db");
require("dotenv").config()
const {User} = require("../database/db")

//create Event->donor specific
const createEvent = async (req, res) => {
  try {
    const { title, typeOfFood, quantity, location, contactDetails, eventDate } = req.body;
    const image = req.files.image;
    const userId = req.user.id;

    // Validation
    if (!title || !typeOfFood || !quantity || !location || !contactDetails || !eventDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!['veg', 'non-veg'].includes(typeOfFood)) {
      return res.status(400).json({ message: 'Invalid type of food' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be a positive number' });
    }

    if (!['Delhi', 'Mumbai', 'Pune', 'Bengaluru', 'Chennai'].includes(location)) {
      return res.status(400).json({ message: 'Invalid location' });
    }
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }
    const donorDetails = await User.findById(userId, {
      role: "Donor",
    })

    if (!donorDetails) {
      return res.status(404).json({
        success: false,
        message: "Donor Details Not Found",
      })
    }
    // Upload image to Cloudinary
    const uploadResult = await uploadImageToCloudinary(image,process.env.FOLDER_NAME);

    // Create new event
    const newEvent =await EventCard.create({
      donorId: donorDetails._id,
      title,
      typeOfFood,
      quantity,
      location,
      contactDetails,
      image: uploadResult.secure_url, // Set image URL from Cloudinary
      eventDate,
    });
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

//delete Event->donor Specific
const deleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
  
      const event = await EventCard.findOneAndDelete({ _id: id, donorId: req.user.id });
  
      if (!event) {
        return res.status(404).json({ message: 'Event not found or not authorized' });
      }
  
      res.json({ message: 'Event deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
  };

//Get Event specific to a Donor->donor specific
const getDonorEvents = async (req, res) => {
    try {
      const events = await EventCard.find({ donorId: req.user.id });
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
  };

//Get All Events

const getAllEvents = async (req, res) => {
    try {
      const events = await EventCard.find();
      return res.json(events);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
  };

//Get All Events specific to a location
const getEventsByLocation = async (req, res) => {
    try {
      const { location } = req.params;
      const events = await EventCard.find({ location });
      return res.json(events);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
  };

//mark event status as available or complete
const markEventAsCompleted = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await EventCard.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.status === 'completed') {
      return res.status(400).json({ message: 'Event already completed' });
    }

    // Update the event status
    event.status = 'completed';
    await event.save();

    // Award points to the donor
    const donor = await User.findById(event.donorId);
    const donorPoints = 50 * event.quantity;
    donor.totalPoints += donorPoints;
    donor.completedEventsPoints.push({ eventId: event._id, points: donorPoints });
    await donor.save();

    // Award points to the volunteers
    for (let v of event.volunteers) {
      if (v.status === 'accepted') {
        const volunteer = await User.findById(v.volunteerId);
        const volunteerPoints = event.quantity * 10;
        volunteer.totalPoints += volunteerPoints;
        volunteer.completedEventsPoints.push({ eventId: event._id, points: volunteerPoints });
        await volunteer.save();
      }
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error marking event as completed', error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the event by ID and populate the volunteers field
    const event = await EventCard.findById(id).populate('volunteers.volunteerId', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};

  module.exports = {
    createEvent,
    deleteEvent,
    getDonorEvents,
    getAllEvents,
    getEventsByLocation,
    markEventAsCompleted,
    getEventById
  };
