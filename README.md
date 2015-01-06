#angular-p5.js

[AngularJS](https://github.com/angular/angular.js) wrapper for [p5.js](https://github.com/lmccart/p5.js), a client-side library for creating graphic and interactive experiences

##Usage

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

##Example

To run the [example](https://github.com/wxactly/angular-p5.js/tree/master/example),
```sh
git clone https://github.com/wxactly/angular-p5.js
cd angular-p5.js/
bower install
```

And open /example/index.html in a browser.
