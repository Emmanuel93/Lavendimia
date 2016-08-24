var express = require('express');
var ventas = express.Router();
var controlador = require('./../controllers/controller.ventas');

ventas.route('/codigo').get(controlador.siguienteCodigo);
ventas.route('/').post(controlador.insertar);
ventas.route('/').get(controlador.leer);
// ventas.route('/:id').get(controlador.leerUno);
/*ventas.route('/').post(controlador.insertar);
ventas.route('/').put(controlador.actualizar);
ventas.route('/:id').delete(controlador.eliminar);
*/
module.exports = ventas;
