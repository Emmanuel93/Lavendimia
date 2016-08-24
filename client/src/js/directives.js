var app = angular.module('App');

app.directive('productItem', function() {
    return {
        restrict: 'AE',
		// controller: 'cotizacionController',
        templateUrl: './views/products-items/index.html'
    };
});


