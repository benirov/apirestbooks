'use strict';

const express = require('express');
const authorCtrl = require('../controller/authorController');
const bookCtrl = require('../controller/bookController');

const api = express.Router();

/*  Routes of books with api */

api.get('/authors/', authorCtrl.getAuthors);
api.get('/authors/:id', authorCtrl.getAuthor);
api.get('/authorsbyname/:string', authorCtrl.getAuthorsLikeName);

api.get('/books/:start', bookCtrl.getBooks);

api.get('/book/:id', bookCtrl.getBook);

api.get('/book/category/:category', bookCtrl.getBookByCategory);
api.get('/book/author/:author', bookCtrl.getBookByAuthor);
//api.get('/book/authors/:author', bookCtrl.getBookAuthors);





module.exports = api;