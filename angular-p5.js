angular.module('angular-p5', [])
.service('p5', ['$window', function($window) {
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
.service('p5Instance', ['$injector', 'p5', function($injector, p5) {
  var _p5 = null;
  
  var p5Instance = function(element) {
    this.element = element;
  };
  
  p5Instance.prototype = {
    init: function(sketch) {
      if(_p5) {
        this.destroy();
      }
      if(angular.isString(sketch)) {
        sketch = $injector.get(sketch);
      }
      _p5 = new p5(sketch, this.element);
    },
    
    destroy: function() {
      if(_p5) {
        _p5.remove();
        _p5 = null;
      }
    }
  };
  
  return p5Instance;
}])
.controller('p5Ctrl', ['$scope', '$element', 'p5Instance', function($scope, $element, p5Instance) {
  var instance = new p5Instance($element[0]);
  
  $scope.$watch('sketch', function(sketch) {
    if(sketch) {
      instance.init(sketch);
    }
    else {
      instance.destroy();
    }
  });
  
  $scope.$on('$destroy', function() {
    instance.destroy();
  });
}]);
