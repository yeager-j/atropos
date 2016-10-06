/**
 * Created by Jackson on 10/5/16.
 */
app.controller('passwordCtrl', function($scope, $mdDialog, auth, appData, $location, $mdToast){
    $scope.user = {
        currentPass: "",
        password: "",
        confirm: ""
    };

    appData.getData()
        .then(function(res){
            $scope.user = res.data;
        });

    $scope.edit = function(){
        auth
            .password({
                password: $scope.user.password,
                currentPass: $scope.user.currentPass,
                _id: $scope.user._id
            }, auth)
            .then(function(res){
                $mdDialog.cancel();
                auth.logout();
                $location.path('/');
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Password change successful! Please log in again.")
                        .position('bottom right')
                        .hideDelay(3000)
                );
            }, function(res){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Bad password!")
                        .position('bottom right')
                        .hideDelay(3000)
                );
            });
    }
});