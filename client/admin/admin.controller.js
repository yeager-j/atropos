/**
 * Created by Jackson on 9/30/16.
 */
app.controller('adminCtrl', function($scope, appData, auth, $mdDialog){
    $scope.users = [];

    appData.getAllUsers()
        .then(function(response){
            $scope.users = response.data;
        });

    $scope.openMenu = function($mdOpenMenu, ev){
        $mdOpenMenu(ev);
    };

    $scope.showSettings = function(id){
        appData.getUser(id)
            .then(function(user){
                $mdDialog.show({
                    controller: 'adminSettingsCtrl',
                    templateUrl: 'user/settings/settings.template.html',
                    clickOutsideToClose: true,
                    locals: {
                        user: user.data
                    }
                });
            })
    };

    $scope.toggleAdmin = function(ev, id){
        $mdDialog.show($mdDialog.confirm()
            .title('Are you sure?')
            .textContent('Are you sure you want to modify this user\'s admin privileges?')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No'))
            .then(function(){
                auth.toggleAdmin({id: id})
            });

    };

    $scope.togglePremium = function(ev, id){
        $mdDialog.show($mdDialog.confirm()
            .title('Are you sure?')
            .textContent('Are you sure you want to modify this user\'s premium setting?')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No'))
            .then(function(){
                auth.togglePremium({id: id})
            });

    };
});