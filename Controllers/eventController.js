import Event from "../Models/event.js";



export function addEvent(req, res) {

    var image = ""
    if (req.file) {
        image = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
    }
    const event = new Event({
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
        image: image
    })
    event.save()
        .then(u => {
            res.status(201).send({
                message: "Event added successfuly !"
            })
        }).catch(err => {
            res.status(500).send({ error: err })
        }
        )


}
export async function getAllEvents(req, res) {
    Event.find().then(events => {
        res.status(200).send(events)
    }).catch(err => {
        res.status(500).send(err)
    })
}

export function updateEvent(req, res) {

    var image = ""
    if (req.file) {
        image = `${req.protocol}://${req.get('host')}/img/${req.file.filename}`
    }
    const eventId = req.params._id

    Event.findOneAndUpdate({ id: eventId }, {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
        image: image
    })
        .then(event => {
            res.status(200).json({ message: "Event updated successfuly !" })
        })
        .catch(err => {
            res.status(500).json(err)
        })





}


export function getOneEvent(req, res) {
    Event
        .findOne({ "_id": req.params._id })
        .then(val =>
            res.status(200).json(val))
        .catch(err => {
            res.status(500).json({ error: err })
        })
}


export function deleteEvent(req, res) {
    Event
        .findOneAndDelete({ "_id": req.params._id })
        .then(val =>
            res.status(200).json({ message: "Event deleted successfuly !" }))
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
