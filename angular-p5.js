angular.module('angular-p5', [])
.service('p5', function($window) {
  return $window.p5;
})
.directive('p5', function(p5) {
  return {
    restrict: 'EA',
    scope: {
      sketch: '='
    },
    link: function(scope, element, attrs) {
      var sketchObj = null;
      scope.$watch('sketch', function(sketch, oldSketch) {
        if(oldSketch && sketchObj) {
          sketchObj.remove();
          sketchObj = null;
        }
        if(sketch) {
          sketchObj = new p5(sketch, element[0]);
        }
      });
    }
  };
});
