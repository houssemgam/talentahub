const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = new Schema(
    {
        title: {
            type: String,
            
        },
        description: {
            type: String,
        },
        exigence: {
            type: String,
        },
        detail: {
            type: String,
        },
        image: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Project', projectSchema);
