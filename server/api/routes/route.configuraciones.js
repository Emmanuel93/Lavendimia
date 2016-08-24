var express = require('express');
var configuraciones = express.Router();
var controlador = require('./../controllers/controller.configuraciones');

configuraciones.route('/').get(controlador.leer);
configuraciones.route('/').post(controlador.guardar);
/*ventas.route('/').get(controlador.leer);
//ventas.route('/:id').get(controlador.leerUno);
ventas.route('/').post(controlador.insertar);
ventas.route('/').put(controlador.actualizar);
ventas.route('/:id').delete(controlador.eliminar);
*/
module.exports = configuraciones;
