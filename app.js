'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app =  express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
const api = require('./route'); 

app.use(bodyParser.urlencoded({extended : false}));  
app.use(bodyParser.json());

app.use('/api', api);

module.exports = app;
