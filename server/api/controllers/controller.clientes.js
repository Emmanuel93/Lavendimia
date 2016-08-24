
var mysql = require('../../dbs/dbs').mySql;
var call = require('../../dbs/handlers/handler.mysql');

var utils = require('../api.utils');

module.exports = {
	leer: function (req, res, next) {
		mysql.getPool('concredito').
        getConnection(function (err, connection) {
            if(err) { utils.regresarError(err, 500, res); return; }

            var params = [
                {value: null }
            ];

            call(connection, 'sp_clientes_obtener', params, function (data) {
                res.send(data);
            }, res);
        });
	},
    insertar: function(req, res, next){
        mysql.getPool('concredito').
        getConnection(function (err, connection) {
            if(err) { utils.regresarError(err, 500, res); return; }

            var params = [
                {value: req.body.codigo, isString:true },
                {value: req.body.nombre, isString:true },
                {value: req.body.apellido_paterno, isString:true },
                {value: req.body.apellido_materno, isString:true },
                {value: req.body.rfc, isString:true }

            ];

            call(connection, 'sp_clientes_agregar', params, function (data) {
                res.send(200);
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
            call(connection, 'sp_clientes_eliminar', params, function (data) {
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
                {value: req.body.nombre, isString:true },
                {value: req.body.apellido_paterno, isString:true },
                {value: req.body.apellido_materno, isString:true },
                {value: req.body.rfc, isString:true }

            ];

            call(connection, 'sp_clientes_editar', params, function (data) {
                res.send(200);
            }, res);
        });
    },
    siguienteCodigo: function(req, res, next){
        mysql.getPool('concredito').
        getConnection(function (err, connection) {
            if(err) { utils.regresarError(err, 500, res); return; }

            var params = [];

            call(connection, 'sp_clientes_siguiente_codigo', params, function (data) {
                res.send(data);
            }, res);
        });
    },
    clientesByName:function(req, res, next){
        mysql.getPool('concredito').
        getConnection(function (err, connection) {
            if(err) { utils.regresarError(err, 500, res); return; }

            var params = [
               {    value: req.params.nombre,isString:true   },
              ];

            call(connection, 'sp_clientes_obtener', params, function (data) {
                res.send(data);
            }, res);
        });
    }
};
