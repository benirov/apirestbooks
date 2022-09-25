const Categories = require('../model/category');

exports.getCategories = async (req, res) =>{

	
	try {
		let categories = await Categories.find({});
		return res.status(200).send(categories)
	} catch (error) {
		return res.status(500).send({error: `Error in getCategories method : ${error}`})
	}
}