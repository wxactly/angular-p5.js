#angular-p5.js

[AngularJS](https://github.com/angular/angular.js) wrapper for [p5.js](https://github.com/lmccart/p5.js), a client-side library for creating graphic and interactive experiences

##Usage

###p5 directive

Define a p5.js sketch on `$scope` - p5.js will run in "[instance mode](http://p5js.org/learn/examples/Instance_Mode_Instantiation.php)". The sketch defined on this example controller is named `mySketch`:

```javascript
angular.module('example', [
  'angular-p5'
])
.controller('ExampleCtrl', ['$scope', function($scope) {
  $scope.mySketch = function(sketch) {
    var x = 100; 
    var y = 100;

    sketch.setup = function() {
      sketch.createCanvas(700, 410);
    };

    sketch.draw = function() {
      sketch.background(0);
      sketch.fill(255);
      sketch.rect(x, y, 50, 50);
    };
  };
}]);
```

Then tell the angular-p5 directive where to find it:

```html
<div ng-controller="ExampleCtrl">
  <p5 sketch="mySketch"></p5>
</div>
```

The reference to the sketch is data-bound so if you define multiple sketches on your controller, it's possible to implement some mechanism (like a form control) to switch which sketch the directive is pointing to on the fly. Angular-p5 will automatically destroy the old sketch and start up the new one.

###p5 service

Angular-p5 also includes an injectable p5 service, for when your sketch uses any p5.js objects like `p5.Vector` or `p5.Image`:
```javascript
.controller('MyCtrl', ['$scope', 'p5', function($scope, p5) {
  $scope.mySketch = function(sketch) {
    var velocity = new p5.Vector(0, 9);
    ...
```

This points to the same reference as the global `p5` object that lives on `window`, but we all know [it's better this way](https://docs.angularjs.org/guide/di).

##Example

To run the [example](https://github.com/wxactly/angular-p5.js/tree/master/example),
```sh
git clone https://github.com/wxactly/angular-p5.js
cd angular-p5.js/
bower install
```

And open /example/index.html in a browser.
