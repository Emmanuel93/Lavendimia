var app = angular.module('App');

app.controller('articulosController', articulosController);

articulosController.$inject = ['$scope', '$location','$http'];

function articulosController ($scope, $location, $http) {
	$scope.articulo = {};
	$scope.editar = false;
	$scope.guardar = true;
	$scope.valido = false;
	
	$scope.listaArticulos = function(){
		$http.get('api/articulos').success(function (data) {
	        $scope.articulos = data;
	    });
	}

	$scope.agregarArticulo = function(){
		$scope.campos = ''
		var flag= true;
		debugger;
		if($scope.articulo.descripcion=='' || typeof($scope.articulo.descripcion) === 'undefined'){
			$scope.campos += 'Descripcion ';
			flag = false;
		}
		if($scope.articulo.precio=='' ||  typeof($scope.articulo.precio) === 'undefined'){
			$scope.campos += 'Precio ';
			flag = false
		}if($scope.articulo.existencia=='' ||  typeof($scope.articulo.existencia) === 'undefined'){
			$scope.campos += 'Existencia ';
			flag = false
		}
		
		if(flag){
			$http.post('api/articulos',$scope.articulo).success(function (data) {
		        $scope.articulo = {};
		        $scope.listaArticulos();
		    	$('#pop').click();
		    });
			
		}else{
			$scope.valido = true;
		}
	}	
	$scope.eliminarArticulo = function(id,index){

		$http.delete('api/articulos/'+id).success(function (data) {
	        $scope.articulos.splice(index, 1);
	    });
	}


	$scope.siguienteCodigo = function(){
		$scope.articulo = {};
		$http.get('api/articulos/codigo').success(function (data){
			debugger;
			$scope.articulo.codigo = data[0].codigo;

		});
	}
	$scope.listaArticulos();
}
