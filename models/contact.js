const mongoose = require('mongoose');

// Define a very generic schema
const tempContactSchema = new mongoose.Schema({}, { strict: false });

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
  const TempContact = mongoose.model('TempContact', tempContactSchema);

  module.exports = { Contact, TempContact };
