'use strict';


const mongoose = require('mongoose');


function getAuthors(req, res)
{

	let perPage = 10;
	let Start =  req.params.start || 1;
	mongoose.connection.db.collection("author", function (err, collection) {
		collection.find({}).toArray(function(error, authors)
		{
				if(error)
				{
					return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
				}
				else
				{

					collection.count((errorP, countP) =>
					{

						if(errorP)
						{
							return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
						}else
						{
							return res.status(200).send(
								{
									authors,
									current: Start,
									pages: Math.ceil(countP / perPage)
								
								})
						}

					});
					// return res.status(200).send({authors});	
				}
		});
		
	}).skip((perPage * Start) - perPage).limit(perPage);
}


function getAuthor(req, res)
{
	
	let id = req.params.id;
	var idS = mongoose.Types.ObjectId(id);

	mongoose.connection.db.collection("author", function (err, collection) {
		collection.find({ _id: idS }).toArray(function(error, author)
		{
			if(error)
			{
				return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
			}
			else
			{
				return res.status(200).send({author});	
			}
		});
		
	});
}

function getAuthorsLikeName(req, res)
{
	// const mongoose = require('mongoose');
	let string = req.params.string;
	console.log(string);
	mongoose.connection.db.collection("author", function (err, collection) {
		collection.find({"name":  {'$regex': string} }).toArray(function(error, author)
		{
			console.log(author);
			if(error)
			{
				return res.status(500).send({message: `Error al realizar la peticion: ${error}`});
			}
			else if(!author || author == [] || author.length == 0)
			{
				return res.status(404).send({message: `No Exiten autores por el criterio que busca: ${author}`});
			}
			else
			{
				return res.status(200).send({author});
			}
		});
		
	});
}


const Author = require('../model/author');

module.exports = 
{
	getAuthors,
	getAuthor,
	getAuthorsLikeName,
}







