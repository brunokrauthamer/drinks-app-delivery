const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.get('/coffee', (_req, res) => res.status(418).end());
app.use(router);

module.exports = app;
