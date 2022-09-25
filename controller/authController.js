const User = require('../model/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticateUser = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errors: errores.array() })
    }

    
    const { email, password } = req.body;

    try {
        
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({msg: 'User not foud'});
        }

        
        const passVerify = await bcryptjs.compare(password, user.password);
        if(!passVerify) {
            return res.status(400).json({msg: 'Error in Password' });
        }

        
         const payload = {
            user: {
                id: user._id
            }
        };

        
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            
            res.json({ token  });
        });

    } catch (error) {
        return res.status(500).json({msg: `Error in auth controller (autenticarUsuario): ${error}` });
    }
}

exports.getUserAuthenticate = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).send({user});
    } catch (error) {
        res.status(500).json({msg: `Error in auth controller (usuarioAutenticado): ${error}`});
    }
}