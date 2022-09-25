'use strict';


const mongoose = require('mongoose');
const Author = require('../model/author');


exports.getAuthors = async (req, res) => {

	let perPage = 10;
	let Start =  req.params.start || 1;
	let solicitados = req.query.solicitados ? req.query.solicitados : false;
	let data = {};
	if(bestseller) data.bestseller = bestseller;
		Author.find({}).skip((perPage * Start) - perPage).limit(perPage).toArray(function(error, authors){
				if(error){
					return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
				}else{
					Author.count((errorP, countP) =>{

						if(errorP){
							return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
						}else{
							return res.status(200).send({
									authors,
									current: Start,
									pages: Math.ceil(countP / perPage)
								})
						}
					});
				}
		});
}

exports.getAuthorsrequested = async (req, res) => {
	let perPage = 10;
	let Start =  req.params.start || 1;
	Author.find({}).sort({solicitados : -1}).skip((perPage * Start) - perPage).limit(perPage).toArray(function(error, authors){
		if(error){
			return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
		}else{
			Author.count((errorP, countP) =>{

				if(errorP){
					return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
				}else{
					return res.status(200).send({
						authors,
						current: Start,
						pages: Math.ceil(countP / perPage)
					
					})
				}

			});
		}
	});
		
	
}

exports.getAllAuthors = async (req, res) => {

	Author.find({}).toArray(function(error, authors){
		if(error){
			return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
		}else{
			Author.count((errorP, countP) =>{

				if(errorP){
					return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
				}else{
					return res.status(200).send({
							authors,
						})
				}

			});
				// return res.status(200).send({authors});	
		}
	});
}


exports.getAuthor = async (req, res) => {
	
	let id = req.params.id;
	let idS = mongoose.Types.ObjectId(id);
	Author.find({ _id: idS }).toArray(function(error, author){
		if(error){
			return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
		}else{
			return res.status(200).send({author});	
		}
	});	
}

exports.getAuthorsLikeName = async (req, res) => {
	Author.find({"name":  {'$regex': string} }).toArray(function(error, author){
		if(error){
			return res.status(500).send({message: `Error al realizar la peticion: ${error}`});
		}else if(!author || author == [] || author.length == 0){
			return res.status(404).send({message: `No Exiten autores por el criterio que busca: ${author}`});
		}else{
			return res.status(200).send({author});
		}
	});
}