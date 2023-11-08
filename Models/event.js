import mongoose from "mongoose";
const { Schema, model } = mongoose

const event = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },


    }
)

export default model("Event", event)