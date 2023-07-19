const { Router } = require('express');
const { createForm, callForm, getEntries } = require('../controllers/form');

const router = Router();

router.post('/create', createForm);

router.post('/call', callForm);

router.get('/entries', getEntries);

module.exports = router;