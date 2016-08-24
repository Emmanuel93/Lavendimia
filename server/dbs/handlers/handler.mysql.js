/*  Autor Bioshark.mx
    Descripción: Encapsula el uso las llamadas a la base de datos MySQL. */

module.exports = function (connection, sp, params, callback, res, transacction) {

	var handler = function (err, rows, fields) {
		if(err) {
			if(transacction) {
				connection.rollback(function () {
					res.status(500).send(err);
				});
			} else {
				res.status(500).send(err);
			}

			connection.release();
			return;
		}

		if(!transacction) connection.release();

		callback(rows[0]);
	};

	var queryString = getQueryString(sp, params);

	if(!queryString) {
		if(transacction) {
			connection.rollback(function () {
				connection.release();
			});
		} else {
			connection.release();
		}

		res.status(500).send('Parámetro indefinido o nulo');
		return;
	}

	var query = connection.query(queryString, handler);
};


var getQueryString = function (sp, params) {
	var queryString = 'CALL ' + sp + '(';

	for (var i = 0; i < params.length; i++) {
		if(!params[i].value && params[i].value !== 0) {
			params[i].value = 'null';
		}

		if(params[i].isString) {
			queryString += "'" + params[i].value + "'";
		} else {
			queryString += params[i].value;
		}

		if(i != (params.length - 1) ) {
			queryString += ', ';
		}
	}

	queryString += ')';
	console.log(queryString);

	return queryString;
};
