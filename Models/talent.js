import mongoose from "mongoose";
const { Schema, model } = mongoose

const talent = new Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
        },
        typetalent: {
            type: String,
            enum: ['Sport', 'Music', 'Art'],
            required: true,
        },
        instrument: {
            type: String,
        },


    }
)

export default model("Talent", talent)