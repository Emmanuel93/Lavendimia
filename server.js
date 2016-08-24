

// Dependecias
var express = require('express');
// Dependencias propias "modulos"
// var httpsServer = require('./server/https/https');
var api = require('./server/api/api');
// var errors = require('./server/errors/errors');@

// Configuración del server
var server = require('./server/config');

// Crea servidor de express
var app = express();
// HTTPS
// httpsServer(app);

// Manejo de session


// Api "rutas"
api(app);


// Importación de conexiones a las bases de datos
require('./server/dbs/dbs');

// Archivos estáticos
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/client/tmp' ));
app.use(express.static(__dirname + '/client/src' ));

// Manejo de errores
// errors(app);

// Inicializa el servidor
app.listen(server.port, function () {
    console.log('The server is running at port ' + server.port);
});
