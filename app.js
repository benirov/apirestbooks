const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app =  express();
require('dotenv').config({ path: '.env' });

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)s

app.use(bodyParser.json({}));

app.use('/api/users', require('./route/user'));
app.use('/api/auth', require('./route/auth'));
app.use('/api/books', require('./route/books'));
app.use('/api/authors', require('./route/author'));
app.use('/api/categories', require('./route/category'));

module.exports = app;
