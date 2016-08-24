// Dependencia para el manejo de SQLServer en NodeJs
// https://www.npmjs.com/package/mssql
var sql = require('mssql');

// Datos de configuración de las bases de datos
var sqlServer = require('../dbs.config').sqlServer;

var messages = require('../dbs.messages');

// Contiene todas las conexiones realizadas, referenciadas por alias
var connections = [];

// Organiza los datos de configuración para solicitar peticiones
for (var db in sqlServer) {
    if (sqlServer.hasOwnProperty(db)) {
        var config = {
            user: sqlServer[db].user,
            password: sqlServer[db].password,
            server: sqlServer[db].server,
            database: sqlServer[db].database,
            options: {
                encrypt: sqlServer[db].windowsAzure ? true : false
            }
        };

        var connection = new sql.Connection(config);

        dbConnect(connection, sqlServer[db].alias);
    }
}

// Petición de conexión a la configuración recibida
function dbConnect(connection, alias) {
    connection.connect(function (err) {
        if (err) {
            messages.error.bdConnectionError('SQLServer', alias, err);
            return;
        }
        connections.push({
            name: alias,
            database: connection
        });

        messages.success.bdConnectionSuccess('SQLServer', alias);
    });
}

module.exports = {
    getSQLServerConnection: function (name) {
        if(name) {
            for (var i = 0; i < connections.length; i++) {
                if(connections[i].name == name) {
                    return connections[i].database;
                }
            }
            console.log('Database was not found');
        } else {
            console.log('Function getSQLServerConnection requires a parameter "name"');
        }
    }
};
