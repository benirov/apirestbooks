'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const bookModel = schema
(
	{
		id: Number,
		title: String,
		sort: String,
		timestamp: Date,
		pubdate: Date,
		series_index: Number,
		author_sort: String,
		isbn: String,
		lccn: String,
		path: String,
		flags: Number,
		uuid: String,
		has_cover: Number,
		last_modified: Date
	}
);

module.exports = mongoose.model('Book', bookModel);