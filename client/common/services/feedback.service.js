/**
 * Created by Jackson on 10/6/16.
 */
app.service('feedback', function($http, auth, $route){
    var postFeedback = function(feedback){
        return $http.post('/api/feedback', feedback).then(function(response){
            $route.reload();
        })
    };

    var getFeedback = function(){
        return $http.get('/api/feedback', {
            headers: {
                Authorization: 'Bearer '+ auth.getToken()
            }
        });
    };

    return {
        postFeedback: postFeedback,
        getFeedback: getFeedback
    }
});