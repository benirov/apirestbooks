'use strict';

const nodemailer  = require('nodemailer');
const buildTemplate  = require('../services/buildTemplate');
const User = require('./userController.js');

const services  = require('../services/auth');

// email sender function
function sendEmail(req, res)
{

	 let destinyEmail = req.body.destinyEmail;
	// var maillist = [
	// 	  'benirovielma.0@gmail.com',
	// 	  'beniro_vielma@hotmail.com',
	// 	];

		subject = req.body.subject;

	// tipo correo: 
	let HTMLTemplate = buildTemplate.buildTemplate(1)

	
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
	    port: 465,
	    secure: true,
        auth: {
            user: 'perrunoacount@gmail.com',
            pass: 'perruno1234'
        }
    });


    // Definimos el email
var mailOptions = {
    from: 'perrunoacount@gmail.com',
    to: maillist,
    subject: subject,
    text: 'Correo',
    html: HTMLTemplate
};

// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        res.send(500, error.message);
    } else {
        res.status(200).jsonp(req.body);
    }
});
}



function buildEmail(type, data, token, destinyMail)
{
	 let destinyEmail;
	let subject;
	switch(type)
	{
		case 1:
		subject = "Confirmaciòn de correo";
		destinyEmail = data.email;
		break;

		case 2:
		subject = "Nueva mascota";
		destinyEmail = destinyMail;
		break;

		case 3:
		subject = "¡Alguien se ha interesado por tu mascota!";
		destinyEmail = destinyMail;
		break;

		case 4:
		subject = "Aprobaciòn de solicitud";
		destinyEmail = data.email;
		break;

		case 5:
		subject = " solicitud no aprobada";
		destinyEmail = data.email;
		break;
	}
		
	// tipo correo: 
	let HTMLTemplate = buildTemplate.buildTemplate(type, data, token)

	
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
	    port: 465,
	    secure: true,
        auth: {
            user: 'perrunoacount@gmail.com',
            pass: 'perruno1234'
        }
    });


    // Definimos el email
var mailOptions = {
    from: 'perrunoacount@gmail.com',
    to: destinyEmail,
    subject: subject,
    text: 'Correo',
    html: HTMLTemplate
};

// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log("error en enviar: "+error);
        res.send(500, error.message);
    } else {
        console.log("Email sent");
        res.status(200).send({message: "send email"});
    }
});
}


function verifyEmail(req, res)
{
	services.decodeToken(req.params.token).then(idUser => 
		{
			if(idUser === undefined || idUser == '' || !idUser)
			{
				return res.status(500).send({message: `Error al confirmar su correo`});	
			}else
			{
				User.updateEmail(idUser).then(userupdate =>
				{
					if(userupdate === undefined)
					{
						return res.status(500).send({message: `Error al confirmar su correo`});
					}
					else
					{
						return res.status(200).send({message: 'correo confirmado'});
					}
				}).catch((err) =>
				{
					return res.status(500).send({message: `Error al confirmar su correo`});
				});
			}
			
			

		}).catch((error) =>
		{			
			return res.status(500).send({message: `Error al confirmar su correo`});
		});
	


}

module.exports = 
{
	sendEmail,
	buildEmail,
	verifyEmail
}


