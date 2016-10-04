/**
 * Created by Jackson on 9/29/16.
 */
var app = angular.module('atropos', ['ngMaterial', 'ngRoute']);

app.controller('mainCtrl', function($scope, $route, auth){
    $scope.scroll = 0;


    $scope.isActive = function(path){
        if ($route.current && $route.current.regexp) {
            return $route.current.regexp.test(path);
        }
        return false;
    };
});

app.config(function($routeProvider, $mdThemingProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.view.html'
        })

        .when('/features', {
            templateUrl: 'home/features.view.html'
        })

        .when('/login', {
            templateUrl: 'auth/login/login.view.html',
            controller: 'loginCtrl',
            controllerAs: 'vm'
        })

        .when('/register', {
            templateUrl: 'auth/register/register.view.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
        })

        .when('/panel', {
            template: 'Hello, world!'
        })

        .otherwise({
            redirectTo: '/'
        });

    $mdThemingProvider.theme('dark')
        .dark();

    $mdThemingProvider.alwaysWatchTheme(true);
});

app.run(function($rootScope, $location, auth){
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
        console.log($location.path());
        if($location.path() === '/panel' && !auth.isLoggedIn()){
            $location.path('/');
        }
    });


});