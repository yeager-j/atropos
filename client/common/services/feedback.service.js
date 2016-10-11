/**
 * Created by Jackson on 10/6/16.
 */
app.service('feedback', function($http, auth, $route){
    var postFeedback = function(feedback){
        return $http({
            method: 'POST',
            url: '/api/feedback',
            headers: {
                'authorization': 'Bearer ' + auth.getToken()
            },
            data: feedback
        }).then(function(response){
            $route.reload();
        })
    };

    var getFeedback = function(){
        return $http.get('/api/feedback', {
            headers: {
                'authorization': 'Bearer ' + auth.getToken()
            }
        });
    };

    var deleteFeedback = function(id){
        return $http({
            method: 'GET',
            url: '/api/feedback/' + id,
            headers: {
                'authorization': 'Bearer ' + auth.getToken()
            }
        });
    };

    return {
        postFeedback: postFeedback,
        deleteFeedback: deleteFeedback,
        getFeedback: getFeedback
    }
});