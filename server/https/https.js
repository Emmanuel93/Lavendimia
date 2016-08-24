/*  Autor Bioshark.mx
    Descripción: Archivo que añande la seguridad de https a la aplicación
    que este importandolo. */

// Dependencias
var https = require('https');
var fs = require('fs');

// Nuevo puerto
var httpsPort = 8000;

// Opciones para generar el servidor https
var options = {
    key: fs.readFileSync(__dirname + '/files/private.key'),
    cert: fs.readFileSync(__dirname + '/files/certificate.pem')
};

// Antes de llegar a cualquier ruta verifica si se llega desde un sitio
// con seguridad, si no, redirige y crea el servidor https
module.exports = function (app) {
    app.all('*', function(req, res, next){
        if (req.secure) {
            return next();
        };
        res.redirect('https://' + req.hostname + ':'  + httpsPort + req.url);
    });

    https.createServer(options, app).listen(httpsPort);
}
