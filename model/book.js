'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
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
		description: String,
		isbn: String,
		lccn: String,
		image: String,
		path: String,
		flags: Number,
		uuid: String,
		bestseller: {
			type: Boolean,
			default: false,
		},
		has_cover: Number,
		last_modified: Date,
		tag: Number,
		create_at: {
			type: Date,
			default: new Date(),
		}

	}
);

module.exports = mongoose.model('Book', bookModel, 'books');