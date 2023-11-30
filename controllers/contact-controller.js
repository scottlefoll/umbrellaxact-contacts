const { Contact, TempContact } = require('../models/contact');

// GET /contacts
async function getContacts(req, res) {
    console.log('getContacts called');
    try {
      const result = await Contact.find({});
      if (result.length === 0) {
        throw { statusCode: 404, message: 'No contacts found' };
      } else {
        return result;
      }
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
      } else {
        return result;
      }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
        throw err;
    }
}


// POST /tempContact
async function createTempContact(req, res) {
    console.log('createTempContact called');
    console.log('req.body:', req.body);

    try {
        // Create the tempContact object using the TempContact model with all data from request body
        const newTempContact = new TempContact(req.body);

        // Save the tempContact object to the database
        const createdTempContact = await newTempContact.save();

        return res.status(201).json({
            statusCode: 201,
            message: 'Temporary contact created successfully',
            createdTempContactId: createdTempContact._id.toString(),
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            statusCode: 500,
            message: 'Temporary contact creation failed',
        });
    }
}


async function createContact(req, res) {
    console.log('createContact called');
    console.log('req.body:', req.body);
    let _id2;

    try {
        const {
          FName,
          LName,
          Address,
          City,
          State,
          Zip,
          Country,
          Email,
          Phone,
          Website,
          Company,
          JobTitle,
          ContactType,
          ContactMethod,
          Notes,
        } = req.body;

      // create a unique ID
      _id2 = `${FName}_${LName}`.replace(/\s/g, '').toLowerCase();
      console.log('Generated _id2:', _id2);

      // Create the contact object using the Contact model in Mongoose
      const newContact = new Contact({
        _id: _id2,
        FName,
        LName,
        Address,
        City,
        State,
        Zip,
        Country,
        Email,
        Phone,
        Website,
        Company,
        JobTitle,
        ContactType,
        ContactMethod,
        Notes,
      });

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
    createContact,
    createTempContact,
  };

  console.log('contacts-controller.js is loaded!');