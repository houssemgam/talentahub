const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = new Schema({
  name: {
    type: String,

  },
  date: {
    type: String,
    
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('Event', eventSchema);

