/**
 * Created by Jackson on 9/30/16.
 */
app.service('auth', function ($http, $window, $route) {
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

        if (token) {
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    var currentUser = function () {
        if (isLoggedIn()) {
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return {
                email: payload.email,
                username: payload.username
            }
        }
    };

    var register = function (user) {
        return $http.post('/api/register', user).then(function (response) {
            saveToken(response.data.token);
            $route.reload();
        })
    };

    var edit = function (user, auth) {
        return $http.post('/api/edit', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer '+ auth.getToken()
            },
            data: user
        }).then(function (response) {
            saveToken(response.data.token);
            console.log("Token: ");
            console.log(response.data.token);
            $route.reload();
        })
    };

    var password = function (user, auth) {
        return $http.post('/api/password', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer '+ auth.getToken()
            },
            data: user
        }).then(function (response) {
            $route.reload();
        })
    };

    var login = function (user) {
        return $http.post('/api/login', user).then(function (response) {
            console.dir(response);
            saveToken(response.data.token);
            $route.reload();
        })
    };

    return {
        saveToken: saveToken,
        getToken: getToken,
        logout: logout,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser,
        register: register,
        edit: edit,
        password: password,
        login: login
    };
});