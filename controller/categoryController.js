'use strict';



function getCategory(req, res)
{	
	Category.find({}, (error, Category) =>
	{
		if(error)
		{
			return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
		}
		else
		{
			return res.status(200).send(Category)
		}
		
	});
}



const Category = require('../model/categoryController');



module.exports = 
{
	getCategory
}