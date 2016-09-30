/**
 * Created by Jackson on 9/30/16.
 */
app.service('auth', function($http, $window){
    var saveToken = function (token) {
        $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
        return $window.localStorage['mean-token']
    };

    var logout = function () {
        $window.localStorage.removeItem('mean-token')
    };

    var isLoggedIn = function () {
        var token = getToken();
        var payload;

        if(token){
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        }else{
            return false;
        }
    };

    var currentUser = function () {
        if(isLoggedIn()){
            var token = getToken();
            var payload = payload.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return {
                email: payload.email,
                username: payload.username
            }
        }
    };

    var register = function (user) {
        return $http.post('/api/register', user).then(function(response){
            saveToken(response.token);
        })
    };

    var login = function (user) {
        return $http.post('/api/login', user).then(function(response){
            saveToken(response.token);
        })
    };

    return {
        saveToken: saveToken,
        getToken: getToken,
        logout: logout,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser
    };
});