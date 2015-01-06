angular.module('example', [
  'angular-p5'
])
.controller('ExampleCtrl', ['$scope', 'p5', function($scope, p5) {
  $scope.mySketch = function(sketch) {
    var r = sketch.random(0, 255);
    var g = sketch.random(0, 255);

    sketch.setup = function() {
      sketch.createCanvas(480, 270);
      sketch.noStroke();
    };

    sketch.draw = function() {
      var colorAngle = sketch.radians(sketch.frameCount);
      var colorVector = p5.Vector.fromAngle(colorAngle).setMag(255);
      
      sketch.background(r, g, colorVector.x);
      sketch.fill(r, g, colorVector.y);
      sketch.rect(0, 0, sketch.width / 2, sketch.height);
    };
  };
}]);
