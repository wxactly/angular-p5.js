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
      var wrapper = p5Wrapper.create();
      
      scope.$watch('sketch', function(sketch) {
        wrapper.init(sketch, element[0]);
      });
  
      scope.$on('$destroy', function() {
        wrapper.destroy();
      });
    }
  };
}])
.factory('p5Wrapper', ['$injector', 'p5', function($injector, p5) {
  return {
    create: function() {
      return Object.create(this);
    },
    
    init: function(sketch, node) {
      this.destroy();
  
      if(sketch) {
        if(angular.isString(sketch)) {
          sketch = $injector.get(sketch);
        }
        this.instance = new p5(sketch, node);
      }
    },
    
    destroy: function() {
      if(this.instance) {
        this.instance.remove();
        this.instance = null;
      }
    }
  };
}]);
