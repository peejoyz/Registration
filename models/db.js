const mongoose = require('mongoose');

mongoose.connect('mongodb://Peejoyz:p123456@ds127998.mlab.com:27998/registration', function(err){
	if(err){
		console.log(err);
	} else {
		console.log('connected to db');
	}
})

require('./register.model');