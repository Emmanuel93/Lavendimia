var app = angular.module('App');

app.config( InterceptorConfig );
app.factory('AuthInterceptor', AuthInterceptor);

InterceptorConfig.$inject = ['$httpProvider'];
AuthInterceptor.$inject = ['$cookies'];

function InterceptorConfig ( $httpProvider ) {
    $httpProvider.interceptors.push('AuthInterceptor');
}

function AuthInterceptor($cookies) {
    'use strict';
    return {
        request: function ( config ) {
            var token = $cookies.get('sensa_token');

            if ( token ) {
                config.headers = config.headers || {};
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config;
        }
    };
}
