/**
 * Created by Jackson on 9/30/16.
 */
app.controller('userCtrl', function ($scope, auth, feedback, appData, $timeout, $mdToast, $mdDialog, $location) {
    $scope.user = {};
    $scope.version = null;
    $scope.versions = null;
    $scope.premium = '';
    $scope.items = [];
    $scope.feedbackList = [];

    appData.getData()
        .then(function (res) {
            $scope.user = res.data;
            $scope.premium = $scope.user.premium ? "Premium!" : 'Purchase Required';
            $scope.items = [
                {name: 'Settings', icon: 'settings'},
                {name: 'Change Password', icon: 'lock'},
                ($scope.user.premium ? {name: 'Download', icon: 'get_app'} : {
                    name: 'Purchase Atropos',
                    icon: 'credit_card'
                })
            ];

            if ($scope.user.premium) {
                $scope.items.push({name: 'Send Feedback', icon: 'comment'});
            }
        });

    $scope.refresh = function(){
        $scope.feedbackList = [];
        return $timeout(function(){
            feedback.getFeedback()
                .then(function (res) {
                    for(var i = 0; i < res.data.length; i++){
                        (function(){
                            var n = i;
                            appData.getUser(res.data[i].uuid)
                                .then(function(response){
                                    res.data[n].author = response.data.username;
                                    res.data[n].email = response.data.email;
                                    $scope.feedbackList.push(res.data[n]);
                                });
                        })();
                    }
                });
        }, 1000);
    };

    $scope.delete = function(id){
        feedback.deleteFeedback(id)
            .then(function(res){
                console.log(res);
                $scope.refresh();
            })
    };

    $scope.loadVersions = function () {

        // Use timeout to simulate a 650ms request.
        return $timeout(function () {
            $scope.versions = $scope.versions || [
                    {id: 1, name: 'rel-1.2'},
                    {id: 2, name: 'rel-1.1.5'},
                    {id: 3, name: 'rel-1.1.2'},
                    {id: 4, name: 'rel-1.1.0'},
                    {id: 5, name: 'rel-1.0.0'}
                ];

        }, 650);
    };

    $scope.openMenu = function($mdOpenMenu, ev){
        $mdOpenMenu(ev);
    };

    $scope.showSettings = function(){
        $mdDialog.show({
            controller: 'settingsCtrl',
            templateUrl: 'user/settings/settings.template.html',
            clickOutsideToClose: true
        });
    };

    $scope.showPassword = function(){
        $mdDialog.show({
            controller: 'passwordCtrl',
            templateUrl: 'user/password/password.template.html',
            clickOutsideToClose: true
        });
    };

    $scope.showFeedback = function(){
        $mdDialog.show({
            controller: 'feedbackCtrl',
            templateUrl: 'user/feedback/feedback.template.html',
            clickOutsideToClose: true
        });
    };

    $scope.logout = function () {
        auth.logout();
        $location.path('/');
        $mdToast.show(
            $mdToast.simple()
                .textContent("You've been logged out.")
                .position('bottom right')
                .hideDelay(3000)
        );
    };

    $scope.refresh();
});