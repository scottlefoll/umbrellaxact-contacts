const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/routes', require('./contact-routes'));

module.exports = router;