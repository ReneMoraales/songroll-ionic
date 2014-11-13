angular.module('starter.directives', [])

.directive('sgrInput', [function() {
  return function(scope, element, attr) {
    element.on('input', function(event) {
      scope.$apply(function() { 
        scope.$eval(attr.sgrInput); 
      });
    });
  };
}]);