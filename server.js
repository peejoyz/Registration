require('./models/db');

const express = require ('express');
const path = require('path');
var router = express.Router();
const bodyParser = require ('body-Parser');
const morgan = require ('morgan');
const mongoose = require('mongoose');
const ejs = require('ejs');
const engine = require('ejs-mate');
const session = require('express-session');
const index = require('./controllers/indexController');

var port = process.env.PORT || 9000;
var controllers = require('./controllers/indexController.js');
var routes = require('./routes/index');

require('./models/register.model.js');



var app = express();





app.use('/public', express.static(process.cwd() + '/public'));


app.set('view engine', 'ejs');
app.engine('js', engine);





app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

routes(app);


app.use(morgan('dev'));




app.listen(9000,function(err){
	if(err){
		console.log(err);
	}else{
		console.log('connected in port 9000');
	}
});


app.use('/pages', index);

