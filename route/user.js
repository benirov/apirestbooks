// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/userController');
const { check } = require('express-validator');

router.post('/', 
    [
        check('username', 'username required').not().isEmpty(),
        check('email', 'email not valid').isEmail(),
        check('password', 'password must be min 6 characters').isLength({ min: 6}) 
    ],
    userController.createUser
);

router.post('/',
            auth,
            userController.updateUser
    );


module.exports = router;