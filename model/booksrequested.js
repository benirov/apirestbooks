'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const bookrequested = schema
(
	{

        idBook: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            require: true,
        },
        idAuthor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author',
            require: true,
        },
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
	}, { timestamps: true }
);

module.exports = mongoose.model('Booksrequested', bookrequested, 'books_requested');