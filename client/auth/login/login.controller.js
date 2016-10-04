/**
 * Created by Jackson on 9/30/16.
 */
app.controller('loginCtrl', function($location, auth){
    var user = this;

    user.credentials = {
        email: "",
        password: ""
    };

    user.onSubmit = function () {
        auth
            .login(user.credentials)
            .then(function(){
                $location.path('/panel');
            })
    }
});