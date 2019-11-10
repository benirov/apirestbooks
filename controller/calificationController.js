'use strict';


const mongoose = require('mongoose');


function getCalificationByBook(req, res)
{
	let idBookParam =  req.params.idBook;
	mongoose.connection.db.collection("califications", function (err, collection) {
		collection.find({idBook: idBookParam}, (error, califications) =>
		{
			console.log(califications);
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
  console.log(calification);

  calification.save((error, statusProduct) =>
  {
	// console.log(calification);
    if(error)
    {
      return res.status(500).send({message: `Error al guardar calificación : ${error}`})
    }
    else
    {
      return res.status(200).send({message: `calificación guardado con id : ${statusProduct}`});
    }
  })

}




const calificationModel = require('../model/calification');

module.exports = 
{
	getCalificationByBook,
	insetCalification
}







