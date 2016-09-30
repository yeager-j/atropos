/**
 * Created by Jackson on 9/30/16.
 */
app.directive('scrollPosition', $window=>{
    return {
        scope: {
            scroll: '=scrollPosition'
        },

        link: (scope, element, attrs)=>{
            var windowEl = angular.element($window);
            var handler = function() {
                scope.scroll = $window.pageYOffset;
            };

            windowEl.on('scroll', scope.$apply.bind(scope, handler));
            handler();
        }
    };
});