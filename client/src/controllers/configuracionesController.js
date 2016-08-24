var app = angular.module('App');

app.controller('configuracionesController', configuracionesController);

configuracionesController.$inject = ['$scope', '$location','$http'];

function configuracionesController ($scope, $location, $http) {
	
	$scope.obtenerConfiguracion =  function (articulo){
		
		$http.get('api/configuraciones/').success(function (data) {
	     	$scope.tasa_financiamiento = data[0].tasa_financiamiento;
	     	$scope.enganche			   = data[0].porcentaje_enganche;
	     	$scope.plazo_maximo 	   = data[0].plazo_maximo;
	    });
	}
	$scope.guardaConfiguracion =  function (articulo){
		var data = {
			tasa_financiamiento : $scope.tasa_financiamiento,
	     	enganche			: $scope.enganche,
	     	plazo_maximo 	    : $scope.plazo_maximo
		}
		$http.post('api/configuraciones/',data).success(function (data) {
	     	console.log(data);
	     	$scope.mensaje = true;

	    });
	   
	}

	$scope.obtenerConfiguracion();


}
