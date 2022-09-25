const mongoose = require('mongoose');

const reportedBook = mongoose.Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    idBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        require: true,
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Reported', reportedBook);