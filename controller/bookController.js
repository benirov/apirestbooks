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
	res.header("Access-Control-Allow-Origin", "*");
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




// libro por autor y categoria
function getBookByAuthorAndCategoriy(req, res)
{ 
	let perPage = 10;
	let Start =  req.params.start || 1;
	let author = req.params.author;
	let serie =  req.params.serie;

	let Authores = author.split('---');
	let Series = serie.split('---');

	console.log(Authores);
	console.log(Series);


	var data = {
            "author_sort": { "$in" : Authores} ,
			"series_index": { "$in" : Series}
	}
	// let End =  req.params.end;
	console.log(data);
	BooksLibrary.find(data, (error, book) =>
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
			BooksLibrary.count(data, function(err, c) {
				return res.status(200).send(
					{
						book,
						current: Start,
						pages: Math.ceil(c / perPage)
					
					})
		   });

			// console.log("data: "+BooksLibrary.count(data));
			
		}
	}).skip((perPage * Start) - perPage).limit(perPage);
}

// libro por autores
function getBookByAuthors(req, res)
{
	let perPage = 10;
	let Start =  req.params.start || 1;
	let author = req.params.authors;

	let Authores = author.split('---');

	console.log(Authores);


	var data = {
            "author_sort": { "$in" : Authores} ,
	}
	// let End =  req.params.end;
	console.log(data);
	BooksLibrary.find(data, (error, book) =>
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
			BooksLibrary.count(data, function(err, c) {
				return res.status(200).send(
					{
						book,
						current: Start,
						pages: Math.ceil(c / perPage)
					
					})
		   });

			// console.log("data: "+BooksLibrary.count(data));
			
		}
	}).skip((perPage * Start) - perPage).limit(perPage);
}

// libro por autores
function getBookBynameBook(req, res)
{
	let perPage = 10;
	let Start =  req.params.start || 1;
	let name = req.params.name;


	var data = {
            "title": { "$regex" : '.*' + name + '.*' } ,
	}
	// let End =  req.params.end;
	console.log(data);
	BooksLibrary.find(data, (error, book) =>
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
			BooksLibrary.count(data, function(err, c) {
				return res.status(200).send(
					{
						book,
						current: Start,
						pages: Math.ceil(c / perPage)
					
					})
		   });

			// console.log("data: "+BooksLibrary.count(data));
			
		}
	}).skip((perPage * Start) - perPage).limit(perPage);
}

// libro por categorias
function getBookByCategories(req, res)
{
	let perPage = 10;
	let Start =  req.params.start || 1;
	let serie =  req.params.categories;

	let Series = serie.split('---');

	console.log(Series);


	var data = {
			"series_index": { "$in" : Series}
	}
	// let End =  req.params.end;
	console.log(data);
	BooksLibrary.find(data, (error, book) =>
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
			BooksLibrary.count(data, function(err, c) {
				return res.status(200).send(
					{
						book,
						current: Start,
						pages: Math.ceil(c / perPage)
					
					})
		   });

			// console.log("data: "+BooksLibrary.count(data));
			
		}
	}).skip((perPage * Start) - perPage).limit(perPage);
}

function updateBook(req, res)
{
	
	let id = req.params.id;
  	let update = req.body;
  	let data = { iccn: req.body.lccn };
  	console.log('id', id);
	console.log('data', data);
	var ObjectID = require('mongodb').ObjectID;
	var objId = new ObjectID(id); 

  BooksLibrary.findOneAndUpdate({_id: objId}, data, (error, updateBook) =>
  {
    if(error)
    {
      res.status(500).send({message: `error al actualizar el libro ${error}`});
    }
    else
    {
      res.status(200).send({book: updateBook});
    }
  });
}



const BooksLibrary = require('../model/book');



module.exports = 
{
	getBooks,
	getBook,
	getBookByCategory,
	getBookByAuthor,
	getBookByAuthorAndCategoriy,
	getBookByAuthors,
	getBookByCategories,
	getBookBynameBook,
	updateBook
}