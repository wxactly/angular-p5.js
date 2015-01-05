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
      
      var destroySketch = function() {
        if(!sketchObj) {
          return;
        }
        sketchObj.remove();
        sketchObj = null;
      };
      
      scope.$watch('sketch', function(sketch, oldSketch) {
        if(oldSketch) {
          destroySketch();
        }
        if(sketch) {
          sketchObj = new p5(sketch, element[0]);
        }
      });
      
      scope.$on('$destroy', destroySketch);
    }
  };
});
