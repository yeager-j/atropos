/**
 * Created by Jackson on 9/30/16.
 */
app.controller('navCtrl', function($location, auth, $scope, $mdToast){
    $scope.isLoggedIn = auth.isLoggedIn();
    $scope.currentUser = auth.currentUser();

    $scope.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
        $scope.isLoggedIn = auth.isLoggedIn();
        $scope.currentUser = auth.currentUser();
    });
});