var express = require('express');
var router = express.Router();

var Registro = require('../models/registro');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}
agora = new Date();




// Register User
router.post('/', function(req, res){

	var nome = req.body.controle;
	var hoje = new Date();
	var dia = hoje.getDate() + '/' + (hoje.getMonth()+1) + '/' + hoje.getFullYear();
	var hora = hoje.getHours() + ":" + hoje.getMinutes();
	var local = req.body.local;


	// Validation
	req.checkBody('controle', 'Campo deve ser preenchido').notEmpty();
	req.checkBody('local', 'Campo deve ser preenchido').notEmpty();


	var errors = req.validationErrors();

	if(errors){
		res.render('/',{
			errors:errors
		});
	} else {
		var newRegistro = new Registro({
			nome: nome,
			dia: dia,
			hora: hora,
			local: local
		});

		Registro.createRegistro(newRegistro, function(err, registro){
			if(err) throw err;
			console.log(registro);
		});

		req.flash('success_msg', 'Registro feito');

		res.redirect('/');
	}

	ultimos = Registro.getRegistrobyDia('2/12/2017', function(err, registro){
			if(err) throw err;
			console.log(registro);
		});

	console.log(ultimos)
});

module.exports = router;