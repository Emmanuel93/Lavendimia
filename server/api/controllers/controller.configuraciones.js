// Dependencias
var mssql = require('mssql');

// Dependencias propias
var mysql = require('../../dbs/dbs').mySql;
var call = require('../../dbs/handlers/handler.mysql');

var utils = require('../api.utils');

module.exports = {
	
	leer: function (req, res, next) {
		mysql.getPool('concredito').
		getConnection(function (err, connection) {
		    if(err) { utils.regresarError(err, 500, res); return; }

			var params = [];

		    call(connection, 'sp_configuracion_obtener', params, function (data) {
		        res.send(data);
		    }, res);
		});
	},
	guardar:function (req, res, next) {
		mysql.getPool('concredito').
		getConnection(function (err, connection) {
		    if(err) { utils.regresarError(err, 500, res); return; }

			var params = [	
				{ value: req.body.tasa_financiamiento },
                { value: req.body.enganche },
                { value: req.body.plazo_maximo }

			];

		    call(connection, 'sp_configuracion_guardar', params, function (data) {
		        res.send(data);
		    }, res);
		});
	}
};
