/**
 * Created by Jackson on 9/30/16.
 */
app.controller('loginCtrl', function($location, auth, $mdToast){
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
                $mdToast.show(
                    $mdToast.simple()
                        .content("You're now logged in! Welcome!")
                        .position('bottom right')
                        .action('OK')
                        .hideDelay(3000)
                        .parent('#user-cp')
                );
            })
    };
});