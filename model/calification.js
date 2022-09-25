'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const calificationModel = Schema
(
	{
		idBook: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book',
            require: true,
        },
		idUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
		descripcion: String,
		puntuation: Number,
	}, { timestamps: true }
);

module.exports = mongoose.model('califications', calificationModel);