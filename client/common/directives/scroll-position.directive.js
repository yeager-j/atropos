/**
 * Created by Jackson on 9/30/16.
 */
app.directive('scrollPosition', function($window){
    return {
        scope: {
            scroll: '=scrollPosition'
        },

        link: function(scope, element, attrs){
            var windowEl = angular.element($window);
            var handler = function() {
                scope.scroll = $window.pageYOffset;
                console.log("changed");
            };

            windowEl.on('scroll', scope.$apply.bind(scope, handler));
            handler();
        }
    };
});