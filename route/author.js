
const express = require('express');
const authorCtrl = require('../controller/authorController');

const router = express.Router();

router.get('/:start', authorCtrl.getAuthors); 
router.get('/:id', authorCtrl.getAuthor);
router.get('/', authorCtrl.getAllAuthors);
router.get('/authorsrequested/:start', authorCtrl.getAuthorsrequested);

module.exports = router;