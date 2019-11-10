'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const calificationModel = Schema
(
	{
		idBook: String,
		email: String,
		descripcion: String,
		puntuation: Number,
	}
);

module.exports = mongoose.model('califications', calificationModel);