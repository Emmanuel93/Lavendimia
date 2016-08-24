var express = require('express');
var clientes = express.Router();
var controlador = require('./../controllers/controller.clientes');

clientes.route('/').get(controlador.leer);
clientes.route('/codigo').get(controlador.siguienteCodigo);
clientes.route('/clientesByName/:nombre').get(controlador.clientesByName);

// clientes.route('/:id').get(controlador.leerUno);
clientes.route('/').post(controlador.insertar);
clientes.route('/').put(controlador.actualizar);
clientes.route('/:id').delete(controlador.eliminar);

module.exports = clientes;
