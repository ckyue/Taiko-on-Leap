(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _jsGameJs = require("./js/game.js");

var _jsGameJs2 = _interopRequireDefault(_jsGameJs);

document.getElementById("start").addEventListener("click", play);

function play() {
  // alert('play');

}

},{"./js/game.js":2}],2:[function(require,module,exports){
"use strict";

var score = 0;

window.onkeydown = function (event) {
  if (event.keyCode == 70) {
    console.log("red");
    document.getElementById("red").play();
    if (dist < 60 && dist > 50 && taikoType[0] == 0) {
      score++;
      document.getElementById("score").value = score;
    }
  }
  if (event.keyCode == 69) {
    console.log("blue");
    document.getElementById("blue").play();
    if (dist < 60 && dist > 50 && taikoType[0] == 1) {
      score++;
      document.getElementById("score").value = score;
    }
  }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvQWxhbi9Eb2N1bWVudHMvVVdhdGVybG9vL0dpdGh1Yi9UYWlrby1vbi1MZWFwL2FwcC5qcyIsIi9Vc2Vycy9BbGFuL0RvY3VtZW50cy9VV2F0ZXJsb28vR2l0aHViL1RhaWtvLW9uLUxlYXAvanMvZ2FtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7d0JDQW9CLGNBQWM7Ozs7QUFHbEMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRWpFLFNBQVMsSUFBSSxHQUFFOzs7Q0FHZDs7Ozs7QUNSRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7O0FBRWQsTUFBTSxDQUFDLFNBQVMsR0FBRyxVQUFVLEtBQUssRUFBQztBQUNqQyxNQUFHLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFDO0FBQ3JCLFdBQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkIsWUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN0QyxRQUFHLElBQUksR0FBQyxFQUFFLElBQUksSUFBSSxHQUFDLEVBQUUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFDO0FBQ3ZDLFdBQUssRUFBRSxDQUFDO0FBQ1IsY0FBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ2hEO0dBQ0Y7QUFDRCxNQUFHLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxFQUFDO0FBQ3JCLFdBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsWUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN2QyxRQUFHLElBQUksR0FBQyxFQUFFLElBQUksSUFBSSxHQUFDLEVBQUUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFDO0FBQ3ZDLFdBQUssRUFBRSxDQUFDO0FBQ1IsY0FBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ2xEO0dBQ0Y7Q0FDQSxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBFeGFtcGxlIGZyb20gXCIuL2pzL2dhbWUuanNcIjtcblxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5KTtcblxuZnVuY3Rpb24gcGxheSgpe1xuICAvLyBhbGVydCgncGxheScpO1xuXG59XG4iLCJ2YXIgc2NvcmUgPSAwO1xuXG53aW5kb3cub25rZXlkb3duID0gZnVuY3Rpb24gKGV2ZW50KXtcbiAgaWYoZXZlbnQua2V5Q29kZSA9PSA3MCl7XG4gICAgY29uc29sZS5sb2coXCJyZWRcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWRcIikucGxheSgpO1xuICAgIGlmKGRpc3Q8NjAgJiYgZGlzdD41MCAmJiB0YWlrb1R5cGVbMF09PTApe1xuICAgICAgc2NvcmUrKztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NvcmVcIikudmFsdWUgPSBzY29yZTtcbiAgICB9XG4gIH1cbiAgaWYoZXZlbnQua2V5Q29kZSA9PSA2OSl7XG4gICAgY29uc29sZS5sb2coXCJibHVlXCIpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmx1ZVwiKS5wbGF5KCk7XG4gICAgaWYoZGlzdDw2MCAmJiBkaXN0PjUwICYmIHRhaWtvVHlwZVswXT09MSl7XG4gICAgICBzY29yZSsrO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY29yZVwiKS52YWx1ZSA9IHNjb3JlO1xuICB9XG59XG59XG4iXX0=
