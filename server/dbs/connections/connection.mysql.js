// Dependencia para el manejo de MySql en NodeJs
// https://github.com/mysqljs/mysql
var mysql = require('mysql');

// Datos de configuración de las bases de datos
var configs = require('../dbs.config').mysql;

var messages = require('../dbs.messages');

// Contiene todas las conexiones realizadas, referenciadas por alias
var connections = [];

// Organiza los datos de configuración para solicitar peticiones
for (var db in configs) {
    if (configs.hasOwnProperty(db)) {
        var pool = mysql.createPool(configs[db]);
        dbConnect(pool, configs[db].alias);
    }
}

// Petición de conexión a la configuración recibida
function dbConnect(pool, alias) {
    pool.getConnection(function (err, connection) {
        if (err) {
            messages.error.bdConnectionError('MySql', alias, err);
            return;
        }

        connections.push({
            name: alias,
            pool: pool
        });

        messages.success.bdConnectionSuccess('MySql', alias);
    });
}

module.exports = {
    getPool: function (name) {
        if(!name) {
            console.log('Function getMySqlConnection requires a parameter "name"');
            res.status(500).send('Error interno');
            return;
        }

        for (var i = 0; i < connections.length; i++) {
            if(connections[i].name == name) {
                return connections[i].pool;
            }
        }
    }
};
