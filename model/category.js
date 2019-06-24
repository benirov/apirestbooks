'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const categoryModel = Schema
(
	{
		id: Number,
		name: String
	}
);

module.exports = mongoose.model('Category', categoryModel);