'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const authorLikeModel = schema
(
	{
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

module.exports = mongoose.model('AuthorLike', authorLikeModel, 'like_author');