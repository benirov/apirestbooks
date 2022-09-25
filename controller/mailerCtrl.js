'use strict';

const nodemailer  = require('nodemailer'); 

// email sender function
exports.sendEmail = async (req, res) =>{

	let destinyEmail = process.env.EMAILACCOUNT;

    let subject = "Reporte de Libro";
    let description = req.body.description;
    let nombreLibro = req.body.nombre;
    let idBook = req.body.idBook;

	// tipo correo: 
	let HTMLTemplate = `<p>el siguiente libro esta reportado</p><br>nombre:  ${nombreLibro}
	<br>ID :+${idBook}+'<br>Motivo: ${description}`;

	
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
	    port: 587,
	    ignoreTLS: false,
        secure: false,
        auth: {
            user: process.env.EMAILACCOUNT,
            pass: process.env.PASSWORDEMAILACCOUNT
        }
    });


    // Definimos el email
var mailOptions = {
    from: process.env.EMAILACCOUNT,
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
exports.requestEmailBook = async (email, IdBook, nombre, type = false) =>{
    let destinyEmail = process.env.EMAILACCOUNT;
    let subject = "Solicitud";
    let nombreLibro = nombre;
    let idBook = IdBook;

	// tipo correo: 
    let HTMLTemplate = `<p>el siguiente libro fue solicitado</p><br>nombre:  ${nombre}
	<br>ID : ${IdBook}<br>email: '${email}`;
    if(type) {
        HTMLTemplate = `<p>el siguiente libro fue reportado</p><br>nombre:  ${nombre}
	<br>email: ${email}`;
    subject = "reporte";
    }

	
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
	    port: 587,
	    ignoreTLS: false,
        secure: false,
        auth: {
            user: process.env.EMAILACCOUNT,
            pass: process.env.PASSWORDEMAILACCOUNT
        }
    });


    // Definimos el email
    var mailOptions = {
        from: process.env.EMAILACCOUNT,
        to: destinyEmail,
        subject: subject,
        text: 'Correo',
        html: HTMLTemplate
    };

    // Enviamos el email
    transporter.sendMail(mailOptions, function(error, info){
        if (error){
            return false;
        } else {
            return true;
        }
    });
}


