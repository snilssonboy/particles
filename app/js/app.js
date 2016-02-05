// app.js
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/buildings');
    
    $stateProvider
        
        // HOME STATE AND NESTED VIEWS ========================================
        .state('buildings', {
            url: '/buildings',
            templateUrl: 'partial-buildings.html'
        })
        
        // UPGRADES PAGE =================================
        .state('upgrades', {
            url: '/upgrades',
            templateUrl: 'partial-upgrades.html'    
        })

        // MANAGERS PAGE =================================
        .state('managers', {
            url: '/managers',
            templateUrl: 'partial-managers.html'    
        })

        // ABOUT PAGE =================================
        .state('about', {
            url: '/about',
            templateUrl: 'partial-about.html'    
        });
        
});