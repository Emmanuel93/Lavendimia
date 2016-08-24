/*
    Autor: Bioshark.mx
    Descripción: Lee los archivos de la carpeta "routes" encontrada que debe 
    estar ubicada al mismo nivel que ester achivo. Los nombres de los archivos
    son importados como rutas para la api.
*/

// Dependencias
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

//  Archivos importados
var messages = require('./api.messages');

var router = express.Router();

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

// Se obtienes los nombres de los archivos y carpetas
var directory = __dirname + '/routes';
fs.readdir(directory, function (err, names) {
    if(err) throw err;
    for (var i = 0; i < names.length; i++) {
        checkIfIsFile(names[i]);
    }
});

// Verifica que el elemento encontrado en el directorio es archivo o carpeta
var checkIfIsFile = function (name) {
    var directory = __dirname + '/routes/' + name;
    fs.stat(directory, function (err, stats) {
        if(!stats.isDirectory()) {
            importRoute(name);
        }
    });
};

// Importa una ruta a la api con el nombre del archivo del directorio "routes"
var importRoute = function (name) {
    var regexp = /route./;
    var route = require(__dirname + '/routes/' + name.slice(0,-3));

    if(prefixRouteExist(name, regexp)) {
        name = name.replace(regexp, '');
    } else {
        messages.warning.routePrefix(name.slice(0, -3), name);
    }

    var uri = '/api/' + name.replace(regexp, '').slice(0,-3);
    router.use(uri, route);
};

// Verifica si el achivo tiene el prefijo "route"
var prefixRouteExist = function(name, regexp) {
    return regexp.test(name);
};

module.exports = router;
