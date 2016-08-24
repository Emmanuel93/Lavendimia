var app = angular.module('App');

app.controller('clientesController', clientesController);

clientesController.$inject = ['$scope', '$location','$http'];

function clientesController ($scope, $location, $http) {
	
	$scope.cliente = {};
	$scope.editar = false;
	$scope.guardar = true;
	$scope.valido = false;
	
	$scope.listaClientes = function(){
		$http.get('api/clientes').success(function (data) {
	        $scope.clientes = data;
	    });
	}

	$scope.agregarCliente = function(){
		$scope.campos = ''
		var flag= true;
		debugger;
		if($scope.cliente.nombre=='' || typeof($scope.cliente.nombre) === 'undefined'){
			$scope.campos += 'Nombre ';
			flag = false;
		}
		if($scope.cliente.apellido_paterno=='' ||  typeof($scope.cliente.apellido_paterno) === 'undefined'){
			$scope.campos += 'Apellido Paterno ';
			flag = false
		}if($scope.cliente.rfc=='' ||  typeof($scope.cliente.rfc) === 'undefined'){
			$scope.campos += 'RFC ';
			flag = false
		}
		
		if(flag){
			$http.post('api/clientes',$scope.cliente).success(function (data) {
		        $scope.cliente = {};
		        $scope.listaClientes();
		    	$('#pop').click();
		    });
			
		}else{
			$scope.valido = true;
		}
	}	

	$scope.eliminarCliente = function(id,index){

		$http.delete('api/clientes/'+id).success(function (data) {
	        $scope.clientes.splice(index, 1);
	    });
	}
	$scope.cargarCliente = function( cliente ){
		$scope.editar = true;
		$scope.guardar = false;
		$scope.cliente = cliente;
		$('#show').click();
	}

	$scope.Editarcliente = function (){
		$http.put('api/clientes',$scope.cliente).success(function (data) {
	        $scope.cliente = {};
	        $scope.listaClientes();
	        $('#pop').click();
	    	    
	     });
	}

	$scope.siguienteCodigo = function(){
		$scope.cliente = {};
		$http.get('api/clientes/codigo').success(function (data){
			debugger;
			$scope.cliente.codigo = data[0].codigo;

		});
	}
	$scope.listaClientes();

	
}
