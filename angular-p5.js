angular.module('angular-p5', [])
.factory('p5', ['$window', function($window) {
  return $window.p5;
}])
.directive('p5', [function() {
  return {
    restrict: 'EA',
    scope: {
      sketch: '@'
    },
    controller: 'p5Ctrl'
  };
}])
.controller('p5Ctrl', ['$scope', '$element', 'p5Instance', function($scope, $element, p5Instance) {
  $scope.$watch('sketch', function(sketch) {
    if(sketch) {
      p5Instance.init(sketch, $element[0]);
    }
    else {
      p5Instance.destroy();
    }
  });
  
  $scope.$on('$destroy', function() {
    p5Instance.destroy();
  });
}])
.service('p5Instance', ['$injector', 'p5', function($injector, p5) {
  var instance = null;
  
  this.init = function(sketch, node) {
    if(instance) {
      this.destroy();
    }
    if(angular.isString(sketch)) {
      sketch = $injector.get(sketch);
    }
    instance = new p5(sketch, node);
  };
  
  this.destroy = function() {
    if(instance) {
      instance.remove();
      instance = null;
    }
  };
}]);
