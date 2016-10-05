/**
 * Created by Jackson on 9/30/16.
 */
app.controller('userCtrl', function($scope, auth, appData, $timeout, $mdBottomSheet, $mdToast, $mdDialog, $location){
    $scope.user = {};
    $scope.version = null;
    $scope.versions = null;
    $scope.premium = '';
    $scope.items = [];

    appData.getData()
        .then(function(res){
            $scope.user = res.data;
            $scope.premium = $scope.user.premium ? "Premium!" : "Purchase Required";
            $scope.items = [
                {name: 'Settings', icon: 'settings'},
                {name: 'Change Password', icon: 'lock'},
                ($scope.user.premium ? {name: 'Download', icon: 'get_app'} : {name: 'Purchase Atropos', icon: 'credit_card'}),
                {name: 'Send Feedback', icon: 'comment'}
            ];
        });

    $scope.loadVersions = function() {

        // Use timeout to simulate a 650ms request.
        return $timeout(function() {
            $scope.versions =  $scope.versions  || [
                    { id: 1, name: 'rel-1.2' },
                    { id: 2, name: 'rel-1.1.5' },
                    { id: 3, name: 'rel-1.1.2' },
                    { id: 4, name: 'rel-1.1.0' },
                    { id: 5, name: 'rel-1.0.0' }
                ];

        }, 650);
    };

    $scope.showBottomSheet = function(){
        $mdBottomSheet.show({
            templateUrl: 'user/bottom-sheet.html',
            controller: 'userCtrl'
        }).then(function(clickedItem) {
            // $mdToast.show(
            //     $mdToast.simple()
            //         .textContent(clickedItem['name'] + ' clicked!')
            //         .position('top right')
            //         .hideDelay(1500)
            // );

            $mdDialog.show({
                controller: 'userCtrl',
                templateUrl: 'user/download-dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            });
        });
    };

    $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
    };

    $scope.logout = function(){
        auth.logout();
        $location.path('/')
    }
});