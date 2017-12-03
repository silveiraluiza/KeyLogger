var express = require('express');
var router = express.Router();

var Registro = require('../models/registro');
var hoje = new Date();

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){

	Registro.getRegistrobyDia(hoje.getDate() + '/' + (hoje.getMonth()+1) + '/' + hoje.getFullYear(), function(err, registro){
			if(err) throw err;
			var ultimos = [];
			for (i in registro){

				console.log(registro[i]);
				console.log(registro[i]['nome']);

				ultimos.push(registro[i]['nome'] + 
					' estava em posse da chave às: ' + registro[i]['hora'] + ' pode ser encontrado(a) no ' +
					registro[i]['local']);

				console.log(ultimos);
				
			}
			res.render('index', { message: ultimos});
		});

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
	var hoje = new Date;
	var nome = req.body.controle;
	var dia = hoje.getDate() + '/' + (hoje.getMonth()+1) + '/' + hoje.getFullYear();
	var hora = hoje.getHours() + ":" + hoje.getMinutes();
	var local = req.body.local;


	// Validation
	req.checkBody('controle', 'Campo deve ser preenchido').notEmpty();
	req.checkBody('local', 'Campo deve ser preenchido').notEmpty();


	var errors = req.validationErrors();

	if(errors){
		res.render('index',{
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
});

module.exports = router;