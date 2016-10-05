/**
 * Created by Jackson on 10/4/16.
 */
app.service('appData', function($http, auth){
    var getData = function(){
        return $http.get('/api/profile', {
            headers: {
                Authorization: 'Bearer '+ auth.getToken()
            }
        });
    };

    return {
        getData: getData
    }
});