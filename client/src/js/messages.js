(function(){
	var app = angular.module('Message',[]);

	app.factory('message', function($rootScope){
		$rootScope.__messages = [];
		var message = {};

		message.success = function(message) {
			$rootScope.__messages.push({
				type: 'success',
				message: message
			});
		};

		message.warning = function(message) {
			$rootScope.__messages.push({
				type: 'warning',
				message: message
			});
		};

		message.error = function(message) {
			$rootScope.__messages.push({
				type: 'error',
				message: message
			});
		};

		return message;

	});

	app.directive('alertMessage', function($timeout){
		// Runs during compile
		return {
			restrict: 'AE',
			replace:true,
			templateUrl: 'views/alerts/index.html',
			link: function($scope, iElm, iAttrs, controller) {
			}
		};
	});
})();
