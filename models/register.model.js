const mongoose = require('mongoose');

//User Schema
var registerSchema = new mongoose.Schema({
	name:{
		type: String
		
	},

	matric_no:{
		type: String
		
		
	},

	level:{
		type: String
		
		
	},

	gender:{
		type: String
		
		
	},

	dob:{
		type: String
		
		
	},

	email:{
		type: String
	
	
	},
});



mongoose.model('register', registerSchema);