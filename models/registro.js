var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Registro Schema
var RegistroSchema = mongoose.Schema({
	nome: {
		type: String
	},
	dia: {
		type: String,
		index:true
	},
	hora: {
		type: String
		
	},
	local: {
		type: String
	}
});

var Registro = module.exports = mongoose.model('Registro', RegistroSchema);

module.exports.createRegistro = function(newRegistro, callback){
	        newRegistro.save(callback);
}

module.exports.getRegistrobyNome = function(nome, callback){
	var query = {nome: nome};
	Registro.find(query, callback);
}

module.exports.getRegistroById = function(id, callback){
	Registro.findById(id, callback);
}

module.exports.getRegistrobyDia = function(dia, callback){
	var query = {dia: dia};
	Registro.find(query).sort('-date').limit(5).exec(callback);
}
