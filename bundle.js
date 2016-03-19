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

//leapmotion reader
function concatData(id, data) {
  return id + ": " + data + "<br>";
}

function concatJointPosition(id, position) {
  return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
}

var output = document.getElementById('output');
var frameString = "",
    handString = "",
    fingerString = "";
var hand, finger;

// Leap.loop uses browser's requestAnimationFrame
var options = { enableGestures: true };

// Main Leap Loop
Leap.loop(options, function (frame) {
  frameString = concatData("num_hands", frame.hands.length);
  frameString += concatData("num_fingers", frame.fingers.length);
  frameString += "<br>";

  // Showcase some new V2 features
  for (var i = 0, len = frame.hands.length; i < len; i++) {
    hand = frame.hands[i];
    handString = concatData("hand_type", hand.type);
    handString += '<br>';

    // Helpers for thumb, pinky, etc.
    fingerString = concatJointPosition("finger_thumb_dip", hand.thumb.dipPosition);

    frameString += handString;
    frameString += fingerString;
  }

  output.innerHTML = frameString;
});

// function (fingerType) {
//   switch() {
//     case 0:
//       return 'Thumb';
//     break;
//
//     case 1:
//       return 'Index';
//     break;
//
//     case 2:
//       return 'Middle';
//     break;
//
//     case 3:
//       return 'Ring';
//     break;
//
//     case 4:
//       return 'Pinky';
//     break;
//   }
// }

