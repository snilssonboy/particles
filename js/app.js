// app.js
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })
        
         // UPGRADE PAGE =================================
        .state('upgrades', {
            url: '/upgrades',
            templateUrl: 'partial-upgrades.html'    
        });

    
        
});