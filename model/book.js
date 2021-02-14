'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const bookModel = schema
(
	{
		_id: ObjectId,
		id: Number,
		title: String,
		sort: String,
		timestamp: Date,
		pubdate: Date,
		series_index: Number,
		author_sort: String,
		isbn: String,
		lccn: String,
		// image: String,
		path: String,
		flags: Number,
		uuid: String,
		has_cover: Number,
		last_modified: Date,
		tag: Number
	}
);

module.exports = mongoose.model('Book', bookModel);