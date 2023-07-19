const { Router } = require('express');
const { check } = require('express-validator');

const { createForm, callForm, getEntries } = require('../controllers/form');
const { validateJson } = require('../middlewares/validateJson');

const router = Router();

router.post('/create', [
    check('name', 'Form name is required').not().isEmpty(),
    check('fields', 'Fields are required').not().isEmpty(),
    check('fields', 'Fields must be contained in an array').isArray(),
    validateJson
], createForm);

router.post('/call', [
    check('token', 'Form token required').not().isEmpty(),
    check('fields', 'Fields are required').not().isEmpty(),
    check('fields', 'Fields must be contained in an array').isArray(),
    validateJson
], callForm);

router.get('/entries', [
    check('token', 'Form token required').not().isEmpty(),
    validateJson
], getEntries);

module.exports = router;