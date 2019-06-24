'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const categoryModel = schema
(
	{
		id: Number,
		name: String
	}
);

module.exports = mongoose.model('Category', categoryModel);