const routes = require('express').Router();
const {param, query, validationResult} = require('express-validator');
const contactController = require('../controllers/contact-controller');
const curr_year = new Date().getFullYear();

routes.get('/', (req, res) => {
    res.send('Umbrellaxact Contacts API.');
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

routes.post('/createTemp/', async (req, res, next) => {
    console.log('in /contact/createTemp route');
    try {
        await contactController.createTempContact(req, res);
    } catch (err) {
        next(err);
    }
});

module.exports = routes;
