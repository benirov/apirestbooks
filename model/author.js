'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const authorModel = schema
(
	{
		id: Number,
		name: String,
		sort: String,
		link: String
	}
);

module.exports = mongoose.model('Author', authorModel);