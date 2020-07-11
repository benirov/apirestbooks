'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');




console.log("config.port", config.port);


mongoose.connect(config.db, (error, res) =>
{
	if (error)
	{
		return console.log(`Error al conectar con base de datos: ${error}`);
	}
	else
	{
		console.log("conexion stablecida");
		app.listen(config.port, ()=>
		{
			console.log(`API REST Corriendo en http://localhost:${config.port}`);
		})
	}
});