
var app = angular.module('App');

app.config(AppConfig);


AppConfig.$inject = ['$stateProvider', '$urlRouterProvider'];


function AppConfig ($stateProvider, $urlRouterProvider) {

    getStates().forEach(function(state, index) {
        $stateProvider.state(state.name, {
            url: '/'+state.url,
            templateUrl: 'views/' + state.name + '.html',
            controller: state.controller + 'Controller'
            
        });
    });

    
    $urlRouterProvider.otherwise('/index');
}

function getStates() {

    return [{
        name: 'logo',
        url: 'index',
        controller: 'logo'
    },{
        name: 'clientes',
        url: 'clientes',
        controller: 'clientes'
    },{
        name: 'articulos',
        url: 'articulos',
        controller: 'articulos'
    },{
        name: 'configuraciones',
        url: 'configuraciones',
        controller: 'configuraciones'
    },{
        name: 'ventas',
        url: 'ventas',
        controller: 'ventas'
    }];
}
