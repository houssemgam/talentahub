const Event = require("../models/event");

async function addEvent(req, res) {
  let image = "";
  if (req.file) {
    image = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`;
  }

  try {
    const event = new Event({
      name: req.body.name,
      description: req.body.description || "",
      location: req.body.location || "",
      date: req.body.date,
      startTime: req.body.startTime || "",
      endTime: req.body.endTime || "",
      speakers: req.body.speakers || [],
      tags: req.body.tags || [],
      image,
    });

    await event.save();
    res.status(201).send({ message: "Event added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

async function getAllEvents(req, res) {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateEvent(req, res) {
  let image = "";
  if (req.file) {
    image = `${req.protocol}://${req.get("host")}/img/${req.file.filename}`;
  }

  const eventId = req.params._id;

  try {
    await Event.findOneAndUpdate({ _id: eventId }, {
      name: req.body.name || "",
      description: req.body.description || "",
      location: req.body.location || "",
      date: req.body.date,
      startTime: req.body.startTime || "",
      endTime: req.body.endTime || "",
      speakers: req.body.speakers || [],
      tags: req.body.tags || [],
      image: image || "",
    });
    res.status(200).json({ message: "Event updated successfully!" });
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getOneEvent(req, res) {
  try {
    const event = await Event.findOne({ _id: req.params._id });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

async function deleteEvent(req, res) {
  try {
    await Event.findOneAndDelete({ _id: req.params._id });
    res.status(200).json({ message: "Event deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

module.exports = {
  addEvent,
  getAllEvents,
  updateEvent,
  getOneEvent,
  deleteEvent,
};
