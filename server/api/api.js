/*  Autor Bioshark.mx
    Descripción: Se encarga de exportar las rutas del api. Este archivo es
    visible para ser importado como módulo */

// Importa las rutas
var router = require('./api.router');

// Exporta función que incorpora las rutas del api a la app que
// quiera utilizarlas
module.exports = function (app) {
    app.use(router);
};
