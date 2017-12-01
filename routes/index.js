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

var ultimos = Registro.getRegistrobyDia(agora.getDate() + '/' + agora.getMonth()+1 + '/' + agora.getFullYear());

// Register User
router.post('/', function(req, res){

	var nome = req.body.controle;
	var hoje = new Date();
	var dia = hoje.getDate() + '/' + (hoje.getMonth()+1) + '/' + hoje.getFullYear();
	var hora =  " às " + hoje.getHours() + ":" + hoje.getMinutes();


	// Validation
	req.checkBody('controle', 'Campo deve ser preenchido').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('/',{
			errors:errors
		});
	} else {
		var newRegistro = new Registro({
			nome: nome,
			dia: dia,
			hora: hora
		});

		Registro.createRegistro(newRegistro, function(err, registro){
			if(err) throw err;
			console.log(registro);
		});

		req.flash('success_msg', 'Registro feito');

		res.redirect('/');
	}
});

module.exports = router;