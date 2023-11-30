const routes = require('express').Router();
const {param, query, validationResult} = require('express-validator');
const contactController = require('../controllers/contact-controller');
const curr_year = new Date().getFullYear();

routes.get('/', (req, res) => {
    res.send('Welcome to the Umbrellaxact Contacts API! Please enter a valid endpoint to continue (all parameters are case-insensitive): (/contact (List of all contacts), /contact/:id (single contact by id, i.e. - sarah_kim ), /create/:id (create contact)');
});

routes.get('/contact/', async (req, res, next) => {
    console.log('in /contact route');
    try {
      const collection = await contactController.getContacts();
      res.send(collection);
    } catch (err) {
      next(err);
    }
  });

// Route with contact ID validation
routes.get('/contact/:id', async (req, res, next) => {
    console.log('in /contact/:id route');
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    try {
        const collection = await contactController.getContactById(req, res, req.params.id);
        res.send(collection);
    } catch (err) {
        next(err);
    }
});

routes.post('/create/', async (req, res, next) => {
        console.log('in /contact/create route');
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        try {
            await contactController.createContact(req, res);
        } catch (err) {
            next(err);
        }
    });

module.exports = routes;
