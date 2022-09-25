'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const categoriesModel = Schema
(
	{
		id: Number,
		name: String
	}
);

module.exports = mongoose.model('Categories', categoriesModel);