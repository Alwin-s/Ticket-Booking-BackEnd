const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  theaterId: String,
  theaterName: String,
  movieName: String,
  bookedSeats: [String],
  theaterTime: [String], 
  date: String,
  userId: String 
});

const Projects = mongoose.model('Projects', projectSchema);

module.exports = Projects;
