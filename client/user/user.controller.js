/**
 * Created by Jackson on 9/30/16.
 */
app.controller('userCtrl', function($scope, auth, appData, $timeout){
    $scope.user = {};
    $scope.version = null;
    $scope.versions = null;

    appData.getData()
        .then(function(res){
            $scope.user = res.data;
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
});