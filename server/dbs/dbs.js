/*  Autor Bioshark.mx
    Descripción: Se encarga de hacer visible el módulo de conexiones
    a las bases de datos. */

var sqlServer = require('./connections/connection.sqlServer');
var mySql = require('./connections/connection.mysql');

module.exports = {
    sqlServer: sqlServer,
    mySql: mySql
};
