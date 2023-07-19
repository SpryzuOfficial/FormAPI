require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { configDB } = require('./database/config');

const app = express();

const routes = {
    form: '/form'
}

configDB();

app.use(express.json());
app.use(cors());

app.use(routes.form, require('./routes/form'));

app.listen(8080, () =>
{
    console.log('Server running on port 8080');
});