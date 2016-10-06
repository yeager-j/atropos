/**
 * Created by Jackson on 10/5/16.
 */
app.controller('settingsCtrl', function($scope, $mdDialog, auth, appData, $location, $mdToast){
    $scope.user = {};

    appData.getData()
        .then(function(res){
            $scope.user = res.data;
        });

    $scope.edit = function(){
        auth
            .edit({
                username: $scope.user.username,
                email: $scope.user.email,
                _id: $scope.user._id
            }, auth)
            .then(function(){
                $location.path('/panel');
                $mdDialog.cancel();
            }, function(res){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Email already registered!")
                        .position('bottom right')
                        .hideDelay(3000)
                );
            });
    }
});