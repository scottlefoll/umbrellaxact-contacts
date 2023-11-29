const { Contact } = require('../models/contact');

// GET /contacts
async function getContacts(req, res) {
    console.log('getContacts called');
    try {
      const result = await Contact.find({});
      if (result.length === 0) {
        throw { statusCode: 404, message: 'No contacts found' };
      }
      return result;
    } catch (err) {
      console.error(err);
      if (err.statusCode !== 404) {
        res.status(500).json({ message: 'Internal server error' });
      }
      throw err;
    }
  }

// GET /contacts/:id  ('sarah_kim')
async function getContactById(req, res, id) {
    console.log('getContactById called');
    console.log('searching for id:', id);
    try {
      const result = await Contact.findOne({ _id: id });
      if (!result || result.length === 0) {
        res.status(404).json({ message: 'No contact found for id: ' + id });
      }
      return result;
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
      throw err;
    }
}


async function createContact(req, res) {
    console.log('createContact called');
    console.log('req.body:', req.body);
    console.log('req.body.firstName:', req.body[0].firstName);
    console.log('req.body.lastName:', req.body[0].lastName);
    let _id2;

    try {
      let firstName = req.body[0].firstName;  
      let lastName = req.body[0].lastName;
      let address = req.body[0].address;
      let city = req.body[0].city;
      let state = req.body[0].state;
      let zip = req.body[0].zip;
      let country = req.body[0].country;
      let email = req.body[0].email;
      let phone = req.body[0].phone;
      let website = req.body[0].website;
      let company = req.body[0].company;
      let jobTitle = req.body[0].jobTitle;
      let contactType = req.body[0].contactType;
      let contactMethod = req.body[0].contactMethod;
      let notes = req.body[0].notes;

      // create a unique ID
      _id2 = `${firstName}_${lastName}`.replace(/\s/g, '').toLowerCase();
      console.log('33 create id2:', _id2);

      // Create the contact object using the Contact model in Mongoose
      const newContact = new Contact({
        _id: _id2,
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        country,
        email,
        phone,
        website,
        company,
        jobTitle,
        contactType,
        contactMethod,
        notes,
        });

      console.log('newContact:', newContact);
      // Save the contact object to the database
      const createdContact = await newContact.save();

      return res.status(201).json({
        statusCode: 201,
        message: 'Contact created successfully',
        createdContactId: createdContact._id.toString(),
      });
    } catch (err) {
      console.error(err);
      if (err.code === 11000) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Duplicate key violation. Contact creation failed',
          id: req.body._id,
          keyValue: err.keyValue,
        });
      } else {
        return res.status(500).json({
          statusCode: 500,
          message: 'Contact creation failed',
          id: req.body._id,
        });
      }
    }
  }

  module.exports = {
    getContacts,
    getContactById,
    createContact   
  };

  console.log('contacts-controller.js is loaded!');

