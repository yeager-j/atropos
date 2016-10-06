/**
 * Created by Jackson on 10/6/16.
 */
app.controller('feedbackCtrl', function($scope, $mdDialog, auth, appData, feedback, $location, $mdToast){
    $scope.user = {};
    $scope.feedback = {};

    appData.getData()
        .then(function(res){
            $scope.user = res.data;
        });

    $scope.submit = function(){
        feedback
            .postFeedback({
                title: $scope.feedback.title,
                content: $scope.feedback.text,
                priority: $scope.feedback.priority,
                uuid: $scope.user._id
            }, auth)
            .then(function(res){
                $mdDialog.cancel();
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("Thanks for the feedback! 'Preciate ya!")
                        .position('bottom right')
                        .hideDelay(3000)
                );
            }, function(res){
                $mdToast.show(
                    $mdToast.simple()
                        .textContent("You must be premium to submit feedback.")
                        .position('bottom right')
                        .hideDelay(3000)
                );
            });
    };
});