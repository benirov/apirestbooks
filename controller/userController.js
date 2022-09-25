const User = require('../model/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    // check errors
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errors: errores.array() })
    }

   
    const { email, password } = req.body;


    try {
        
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        
        user = new User(req.body);


        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt );

        await user.save();


        const payload = {
            user: {
                id: user._id
            }
        };

        // firmar el JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            res.json({ token  });
        });


    } catch (error) {
        res.status(500).send(`Error in method ${createUser}`);
    }
}


exports.updateUser = async (req, res) => {

    
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    
    const { email, username, favorites, requested } = req.body;


    try {

        const updateUser = {};

        if(email) updateUser.email = email;

        if(username) updateUser.username = username;

        if(favorites) updateUser.favoritos = favorites;

        if(requested) updateUser.solicitados = requested;


         // actualizar
         usuario = await User.findByIdAndUpdate({ _id: req.user.id }, { $set : updateUser}, { new: true });

         res.status(200).send({msg: 'User updated'});
        


    } catch (error) {
        res.status(500).send(`Error in method updateUser : ${error}`);
    }
}