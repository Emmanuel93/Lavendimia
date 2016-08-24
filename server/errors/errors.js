/*  Autor Bioshark.mx
    Descripción: Intercepta todas las peticiones al servidor que no hayan
    un destino anteriormente. Regresa código html con el mensaje de error
    correspondiente. */

// Dependecias
var path = require('path');

module.exports = function (app) {
    // Error 401
    app.use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res.status(401).sendFile(path.join(__dirname, './views/error.401.html' ));
      }
    });
    // Error 404
    app.use(function (req, res) {
        res.status(404).sendFile(path.join(__dirname, './views/error.404.html' ));
    });

    // Error 500
    app.use(function (err, req, res, next) {
        res.status(401).sendFile(path.join(__dirname, './views/error.500.html' ));
        console.log(err);
    });
}
