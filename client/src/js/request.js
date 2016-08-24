var request = angular.module('Request', ['Utils','Message']);

request.factory('request', Request);

Request.$inject = ['$http','$rootScope','message'];

function Request ($http, $rootScope, message ) {

	var get = function (uri, success, error) {
		$http.get(uri).then(function (res) {
			if(success) success(res.data);
		}, function (res) {
			if(error) { error({ data: res.data, status: res.status, statusText: res.statusText }); }
			else { handlerError(res); }
		});
	};

    var post = function (uri, data, success, error) {
        $http.post(uri, data).then(function (res) {
            if(success) success(res.data);
        }, function (res) {
			if(error) { error({ data: res.data, status: res.status, statusText: res.statusText }); }
			else { handlerError(res); }
		});
    };

    var put = function (uri, data, success, error) {
        $http.put(uri, data).then(function (res) {
            if(success) success(res.data);
        }, function (res) {
			if(error) { error({ data: res.data, status: res.status, statusText: res.statusText }); }
			else { handlerError(res); }
		});
    };

    var del = function () {
        $http.delete(uri).then(function (res) {
            if(success) success(res.data);
        }, function (res) {
            if(error) { error({ data: res.data, status: res.status, statusText: res.statusText }); }
            else { handlerError(res); }
        });
    };

    var handlerError = function (error) {
    //Permite Mostrar los mensajes si hay un error en el sistema
        var time = function(){
            setTimeout(function(){
                $('.alert').fadeOut('slow');
                $rootScope.__messages = [];
            }, 5000);
        }

        switch(error.status) {
            case 500:
                $('.alert').fadeIn('slow');
                var errorStatus = 'Ha ocurrido un error interno en el sistema, por favor comuniquese con en el encargado.';
                message.error(errorStatus);
                time();
                break;
            case 404:
                $('.alert').fadeIn('slow');
                var errorStatus = 'No se encontre el recurso seleccionado.';
                message.warning(errorStatus);
                time();
                break;
            case 401:
                $('.alert').fadeIn('slow');
                var errorStatus = 'No tiene los permisos necesarios para acceder a este recurso solicitado.';
                message.warning(errorStatus);
                time();
                break;
        }

        // Aquí se mostrará el mensaje bonito
		//alert(error.status + ' ' + error.statusText);
        // console.log(error.status + ' ' + error.statusText);
        // console.log($rootScope.__messages);
    };

	return {
		get: get,
        post: post,
        put:put,
        delete: del
	};
}
