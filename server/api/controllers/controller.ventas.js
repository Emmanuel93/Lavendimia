
var mysql = require('../../dbs/dbs').mySql;
var call = require('../../dbs/handlers/handler.mysql');

var utils = require('../api.utils');

module.exports = {
    leer: function(req, res, next){
        mysql.getPool('concredito').
        getConnection(function (err, connection) {
            if(err) { utils.regresarError(err, 500, res); return; }

            var params = [];

            call(connection, 'sp_ventas_obtener', params, function (data) {
                res.send(data);
            }, res);
        });
    },
	siguienteCodigo: function(req, res, next){
        mysql.getPool('concredito').
        getConnection(function (err, connection) {
            if(err) { utils.regresarError(err, 500, res); return; }

            var params = [];

            call(connection, 'sp_ventas_siguiente_codigo', params, function (data) {
                res.send(data);
            }, res);
        });
    },
    insertar: function(req, res, next){
        mysql.getPool('concredito').
        getConnection(function (err, connection) {
            if(err) { utils.regresarError(err, 500, res); return; }
            console.log(req.body);

            var insertarDetalle = function (detalles, venta_id) {
                if(detalles.length) {

                    var params = [
                        { value: venta_id },
                        { value: detalles[0].id },
                        { value: detalles[0].cantidad },
                        { value: detalles[0].precio },
                        { value: detalles[0].importe }
                    ];

                    call(connection, 'sp_ventas_agregar_detalles', params, function (data) {
                        detalles.shift();
                        insertarDetalle(detalles, venta_id);
                    }, res, true);

                } else {
                    connection.commit(function(err) {
                        if (err) {
                            return connection.rollback(function() { res.status(500).send(err); });
                        } else {
                            res.send({venta_id: venta_id});
                            connection.release();
                        }
                    });
                }
            };

            var params = [
                { value: req.body.cliente_id },
                { value: req.body.codigo, isString:true },
                { value: req.body.enganche },
                { value: req.body.bonificacion_enganche },
                { value: req.body.apagar },
                { value: 0 }
            ];

            connection.beginTransaction(function (err) {
                if (err) { res.status(500).send(err); return; }

                call(connection, 'sp_ventas_agregar', params, function (data) {
                    insertarDetalle(req.body.detalles, data[0].venta_id);
                }, res, true);
            });

        });
    }
};
