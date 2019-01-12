var express = require('express');
var router = express.Router();

var cases = require('../app/controllers/case.controller');

router.get('/cases', cases.getCasesByCustomerId);
router.get('/search/cases', cases.search);
router.post('/cases', cases.save);
router.put('/cases', cases.save);
router.get('/cases/:caseId', cases.loadCaseById);

module.exports = router;