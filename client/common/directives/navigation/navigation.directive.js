/**
 * Created by Jackson on 9/30/16.
 */
app.directive('navigation', function(){
    return {
        restrict: 'EA',
        templateUrl: '/common/directives/navigation/navigation.template.html',
        controller: 'navCtrl'
    }
});