/**
 * Created by Jackson on 9/29/16.
 */
var app = angular.module('atropos', ['ngMaterial', 'ngRoute']);

app.controller('mainCtrl', ($scope, $route)=>{
    $scope.scroll = 0;


    $scope.isActive = path=>{
        if ($route.current && $route.current.regexp) {
            return $route.current.regexp.test(path);
        }
        return false;
    };
});

app.config(($routeProvider, $mdThemingProvider)=>{
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.view.html'
        })

        .when('/features', {
            templateUrl: 'js/views/features.html'
        })

        .when('/login', {
            templateUrl: 'js/views/register.html',
            controller: 'loginCtrl'
        })

        .otherwise('/');

    $mdThemingProvider.theme('dark')
        .dark();

    $mdThemingProvider.alwaysWatchTheme(true);
});