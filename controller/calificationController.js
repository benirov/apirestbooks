'use strict';


const mongoose = require('mongoose');


function getCalificationByBook(req, res)
{
	let idBookParam =  req.params.idBook;
	mongoose.connection.db.collection("calification", function (err, collection) {
		collection.find({idBook: idBookParam}).toArray(function(error, califications)
		{
				if(error)
				{
					return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
				}
				else
				{

					
					return res.status(200).send(
						{
							califications,
						})
					// return res.status(200).send({authors});	
				}
		});
		
	});
}

function insetCalification(req, res)
{
  let calification = new calificationModel();
  calification.idBook = req.body.idBook;
  calification.email = req.body.email;
  calification.descripcion = req.body.descripcion;
  calification.puntuation = req.body.puntuation;

  calification.save((error, statusProduct) =>
  {
    if(error)
    {
      res.status(500).send({message: `Error al guardar calificación : ${error}`})
    }
    else
    {
      res.status(200).send({message: `calificación guardado con id : ${statusProduct}`});
    }
  })

}




const calificationModel = require('../model/calification');

module.exports = 
{
	getCalificationByBook,
	insetCalification,
}







