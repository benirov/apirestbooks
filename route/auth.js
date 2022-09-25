// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const auth = require('../middleware/auth');

router.post('/', 
    authController.autenticateUser
);


router.get('/',
    auth,
    authController.getUserAuthenticate
);

module.exports = router;