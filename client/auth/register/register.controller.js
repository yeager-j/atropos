/**
 * Created by Jackson on 9/30/16.
 */
app.controller('registerCtrl', function($location, auth){
    var user = this;

    user.credentials = {
        usernamename: "",
        email: "",
        password: ""
    };

    user.submit = function(){
        auth
            .register(user.credentials)
            .error(err => alert(err))
            .then(()=>{
                $location.path('/')
            });

    }
});