'use strict';

const nodemailer  = require('nodemailer');

// email sender function
function sendEmail(req, res)
{

	 let destinyEmail = req.body.destinyEmail;
	// var maillist = [
	// 	  'benirovielma.0@gmail.com',
	// 	  'beniro_vielma@hotmail.com',
	// 	];

		subject = req.body.subject;
		nombreLibro = req.body.nombre;
		idBook = req.body.idBook;

	// tipo correo: 
	let HTMLTemplate = '<p>el siguiente libro esta reportado</p><br>nombre: '+ nombreLibro+
	'<br>ID : '+idBook;

	
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

module.exports = 
{
	sendEmail
}


