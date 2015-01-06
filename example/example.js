angular.module('example', [
  'angular-p5'
])
.controller('ExampleCtrl', ['$scope', 'p5', function($scope, p5) {
  $scope.mySketch = function(sketch) {
    var origin = new p5.Vector(100, 100);

    sketch.setup = function() {
      sketch.createCanvas(700, 410);
    };

    sketch.draw = function() {
      var angle = sketch.radians(sketch.frameCount % 360);
      var point = p5.Vector.fromAngle(angle)
        .setMag(25)
        .add(origin);
      
      sketch.background(0);
      sketch.fill(255);
      sketch.ellipse(point.x, point.y, 50, 50);
    };
  };
}]);
