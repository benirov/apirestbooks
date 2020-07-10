'use strict';

const nodemailer  = require('nodemailer'); 

// email sender function
function sendEmail(req, res)
{

	 let destinyEmail = 'freebookpersonala77@gmail.com';
	// var maillist = [
	// 	  'benirovielma.0@gmail.com',
	// 	  'beniro_vielma@hotmail.com',
	// 	];

		var subject = "Reporte de Libro";
		var description = req.body.description;
		var nombreLibro = req.body.nombre;
		var idBook = req.body.idBook;

	// tipo correo: 
	let HTMLTemplate = '<p>el siguiente libro esta reportado</p><br>nombre: '+ nombreLibro+
	'<br>ID : '+idBook+'<br>'+'Motivo: '+description;

	
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
	    port: 465,
	    secure: true,
        auth: {
            user: 'freebookpersonala77@gmail.com',
            pass: 'be.37/22'
        }
    });


    // Definimos el email
var mailOptions = {
    from: 'freebookpersonala77@gmail.com',
    to: destinyEmail,
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

function solicitarLibro(req, res)
{

	 let destinyEmail = 'freebookpersonala77@gmail.com';
	// var maillist = [
	// 	  'benirovielma.0@gmail.com',
	// 	  'beniro_vielma@hotmail.com',
	// 	];

		var subject = "Solicitud";
		var email = req.body.email;
		var nombreLibro = req.body.nombre;
		var idBook = req.body.idBook;

	// tipo correo: 
	let HTMLTemplate = '<p>el siguiente libro fue solicitado</p><br>nombre: '+ nombreLibro+
	'<br>ID : '+idBook+'<br>'+'email: '+email;

	
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
	    port: 465,
	    secure: true,
        auth: {
            user: 'freebookpersonala77@gmail.com',
            pass: 'be.37/22'
        }
    });


    // Definimos el email
var mailOptions = {
    from: 'freebookpersonala77@gmail.com',
    to: destinyEmail,
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

module.exports = 
{
    sendEmail,
    solicitarLibro
}


