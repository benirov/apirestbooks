const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');


mongoose.connect(config.db, { useNewUrlParser: true }, (error, res) =>{
	if (error){
		return console.log(`error to connect to db: ${error}`);
	}else{
		app.listen(config.port, ()=>{
			console.log(`server run http://localhost:${config.port}`);
		})
	}
});