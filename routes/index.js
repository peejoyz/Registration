

'use strict';
//const mongoose = require('mongoose');
const express = require ('express');
const bodyParser = require('body-parser');
var router = express.Router();
const ejs = require('ejs');
const engine = require('ejs-mate');
var app = express();
const mongoose = require('mongoose');
const register = mongoose.model('register');
const flash = require('connect-flash');
const session = require('express-session');




module.exports = function(router) {
	
	router.get('/', function(req, res){
		res.render('pages/index');
		
	});

	router.get('/about', function(req, res){
		res.render('pages/about');
	});

	router.get('/contact', function(req, res){
		res.render('pages/contact');
	});

	router.get('/register', (req, res) => {
	res.render('pages/register', {
		viewTitle : "Insert Student"
	});
});

	router.post('/list', (req, res) => {
		if(!req.body._id) {
			insertRecord(req, res);
		} else {
			updateRecord(req, res);
		}
		
	});


	function insertRecord(req, res) {
		var index = new register();
		index.name = req.body.name;  
		index.email = req.body.email;
		index.level = req.body.level;
		index.gender = req.body.gender;
		index.dob = req.body.dob;
		index.matric_no = req.body.matric_no;
		index.save((err, doc) => {
			if(!err)
			
			res.redirect('pages/list');
		else{
			console.log('Error during record insertion :' + err);
		}

			
		});
	}


	function updateRecord(req, res) { 
		register.findOneAndUpdate({ _id: req.body._id}, req.body, { new: true }, (err, doc) => {
			if(!err) {res.redirect('pages/list'); }
			else  {
				if (err.name == 'ValidationError'){
					handleValidationError(err, req.body);
					res.render("pages/update", {
						viewTitle: "Update Student",
						list: req.body
					});
				}
				else
					console.log('Error during record update: '+ err);
			}
		});

	}


	router.get('/list', (req, res) => {
		register.find((err, docs) => {
			if(!err) {
				
				res.render('pages/list', {
					list: docs

				});
			}
			else {
				console.log('Error in retrieving registration list :' + err);
			}
		});
	});


	router.get('/:id', (req, res) => {
		register.findById(req.params.id, (err, doc) => {
			if (!err) {
				res.render('pages/update', {
					viewTitle: "Update Student",
					list: doc
				})
			}
		});

	});



	router.get('/delete/:id', (req, res) => {
	register.findByIdAndRemove(req.params.id, (err, doc) => {
		if(!err){
			res.redirect('pages/list');
		}
		else{
			console.log('Error in student delete:' + err);
		}
	});

	});

	

}

//This is the Route Controller you're using 

	



