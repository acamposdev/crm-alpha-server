var express = require('express');
var router = express.Router();

var contacts = require('../app/controllers/contact.controller');

router.get('/contacts', contacts.getContactsByCustomerId);
router.get('/search/contacts', contacts.search);
router.post('/contacts', contacts.save);
router.get('/contacts/:contactId', contacts.loadContactById);

module.exports = router;