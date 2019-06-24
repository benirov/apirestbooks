'use strict';
// const Category = require('../model/category');

const mongoose = require('mongoose');


function getCategory(req, res)
{	

	// console.log(Category);
	mongoose.connection.db.collection("category", function (err, collection) {
		collection.find({}).toArray(function(error, category)
		{
			if(error)
			{
				return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
			}
			else
			{
				return res.status(200).send(category)
			}
		
		});
	});
}



module.exports = 
{
	getCategory
}