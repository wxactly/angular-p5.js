angular.module('angular-p5', [])
.factory('p5', ['$window', function($window) {
  return $window.p5;
}])
.directive('p5', ['p5Wrapper', function(p5Wrapper) {
  return {
    restrict: 'EA',
    scope: {
      sketch: '@'
    },
    link: function(scope, element) {
      var wrapper = new p5Wrapper(element[0]);
      
      scope.$watch('sketch', function(sketch) {
        wrapper.setSketch(sketch);
      });
  
      scope.$on('$destroy', function() {
        wrapper.setSketch(null);
      });
    }
  };
}])
.factory('p5Wrapper', ['$injector', 'p5', function($injector, p5) {
  var p5Wrapper = function(node) {
    this.instance = null;
    this.node = node;
  };
  
  p5Wrapper.prototype = {
    setSketch: function(sketch) {
      if(this.instance) {
        this.instance.remove();
        this.instance = null;
      }
      
      if(sketch) {
        if(angular.isString(sketch)) {
          sketch = $injector.get(sketch);
        }
        this.instance = new p5(sketch, this.node);
      }
    }
  };
  
  return p5Wrapper;
}]);
