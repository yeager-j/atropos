/**
 * Created by Jackson on 9/30/16.
 */
app.controller('navCtrl', function($location, auth, appData, $scope, $mdToast){
    $scope.isLoggedIn = auth.isLoggedIn();
    $scope.userData = {};

    $scope.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
        $scope.isLoggedIn = auth.isLoggedIn();
        getUser();
    });

    function getUser(){
        appData.getData()
            .then(function(response){
                $scope.userData = response.data;
            })
    }

    getUser();
});