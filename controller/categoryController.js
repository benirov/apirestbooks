'use strict';
const Category = require('../model/category');


function getCategory(req, res)
{	

	console.log(Category);
	Category.find({}, (error, category) =>
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
}



module.exports = 
{
	getCategory
}