var app = angular.module('App');

app.controller('ventasController', ventasController);

ventasController.$inject = ['$scope', '$location','$http'];

function ventasController ($scope, $location, $http) {

	$scope.clientes = [];
	$scope.abonos = [];
	$scope.articulos = [];
	$scope.venta ={};
	$scope.ventas = [];
	$scope.detalles = [];
	$scope.tasa_financiamiento = 0;
	$scope.enganche = 0;
	$scope.plazo_maximo = 0;
	$scope.tablaAbonos = false;
	$scope.valido = false;
	$scope.existente = false;
	$scope.configuracion=false;
	
	$scope.obtenerCodigo = function(){

		$http.get('api/ventas/codigo').success(function (data) {
	        $scope.venta.codigo = data[0].codigo;

	    });
	}
	
	$scope.obtenerVentas = function(){

		$http.get('api/ventas/').success(function (data) {
	        $scope.ventas = data;

	    });
	}

	$scope.addLinea = function(){
		var detalle = {
			'id':'',
			'codigo': '',
			'descripcion' : '',
			'modelo' : '',
			'cantidad' : '',
			'precio':'',
			'importe': ''	
		}
		$scope.detalles.push(detalle);
	}
	$scope.quitarLinea = function(indice){
		 $scope.detalles.splice(indice, 1);
		 $scope.subtotales();
	}
	$scope.obtenerClientes = function (cliente){
		$http.get('api/clientes/clientesByName/'+cliente).success(function (data) {
	     	$scope.clientes = data;
	    });
	    return $scope.clientes;
	}
	$scope.obtenerArticulo =  function (articulo){
		$http.get('api/articulos/articuloByName/'+articulo).success(function (data) {
	     	$scope.articulos = data;
	    });
	    return  $scope.articulos;
	}
	$scope.asignaCliente = function(cliente){
		$scope.venta.rfc = cliente.rfc;
	}
	$scope.asignaArticulo = function(indice,cliente){
		
		$scope.detalles[indice].id      = cliente.id;
		$scope.detalles[indice].codigo 		= cliente.codigo;
		$scope.detalles[indice].descripcion = cliente.descripcion;
		$scope.detalles[indice].modelo 		= cliente.modelo;
		$scope.detalles[indice].cantidad 	= 0;
		$scope.detalles[indice].existencia  = cliente.existencia;
		var test = ($scope.tasa_financiamiento * $scope.plazo_maximo).toFixed( 2 );
		$scope.detalles[indice].precio 		= cliente.precio*(1 + ( (($scope.tasa_financiamiento * $scope.plazo_maximo).toFixed( 2 ) )/100 ));
		$scope.importes(indice);
	}
	$scope.importes = function(indice){

		$scope.detalles[indice].importe = parseFloat($scope.detalles[indice].cantidad)  * parseFloat($scope.detalles[indice].precio);
		$scope.subtotales();
	}

	$scope.subtotales = function(){
		var subtotal = 0;
		for(var i =0;i<$scope.detalles.length;i++ ){
			subtotal += $scope.detalles[i].importe;
		}
		$scope.venta.subtotal = subtotal;
		$scope.venta.enganche = (subtotal*($scope.enganche/100)).toFixed(2);
		$scope.venta.bonificacion_enganche = ($scope.venta.enganche *((($scope.tasa_financiamiento * $scope.plazo_maximo).toFixed( 2 )) /100)).toFixed(2);
		$scope.venta.total = ($scope.venta.subtotal - $scope.venta.enganche - $scope.venta.bonificacion_enganche).toFixed(2);
		$scope.venta.totalContado = ($scope.venta.total / (1+ ($scope.tasa_financiamiento * $scope.plazo_maximo)/100)).toFixed(2);
	}
	$scope.obtenerConfiguracion =  function (articulo){
		
		$http.get('api/configuraciones/').success(function (data) {
	     	$scope.tasa_financiamiento = data[0].tasa_financiamiento;
	     	$scope.enganche			   = data[0].porcentaje_enganche;
	     	$scope.plazo_maximo 	   = data[0].plazo_maximo;
	    });
	}
	$scope.mostrarAbonos = function (){
		debugger;
		$scope.generaAbonos();
	}
	$scope.generaAbonos =  function(){
		var validacion = true;
		for(var i = 0 ; i<$scope.detalles.length; i ++ ){
			if($scope.detalles[i].cantidad == ''){
				validacion = false;
			}else if($scope.detalles[i].cantidad > $scope.detalles[i].existencia ){
				existente = true;
				validacion = false;
			}
		}
		if((validacion && $scope.detalles.length > 0) && $scope.clientes.length>0){
			for(var i = 2 ; i<$scope.plazo_maximo; i = i + 3 ){
				var totalpago = $scope.venta.totalContado * ( 1+( ( $scope.tasa_financiamiento * (i+1) ).toFixed(2)/100 ) );
				var abono = {
					meses : i+1,
					abono: (totalpago/(i+1)).toFixed(2),
					totalApagar: totalpago.toFixed(2),
					ahorro : ($scope.venta.total-totalpago).toFixed(2)
				}
				$scope.abonos.push(abono);
			}
			$scope.tablaAbonos = true;
			$scope.valido=false;
		}else{
			$scope.valido=true;
		}

	}
	$scope.cancelarVenta =  function(){
		$scope.clientes = [];
		$scope.abonos = [];
		$scope.articulos = [];
		$scope.venta = {};
		$scope.detalles = [];
		$scope.existente = false;
		$scope.tablaAbonos = false;
		$scope.valido = false;	
		$scope.obtenerCodigo();
	}
	$scope.cancelarPago = function (){
		$scope.tablaAbonos = false;
		$scope.abonos = [];
	}
	$scope.guardarVenta = function () {
		$scope.venta.cliente_id = $scope.clientes[0].id;
		$scope.venta.detalles = $scope.detalles;
		console.log($scope.venta);

		$http.post('api/ventas/',$scope.venta).success(function (data) {
	     	console.log(data);
	     	$scope.cancelarVenta();
	     	$scope.obtenerCodigo();
	     	$scope.obtenerVentas();

	    });
	}
	$scope.obtenerVentas();
	$scope.obtenerCodigo();
	$scope.obtenerConfiguracion();
}
