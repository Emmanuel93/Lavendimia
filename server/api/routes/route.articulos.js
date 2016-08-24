var express = require('express');
var articulos = express.Router();
var controlador = require('./../controllers/controller.articulos');

articulos.route('/').get(controlador.leer);
articulos.route('/codigo').get(controlador.siguienteCodigo);
articulos.route('/').post(controlador.insertar);
articulos.route('/articuloByName/:descripcion').get(controlador.articuloByName);
articulos.route('/:id').delete(controlador.eliminar);
articulos.route('/').put(controlador.actualizar);

module.exports = articulos;
