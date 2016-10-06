/**
 * Created by Jackson on 9/30/16.
 */
app.controller('userCtrl', function ($scope, auth, feedback, appData, $timeout, $mdBottomSheet, $mdToast, $mdDialog, $location) {
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

    feedback.getFeedback()
        .then(function (res) {
            for(var i = 0; i < res.data.length; i++){
                (function(){
                    var n = i;
                    appData.getUser(res.data[i].uuid)
                        .then(function(response){
                            res.data[n].author = response.data.username;
                            console.log(res.data[n]);
                            $scope.feedbackList.push(res.data[n]);
                        });
                })();
            }
        });

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

    $scope.showBottomSheet = function () {
        $mdBottomSheet.show({
            templateUrl: 'user/bottom-sheet.html',
            controller: 'userCtrl'
        }).then(function (clickedItem) {
            // $mdToast.show(
            //     $mdToast.simple()
            //         .textContent(clickedItem['name'] + ' clicked!')
            //         .position('top right')
            //         .hideDelay(1500)
            // );

            switch (clickedItem.name) {
                case "Settings":
                    $mdDialog.show({
                        controller: 'settingsCtrl',
                        templateUrl: 'user/settings/settings.template.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                    });
                    break;
                case "Change Password":
                    $mdDialog.show({
                        controller: 'passwordCtrl',
                        templateUrl: 'user/password/password.template.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                    });
                    break;
                case "Send Feedback":
                    $mdDialog.show({
                        controller: 'feedbackCtrl',
                        templateUrl: 'user/feedback/feedback.template.html',
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                    });
                    break;
            }
        });
    };

    $scope.listItemClick = function ($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
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
    }
});