'use strict';



function getBooks(req, res)
{

	let perPage = 10;
	let Start =  req.params.start || 1;
	//let End =  req.params.end;
	
	BooksLibrary.find({}, (error, book) =>
	{
		if(error)
		{
			return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
		}
		else
		{
			BooksLibrary.count((errorP, countP) =>
			{
				if(errorP)
				{
					return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
				}else
				{
					return res.status(200).send(
						{
							book,
							current: Start,
							pages: Math.ceil(countP / perPage)
						
						})
				}
			});
		}
		
	}).skip((perPage * Start) - perPage).limit(perPage);
}


function getBook(req, res)
{
	let id = req.params.id;
	BooksLibrary.findById(id, (error, book) =>
	{
		if(error)
		{
			return res.status(500).send({message: `error al realizar la peticiòn: ${error}`});
		}
		else if(!book)
		{
			return res.status(404).send({message: `El libro no existe`});	
		}else
		{
			return res.status(200).send({book})
		}
	});
}

function getBookByCategory(req, res)
{
	let category = req.params.category;

	BooksLibrary.find({'flags': category}, (error, book) =>
	{
		if(error)
		{
			return res.status(500).send({message: `Error al realizar la peticion: ${error}`});
		}
		else if(!book || book == [] || book.length == 0)
		{
			return res.status(404).send({message: `No Exite Libro en Categoria: ${error}`});
		}
		else
		{
			return res.status(200).send({book});
		}
	});
}

function getBookByAuthor(req, res)
{
	let author = req.params.author;
	// let Start =  req.params.start;
	// let End =  req.params.end;

	BooksLibrary.find({'author_sort': author}, (error, book) =>
	{
		if(error)
		{
			return res.status(500).send({message: `Error al realizar la peticion: ${error}`});
		}
		else if(!book || book == [] || book.length == 0)
		{
			return res.status(404).send({message: `No Exite Libro asociado a autor seleccionado: ${error}`});
		}
		else
		{
			return res.status(200).send({book});
		}
	})//limit(Number(End)).skip(Number(Start));
}



const BooksLibrary = require('../model/book');



module.exports = 
{
	getBooks,
	getBook,
	getBookByCategory,
	getBookByAuthor,
}