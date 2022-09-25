
const mongoose = require('mongoose');
const Calification = require('../model/calification');


exports.getCalificationByBook = async (req, res) =>{

	try {
		let idBookParam =  req.params.idBook;
		let califications = await Calification.find({idBook: idBookParam});	
		return res.status(200).send({califications})
	} catch (error) {
		return res.status(500).send({error: `Error in getCalificationByBook method : ${error}`})
	}
}

exports.insertCalification = async (req, res) =>{


	try {
		let calification = new Calification();
		calification.idBook = req.body.idBook;
		calification.email = req.body.email;
		calification.descripcion = req.body.descripcion;
		calification.puntuation = req.body.puntuation;
	  
		await calification.save();
		return res.status(200).send({message: `Calification saved`});
	} catch (error) {
		return res.status(500).send({message: `Error in insetCalification method : ${error}`})
	}

}