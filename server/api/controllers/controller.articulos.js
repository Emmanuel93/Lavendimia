// Dependencias
var mssql = require('mssql');

// Dependencias propias
var mysql = require('../../dbs/dbs').mySql;
var call = require('../../dbs/handlers/handler.mysql');

var utils = require('../api.utils');

module.exports = {
	insertar: function(req, res, next){
        mysql.getPool('concredito').
        getConnection(function (err, connection) {
            if(err) { utils.regresarError(err, 500, res); return; }

            var params = [
                {value: req.body.codigo, isString:true },
                {value: req.body.descripcion, isString:true },
                {value: req.body.modelo,isString:true },
                {value: req.body.precio },
                {value: req.body.existencia }

            ];

            call(connection, 'sp_articulos_agregar', params, function (data) {
                res.send(200);
            }, res);
        });
    },
	articuloByName: function (req, res, next) {
		mysql.getPool('concredito').
		getConnection(function (err, connection) {
		    if(err) { utils.regresarError(err, 500, res); return; }

			var params = [
              {  value: req.params.descripcion,isString:true },
             ];

		    call(connection, 'sp_articulos_obtener', params, function (data) {
		        res.send(data);
		    }, res);
		});
	},
	 siguienteCodigo: function(req, res, next){
        mysql.getPool('concredito').
        getConnection(function (err, connection) {
            if(err) { utils.regresarError(err, 500, res); return; }

            var params = [];

            call(connection, 'sp_articulos_siguiente_codigo', params, function (data) {
                res.send(data);
            }, res);
        });
    },leer: function (req, res, next) {
		mysql.getPool('concredito').
        getConnection(function (err, connection) {
            if(err) { utils.regresarError(err, 500, res); return; }

            var params = [
                {value: null}
            ];

            call(connection, 'sp_articulos_obtener', params, function (data) {
                res.send(data);
            }, res);
        });
	},
	  eliminar: function(req, res, next){
        mysql.getPool('concredito').
        getConnection(function (err, connection) {
            if(err) { utils.regresarError(err, 500, res); return; }

              var params = [
                     { value: req.params.id }
              ];
            console.log(req.body)
            call(connection, 'sp_articulos_eliminar', params, function (data) {
                res.status(200).send(true);
            }, res);
        });
    },
    actualizar: function(req, res, next){
        mysql.getPool('concredito').
        getConnection(function (err, connection) {
            if(err) { utils.regresarError(err, 500, res); return; }

            var params = [
                {value: req.body.id },
                {value: req.body.codigo, isString:true },
                {value: req.body.descripcion, isString:true },
                {value: req.body.modelo, isString:true },
                {value: req.body.precio },
                {value: req.body.existencia}

            ];
            console.log(params);

            call(connection, 'sp_articulos_editar', params, function (data) {
                res.send(200);
            }, res);
        });
    }
};
