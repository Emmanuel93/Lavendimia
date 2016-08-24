/*  Autor Bioshark.mx
    Descripción: Encapsula el uso las llamadas a la base de datos sqlServer. */
var sql = require('mssql');

module.exports = function (db, procedure, params, callback, res, transaction) {
	// Crea la consulta
	var query;
	if(transaction) {
		query = new sql.Request(transaction);
	} else {
		query = new sql.Request(db);
	}

	// Ordena los parámetros
	query = orderParams(query, params);

	// Ejecuta la consulta
	query.execute(procedure, function(err, recordsets, returnValue) {
		if (err) {
			if (transaction) {
				transaction.rollback(function(error) {
					if(error) throw err;
					res.status(500).send(err.message);
				});
			} else {
				res.status(500).send(err.message);
			}
		} else  callback(recordsets[0]);
	});
};

var orderParams = function (query, params) {
	for (var i = 0; i < params.length; i++) {
		switch (params[i].type) {
			case 'i':
				query.input(params[i].name, sql.Int, params[i].value); break;
			case 'v':
				query.input(params[i].name, sql.VarChar(params[i].length), params[i].value); break;
			case 'c':
				query.input(params[i].name, sql.Char(params[i].length), params[i].value); break;
			case 'm':
				query.input(params[i].name, sql.Money, params[i].value); break;
			case 'd':
				query.input(params[i].name, sql.Decimal(params[i].presition, params[i].scale), params[i].value); break;
			case 'dt':
				query.input(params[i].name, sql.DateTime, params[i].value); break;
			case 'bi':
				query.input(params[i].name, sql.BigInt, params[i].value); break;
		}
	}

	return query;
};