//check if hitted
window.onkeydown = function (event) {
  if (event.keyCode == 70) {
    console.log("left red");
    document.getElementById("red").play();
    if (dist < 60 && dist > 50 && taikoType[0] == 0) {
      score++;
      document.getElementById("score").value = score;
    }
  }
  if (event.keyCode == 74) {
    console.log("right red");
    document.getElementById("red").play();
    if (dist < 60 && dist > 50 && taikoType[0] == 0) {
      score++;
      document.getElementById("score").value = score;
    }
  }
  if (event.keyCode == 69) {
    console.log("left blue");
    document.getElementById("blue").play();
    if (dist < 60 && dist > 50 && taikoType[0] == 1) {
      score++;
      document.getElementById("score").value = score;
    }
  }
  if (event.keyCode == 73) {
    console.log("right blue");
    document.getElementById("blue").play();
    if (dist < 60 && dist > 50 && taikoType[0] == 1) {
      score++;
      document.getElementById("score").value = score;
    }
  }
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvQWxhbi9Eb2N1bWVudHMvVVdhdGVybG9vL0dpdGh1Yi9UYWlrby1vbi1MZWFwL2FwcC5qcyIsIi9Vc2Vycy9BbGFuL0RvY3VtZW50cy9VV2F0ZXJsb28vR2l0aHViL1RhaWtvLW9uLUxlYXAvanMvZ2FtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7d0JDQW9CLGNBQWM7Ozs7QUFHbEMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRWpFLFNBQVMsSUFBSSxHQUFFOzs7Q0FHZDs7Ozs7QUNSRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7OztBQUdkLFNBQVMsVUFBVSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUU7QUFDNUIsU0FBTyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUM7Q0FDbEM7O0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFO0FBQ3pDLFNBQU8sRUFBRSxHQUFHLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztDQUNuRjs7QUFHRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLElBQUksV0FBVyxHQUFHLEVBQUU7SUFBRSxVQUFVLEdBQUcsRUFBRTtJQUFFLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDekQsSUFBSSxJQUFJLEVBQUUsTUFBTSxDQUFDOzs7QUFHakIsSUFBSSxPQUFPLEdBQUcsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUM7OztBQUd2QyxJQUFJLENBQUMsSUFBSSxD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QUksR0FBQyxFQUFFLElBQUksSUFBSSxHQUFDLEVBQUUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFDO0FBQ3ZDLFdBQUssRUFBRSxDQUFDO0FBQ1IsY0FBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ2hEO0dBQ0Y7Q0FDRixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBFeGFtcGxlIGZyb20gXCIuL2pzL2dhbWUuanNcIjtcblxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJ0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5KTtcblxuZnVuY3Rpb24gcGxheSgpe1xuICAvLyBhbGVydCgncGxheScpO1xuXG59XG4iLCJ2YXIgc2NvcmUgPSAwO1xuXG4vL2xlYXBtb3Rpb24gcmVhZGVyXG5mdW5jdGlvbiBjb25jYXREYXRhKGlkLCBkYXRhKSB7XG4gIHJldHVybiBpZCArIFwiOiBcIiArIGRhdGEgKyBcIjxicj5cIjtcbn1cblxuZnVuY3Rpb24gY29uY2F0Sm9pbnRQb3NpdGlvbihpZCwgcG9zaXRpb24pIHtcbiAgcmV0dXJuIGlkICsgXCI6IFwiICsgcG9zaXRpb25bMF0gKyBcIiwgXCIgKyBwb3NpdGlvblsxXSArIFwiLCBcIiArIHBvc2l0aW9uWzJdICsgXCI8YnI+XCI7XG59XG5cblxudmFyIG91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXQnKTtcbnZhciBmcmFtZVN0cmluZyA9IFwiXCIsIGhhbmRTdHJpbmcgPSBcIlwiLCBmaW5nZXJTdHJpbmcgPSBcIlwiO1xudmFyIGhhbmQsIGZpbmdlcjtcblxuLy8gTGVhcC5sb29wIHVzZXMgYnJvd3NlcidzIHJlcXVlc3RBbmltYXRpb25GcmFtZVxudmFyIG9wdGlvbnMgPSB7IGVuYWJsZUdlc3R1cmVzOiB0cnVlIH07XG5cbi8vIE1haW4gTGVhcCBMb29wXG5MZWFwLmxvb3Aob3B0aW9ucywgZnVuY3Rpb24oZnJhbWUpIHtcbiAgZnJhbWVTdHJpbmcgPSBjb25jYXREYXRhKFwibnVtX2hhbmRzXCIsIGZyYW1lLmhhbmRzLmxlbmd0aCk7XG4gIGZyYW1lU3RyaW5nICs9IGNvbmNhdERhdGEoXCJudW1fZmluZ2Vyc1wiLCBmcmFtZS5maW5nZXJzLmxlbmd0aCk7XG4gIGZyYW1lU3RyaW5nICs9IFwiPGJyPlwiO1xuXG4gIC8vIFNob3djYXNlIHNvbWUgbmV3IFYyIGZlYXR1cmVzXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBmcmFtZS5oYW5kcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGhhbmQgPSBmcmFtZS5oYW5kc1tpXTtcbiAgICBoYW5kU3RyaW5nID0gY29uY2F0RGF0YShcImhhbmRfdHlwZVwiLCBoYW5kLnR5cGUpO1xuICAgIGhhbmRTdHJpbmcgKz0gJzxicj4nO1xuXG4gICAgLy8gSGVscGVycyBmb3IgdGh1bWIsIHBpbmt5LCBldGMuXG4gICAgZmluZ2VyU3RyaW5nID0gY29uY2F0Sm9pbnRQb3NpdGlvbihcImZpbmdlcl90aHVtYl9kaXBcIiwgaGFuZC50aHVtYi5kaXBQb3NpdGlvbik7XG5cblxuICAgIGZyYW1lU3RyaW5nICs9IGhhbmRTdHJpbmc7XG4gICAgZnJhbWVTdHJpbmcgKz0gZmluZ2VyU3RyaW5nO1xuICB9XG5cbiAgb3V0cHV0LmlubmVySFRNTCA9IGZyYW1lU3RyaW5nO1xuXG59KTtcblxuLy8gZnVuY3Rpb24gKGZpbmdlclR5cGUpIHtcbi8vICAgc3dpdGNoKCkge1xuLy8gICAgIGNhc2UgMDpcbi8vICAgICAgIHJldHVybiAnVGh1bWInO1xuLy8gICAgIGJyZWFrO1xuLy9cbi8vICAgICBjYXNlIDE6XG4vLyAgICAgICByZXR1cm4gJ0luZGV4Jztcbi8vICAgICBicmVhaztcbi8vXG4vLyAgICAgY2FzZSAyOlxuLy8gICAgICAgcmV0dXJuICdNaWRkbGUnO1xuLy8gICAgIGJyZWFrO1xuLy9cbi8vICAgICBjYXNlIDM6XG4vLyAgICAgICByZXR1cm4gJ1JpbmcnO1xuLy8gICAgIGJyZWFrO1xuLy9cbi8vICAgICBjYXNlIDQ6XG4vLyAgICAgICByZXR1cm4gJ1Bpbmt5Jztcbi8vICAgICBicmVhaztcbi8vICAgfVxuLy8gfVxuXG4vL2NoZWNrIGlmIGhpdHRlZFxud2luZG93Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChldmVudCl7XG4gIGlmKGV2ZW50LmtleUNvZGUgPT0gNzApe1xuICAgIGNvbnNvbGUubG9nKFwibGVmdCByZWRcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWRcIikucGxheSgpO1xuICAgIGlmKGRpc3Q8NjAgJiYgZGlzdD41MCAmJiB0YWlrb1R5cGVbMF09PTApe1xuICAgICAgc2NvcmUrKztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NvcmVcIikudmFsdWUgPSBzY29yZTtcbiAgICB9XG4gIH1cbiAgaWYoZXZlbnQua2V5Q29kZSA9PSA3NCl7XG4gICAgY29uc29sZS5sb2coXCJyaWdodCByZWRcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWRcIikucGxheSgpO1xuICAgIGlmKGRpc3Q8NjAgJiYgZGlzdD41MCAmJiB0YWlrb1R5cGVbMF09PTApe1xuICAgICAgc2NvcmUrKztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NvcmVcIikudmFsdWUgPSBzY29yZTtcbiAgICB9XG4gIH1cbiAgaWYoZXZlbnQua2V5Q29kZSA9PSA2OSl7XG4gICAgY29uc29sZS5sb2coXCJsZWZ0IGJsdWVcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibHVlXCIpLnBsYXkoKTtcbiAgICBpZihkaXN0PDYwICYmIGRpc3Q+NTAgJiYgdGFpa29UeXBlWzBdPT0xKXtcbiAgICAgIHNjb3JlKys7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjb3JlXCIpLnZhbHVlID0gc2NvcmU7XG4gICAgfVxuICB9XG4gIGlmKGV2ZW50LmtleUNvZGUgPT0gNzMpe1xuICAgIGNvbnNvbGUubG9nKFwicmlnaHQgYmx1ZVwiKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJsdWVcIikucGxheSgpO1xuICAgIGlmKGRpc3Q8NjAgJiYgZGlzdD41MCAmJiB0YWlrb1R5cGVbMF09PTEpe1xuICAgICAgc2NvcmUrKztcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NvcmVcIikudmFsdWUgPSBzY29yZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
