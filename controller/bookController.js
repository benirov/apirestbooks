const Book = require('../model/book');
const Usuario = require('../model/User');
const Booksrequested = require('../model/booksrequested');
const Author = require('../model/author');
const reported = require('../model/reported');
const mailerCtrl = require('../controller/mailerCtrl');
const { validationResult } = require('express-validator');

exports.getBooks = async (req, res) =>{


	try {
		let bestseller = req.query.bestseller ? req.query.bestseller : false;
		let Authores = req.query.authores ? req.query.authores.split('---') : false;
		let Categorie = req.query.categorie ? req.query.categorie.split('---') : false;

		let data = {}
		if(bestseller) data.bestseller = bestseller;
		if(Authores) data.author_sort = Authores;
		if(Categorie) data.series_index = Categorie;

		let perPage = 10;
		let Start =  req.params.start || 1;
		let dataBook = await Book.find(data).skip((perPage * Start) - perPage).limit(perPage).exec();
		const count = await Book.countDocuments();
		return res.status(200).send({
				data: dataBook,
				current: Start,
				pages: Math.ceil(count / perPage)
			
			})
		
	} catch (error) {
		return res.status(500).send({error: `Error in getBooks method : ${error}`})
	}
	
}

exports.getBooksrecent = async (req, res) =>{

	try {
		let d = new Date();
		d.setDate(d.getDate()-20);
		let start = d;
		let data =  await Book.find({create_at: { $gte: start, $lte: new Date()}}).exec();
		return res.status(200).send({data});
	} catch (error) {
		return res.status(500).send({error: `Error in getBooksrecent method : ${error}`})
	}	
}

exports.getBooksRequested = async (req, res) =>{

	try {

		let perPage = 10;
		let Start =  req.params.start || 1;
		let book = await Booksrequested.aggregate().sortByCount("idBook").skip((perPage * Start) - perPage).limit(perPage).exec();
		let count = await Book.countDocuments();
		return res.status(200).send({
				data: book,
				current: Start,
				pages: Math.ceil(count / perPage)
			
			})
		
	} catch (error) {
		return res.status(500).send({error: `Error in getBooksRequested method : ${error}`})
	}
}


exports.getBook = async (req, res) =>{

	try {
		let id = req.params.id;
		let book = Book.findById(id);
		return res.status(200).send({book})	
	} catch (error) {
		return res.status(500).send({error: `Error in getBook method : ${error}`})
	}
}

exports.getBookByCategory = async (req, res) =>{

	try {
		let category = req.params.category;
		let data = Book.find({'tag': category})
		return res.status(200).send({data});
	} catch (error) {
		return res.status(500).send({error: `Error in getBookByCategory method : ${error}`})
	}
}


exports.getBookByAuthor = async (req, res) =>{

	try {
		let author = req.params.author;
		let data = Book.find({'author_sort': author})	
		return res.status(200).send({data});
	} catch (error) {
		return res.status(500).send({error: `Error in getBookByAuthor method : ${error}`})
	}	
}



exports.requestedBook = async (req, res) =>{

	// Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
	let id = req.body.idBook;
	let idAuthor = req.body.idAuthor;

	try {

		let book = await Book.findById(id);

        //validamos que el libro exista
        if(!book) {
            return res.status(404).json({msg: 'book not found'})
        }

		//validamos que el usuario exista

        if(!user) {
            return res.status(404).json({msg: 'User not found'})
        }
		

		//validamos si ya existe un libro solicitado
		let booksRequested = await Booksrequested.find({idBook: id, idUser: user});

		if(booksRequested.length === 0){
			const booksRequestedNew = {
				idBook: id,
				idAuthor: idAuthor,
				idUser: user._id
			}

			// crea el nuevo registro
			let newRegister = new booksrequested(booksRequestedNew);
			// guardar solicitud
			await newRegister.save();
			//enviamos email 
			await mailerCtrl.requestEmailBook(user.email, id, book.title);

			return res.status(200).send({msg: 'request sended successfull'});
		}else{
			return res.status(404).json({msg: 'This book has already been requested before'});
		}
	} catch (error) {
		return res.status(500).send({error: `Error in requestedBook method : ${error}`})
    }

}


exports.reportBook = async (req, res) =>{

	// Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() }) 
    }

	const reportedBook = req.body;
	
	reportedBook.userId = req.usuario.id;
	try {

		//validamos que el libro no haya sido reportado por el usuario
		let reportedbook = await reported.findOne({userId: req.usuario.id, bookname: req.body.bookname, authorname: req.body.authorname});
        
        if(reportedbook) {
            return res.status(404).json({msg: 'Libro ya ha sido solicitado'});
        }
		let user = await Usuario.findById(req.usuario.id);
		//guardamos la solicitud
		const reportedBookNew = new reported(reportedBook);
		reportedBookNew.save();
		//enviamos email 
		await mailerCtrl.requestEmailBook(user.email, 0, reportedBook.bookname, true);
		return res.status(200).send({msg: 'Solicitud enviada correctamente'});
	} catch (error) {
		return res.status(500).send({error: `Error in reportBook method : ${error}`})
    }
}

