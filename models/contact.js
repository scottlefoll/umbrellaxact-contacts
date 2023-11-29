const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    _id: String,
    FName: String,
    LName: String,
    Address: String,
    City: String,
    State: String,
    Zip: String,
    Country: String,
    Email: String,
    Phone: String,
    Website: String,
    Company: String,
    JobTitle: String,
    ContactType: String,
    ContactMethod: String,
    Notes: String,
  });

  const Contact = mongoose.model('Contact', contactSchema);
  module.exports = { Contact };
