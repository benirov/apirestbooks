'use strict';

const express = require('express');
const authorCtrl = require('../controller/authorController');
const bookCtrl = require('../controller/bookController');
const categoryCtrl = require('../controller/categoryController');
const calificationController = require('../controller/calificationController');
const mailerCtrl = require('../controller/mailerCtrl');

const api = express.Router();

/*  Routes of books with api */

api.get('/authors/:start', authorCtrl.getAuthors); 
api.get('/authors/:id', authorCtrl.getAuthor);
api.get('/category', categoryCtrl.getCategory);

api.get('/authors/:id', authorCtrl.getAuthor);

api.get('/books/:start', bookCtrl.getBooks); 

api.get('/book/:id', bookCtrl.getBook);

api.get('/book/category/:category', bookCtrl.getBookByCategory);
api.get('/book/author/:author', bookCtrl.getBookByAuthor);
api.get('/calification/:idBook', calificationController.getCalificationByBook);
api.post('/calification', calificationController.insetCalification);
api.post('/reportBook', mailerCtrl.sendEmail);


api.get('/book/findByAuthorAndCategort/:author/:serie/:start', bookCtrl.getBookByAuthorAndCategoriy);
api.get('/book/bookscategories/:categories/:start', bookCtrl.getBookByCategories);
api.get('/book/booksauthors/:authors/:start', bookCtrl.getBookByAuthors);
api.get('/book/booksByName/:name/:start', bookCtrl.getBookBynameBook);
//api.get('/book/authors/:author', bookCtrl.getBookAuthors);





module.exports = api;