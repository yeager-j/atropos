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

    var register = function (user) {
        return $http.post('/api/register', user).then(function (response) {
            saveToken(response.data.token);
            $route.reload();
        })
    };

    var edit = function (user, auth) {
        return $http({
            method: 'POST',
            url: '/api/edit',
            headers: {
                'authorization': 'Bearer ' + getToken()
            },
            data: user
        }).then(function (response) {
            saveToken(response.data.token);
            $route.reload();
        })
    };

    var password = function (user, auth) {
        return $http({
            method: 'POST',
            url: '/api/password',
            headers: {
                'authorization': 'Bearer ' + getToken()
            },
            data: user
        }).then(function (response) {
            $route.reload();
        })
    };

    var login = function (user) {
        return $http.post('/api/login', user).then(function (response) {
            saveToken(response.data.token);
            $route.reload();
        })
    };

    var toggleAdmin = function (user) {
        return $http({
            method: 'POST',
            url: '/api/admin',
            headers: {
                'authorization': 'Bearer ' + getToken()
            },
            data: user
        }).then(function (response) {
            $route.reload();
        })
    };

    var togglePremium = function (user) {
        return $http({
            method: 'POST',
            url: '/api/premium',
            headers: {
                'authorization': 'Bearer ' + getToken()
            },
            data: user
        }).then(function (response) {
            $route.reload();
        })
    };

    return {
        saveToken: saveToken,
        getToken: getToken,
        logout: logout,
        isLoggedIn: isLoggedIn,
        register: register,
        edit: edit,
        password: password,
        login: login,
        toggleAdmin: toggleAdmin,
        togglePremium: togglePremium
    };
});