/**
 * Created by Jackson on 9/30/16.
 */
app.controller('registerCtrl', function($location, auth){
    var vm = this;

    vm.credentials = {
        username: "",
        email: "",
        password: ""
    };

    vm.onSubmit = function(){
        auth
            .register(vm.credentials)
            .then(function(){
                $location.path('/')
            });

    }
});