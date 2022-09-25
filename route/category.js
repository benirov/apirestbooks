const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controller/categoryController');

//all categories
router.get('/', categoryCtrl.getCategories);

module.exports = router;