(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _jsHitObjJs = require("./js/hitObj.js");

var _jsHitObjJs2 = _interopRequireDefault(_jsHitObjJs);

document.getElementById("start").addEventListener("click", play);

function play() {
  // alert('play');

}

},{"./js/hitObj.js":2}],2:[function(require,module,exports){
//leapmotion reader
"use strict";

function concatData(id, data) {
  return id + ": " + data + "<br>";
}

function concatJointPosition(position) {
  return position[0] + ", " + position[1] + ", " + position[2] + "<br>";
}

var output = document.getElementById('output');
var frameString = "",
    handString = "",
    fingerString = "";
var hand, finger;
var currentPositionValues;
var smoothedCurrentPositionValues = new Array("0", "0", "0");
var lowPassFilterConst = 5;
var handType;
var counterF = 0;
var counterJ = 0;
var counterE = 0;
var counterI = 0;
var isPressedF = 0;
var isPressedJ = 0;
var isPressedE = 0;
var isPressedI = 0;
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
    fingerString = concatJointPosition(hand.thumb.dipPosition);
    //pass in type of hand and position for calculations;
    handType = hand.type;
    currentPositionValues = hand.thumb.dipPosition;
    // for(let i = 0; i < 3; i++){
    //   smoothedCurrentPositionValues[i] += (currentPositionValues[i] - smoothedCurrentPositionValues[i]) / lowPassFilterConst;
    // }
    // calculatePosition(handType, smoothedCurrentPositionValues);
    calculatePosition(handType, currentPositionValues);

    frameString += handString;
    frameString += fingerString;
  }

  output.innerHTML = frameString;
});

var savedPositionF = new Array("0", "0");
var savedPositionJ = new Array("0", "0");
var savedPositionE = new Array("0", "0");
var savedPositionI = new Array("0", "0");

function calculatePosition(hand, position) {
  // console.log(positions[0]);
  // console.log(hand);

  //F
  if (hand == 'left' && position[0] <= 0 && position[2] >= -70) {
    savedPositionF[counterF] = position;
    // console.log(savedPositionF);
    // if(savedPositionF[0] == "0" || savedPositionF[1] == "0"){
    //   console.log("second didnt passed");
    //   return 0;
    // }
    isPressedF = finiteStateMachineF(savedPositionF);
    if (isPressedF == 1) {
      console.log("F pressed");
      document.getElementById("red").play();
    }
    counterF++;
    if (counterF == 2) {
      counterF = 0;
    }
  }

  //J
  if (hand == 'right' && position[0] > 0 && position[2] >= -70) {
    savedPositionJ[counterJ] = position;

    isPressedJ = finiteStateMachineJ(savedPositionJ);
    if (isPressedJ == 1) {
      console.log("J pressed");
      document.getElementById("red").play();
    }
    counterJ++;
    if (counterJ == 2) {
      counterJ = 0;
    }
  }

  //E
  if (hand == 'left' && position[0] <= 0 && position[2] < -70) {
    savedPositionE[counterE] = position;

    isPressedE = finiteStateMachineE(savedPositionE);
    if (isPressedE == 1) {
      console.log("E pressed");
      document.getElementById("blue").play();
    }
    counterF++;
    if (counterE == 2) {
      counterE = 0;
    }
  }

  //I
  if (hand == 'right' && position[0] > 0 && position[2] < -70) {
    savedPositionI[counterI] = position;

    isPressedI = finiteStateMachineI(savedPositionI);
    if (isPressedI == 1) {
      console.log("I pressed");
      document.getElementById("blue").play();
    }
    counterI++;
    if (counterI == 2) {
      counterI = 0;
    }
  }
}
var upF = false; //false initially
var downF = false; //false initially
var upJ = false; //false initially
var downJ = false; //false initially
var upE = false; //false initially
var downE = false; //false initially
var upI = false; //false initially
var downI = false; //false initially

function finiteStateMachineF(position) {
  if (position[0] == 0 || position[1] == 0) {
    // console.log("second didnt passed");
    return 0;
  }
  // console.log(position);
  if (position[0][2] < position[1][2]) //need more consideration on identifying patterns
    {
      // console.log("up");
      upF = true; //change the state
    } else if (position[0][2] > position[1][2]) //need more consideration on identifying patterns
      {
        downF = true; //change the state
      }
  if (Boolean(upF) & Boolean(downF)) //true AND true
    {
      upF = false;
      downF = false;
      return 1; //step++
    } else {
      return 0; //if nothing
    }
}
function finiteStateMachineJ(position) {
  if (position[0] == 0 || position[1] == 0) {
    // console.log("second didnt passed");
    return 0;
  }
  if (position[0][2] < position[1][2]) //need more consideration on identifying patterns
    {
      upJ = true; //change the state
    } else if (position[0][2] > position[1][2]) //need more consideration on identifying patterns
      {
        downJ = true; //change the state
      }
  if (Boolean(upJ) & Boolean(downJ)) //true AND true
    {
      upJ = false;
      downJ = false;
      return 1; //step++
    } else {
      return 0; //if nothing
    }
}
function finiteStateMachineE(position) {
  if (position[0] == 0 || position[1] == 0) {
    // console.log("second didnt passed");
    return 0;
  }
  if (position[0][2] < position[1][2]) //need more consideration on identifying patterns
    {
      upE = true; //change the state
    } else if (position[0][2] > position[1][2]) //need more consideration on identifying patterns
      {
        downE = true; //change the state
      }
  if (Boolean(upE) & Boolean(downE)) //true AND true
    {
      upE = false;
      downE = false;
      return 1; //step++
    } else {
      return 0; //if nothing
    }
}
function finiteStateMachineI(position) {
  if (position[0] == 0 || position[1] == 0) {
    // console.log("second didnt passed");
    return 0;
  }
  if (position[0][2] < position[1][2]) //need more consideration on identifying patterns
    {
      upI = true; //change the state
    } else if (position[0][2] > position[1][2]) //need more consideration on identifying patterns
      {
        downI = true; //change the state
      }
  if (Boolean(upI) & Boolean(downI)) //true AND true
    {
      upI = false;
      downI = false;
      return 1; //step++
    } else {
      return 0; //if nothing
    }
}

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

//alternative checking
// window.onkeydown = function (event){
//   if(event.keyCode == 70){
//     console.log("left red");
//     document.getElementById("red").play();
//     if(dist<60 && dist>50 && taikoType[0]==0){
//       score++;
//       document.getElementById("score").value = score;
//     }
//   }
//   if(event.keyCode == 74){
//     console.log("right red");
//     document.getElementById("red").play();
//     if(dist<60 && dist>50 && taikoType[0]==0){
//       score++;
//       document.getElementById("score").value = score;
//     }
//   }
//   if(event.keyCode == 69){
//     console.log("left blue");
//     document.getElementById("blue").play();
//     if(dist<60 && dist>50 && taikoType[0]==1){
//       score++;
//       document.getElementById("score").value = score;
//     }
//   }
//   if(event.keyCode == 73){
//     console.log("right blue");
//     document.getElementById("blue").play();
//     if(dist<60 && dist>50 && taikoType[0]==1){
//       score++;
//       document.getElementById("score").value = score;
//     }
//   }
// }

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvQWxhbi9Eb2N1bWVudHMvVVdhdGVybG9vL0dpdGh1Yi9UYWlrby1vbi1MZWFwL2FwcC5qcyIsIi9Vc2Vycy9BbGFuL0RvY3VtZW50cy9VV2F0ZXJsb28vR2l0aHViL1RhaWtvLW9uLUxlYXAvanMvaGl0T2JqLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OzswQkNBbUIsZ0JBQWdCOzs7O0FBR25DLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVqRSxTQUFTLElBQUksR0FBRTs7O0NBR2Q7Ozs7OztBQ1BELFNBQVMsVUFBVSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUU7QUFDNUIsU0FBTyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUM7Q0FDbEM7O0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUU7QUFDckMsU0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztDQUN2RTs7QUFHRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLElBQUksV0FBVyxHQUFHLEVBQUU7SUFBRSxVQUFVLEdBQUcsRUFBRTtJQUFFLFlBQVksR0FBRyxFQUFFLENBQUM7QUFDekQsSUFBSSxJQUFJLEVBQUUsTUFBTSxDQUFDO0FBQ2pCLElBQUkscUJBQXFCLENBQUM7QUFDMUIsSUFBSSw2QkFBNkIsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzdELElBQUksa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0FBQzNC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aEM7QUFDRSxTQUFHLEdBQUcsS0FBSyxDQUFDO0FBQ1osV0FBSyxHQUFHLEtBQUssQ0FBQztBQUNaLGFBQU8sQ0FBQyxDQUFDO0tBQ1osTUFDRztBQUNBLGFBQU8sQ0FBQyxDQUFDO0tBQ1o7Q0FDRiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgaGl0T2JqIGZyb20gXCIuL2pzL2hpdE9iai5qc1wiO1xuXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHBsYXkpO1xuXG5mdW5jdGlvbiBwbGF5KCl7XG4gIC8vIGFsZXJ0KCdwbGF5Jyk7XG5cbn1cbiIsIi8vbGVhcG1vdGlvbiByZWFkZXJcbmZ1bmN0aW9uIGNvbmNhdERhdGEoaWQsIGRhdGEpIHtcbiAgcmV0dXJuIGlkICsgXCI6IFwiICsgZGF0YSArIFwiPGJyPlwiO1xufVxuXG5mdW5jdGlvbiBjb25jYXRKb2ludFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gIHJldHVybiBwb3NpdGlvblswXSArIFwiLCBcIiArIHBvc2l0aW9uWzFdICsgXCIsIFwiICsgcG9zaXRpb25bMl0gKyBcIjxicj5cIjtcbn1cblxuXG52YXIgb3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dHB1dCcpO1xudmFyIGZyYW1lU3RyaW5nID0gXCJcIiwgaGFuZFN0cmluZyA9IFwiXCIsIGZpbmdlclN0cmluZyA9IFwiXCI7XG52YXIgaGFuZCwgZmluZ2VyO1xudmFyIGN1cnJlbnRQb3NpdGlvblZhbHVlcztcbnZhciBzbW9vdGhlZEN1cnJlbnRQb3NpdGlvblZhbHVlcyA9IG5ldyBBcnJheShcIjBcIiwgXCIwXCIsIFwiMFwiKTtcbnZhciBsb3dQYXNzRmlsdGVyQ29uc3QgPSA1O1xudmFyIGhhbmRUeXBlO1xudmFyIGNvdW50ZXJGID0gMDtcbnZhciBjb3VudGVySiA9IDA7XG52YXIgY291bnRlckUgPSAwO1xudmFyIGNvdW50ZXJJID0gMDtcbnZhciBpc1ByZXNzZWRGID0gMDtcbnZhciBpc1ByZXNzZWRKID0gMDtcbnZhciBpc1ByZXNzZWRFID0gMDtcbnZhciBpc1ByZXNzZWRJID0gMDtcbi8vIExlYXAubG9vcCB1c2VzIGJyb3dzZXIncyByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbnZhciBvcHRpb25zID0geyBlbmFibGVHZXN0dXJlczogdHJ1ZSB9O1xuXG4vLyBNYWluIExlYXAgTG9vcFxuTGVhcC5sb29wKG9wdGlvbnMsIGZ1bmN0aW9uKGZyYW1lKSB7XG4gIGZyYW1lU3RyaW5nID0gY29uY2F0RGF0YShcIm51bV9oYW5kc1wiLCBmcmFtZS5oYW5kcy5sZW5ndGgpO1xuICBmcmFtZVN0cmluZyArPSBjb25jYXREYXRhKFwibnVtX2ZpbmdlcnNcIiwgZnJhbWUuZmluZ2Vycy5sZW5ndGgpO1xuICBmcmFtZVN0cmluZyArPSBcIjxicj5cIjtcblxuICAvLyBTaG93Y2FzZSBzb21lIG5ldyBWMiBmZWF0dXJlc1xuICBmb3IgKHZhciBpID0gMCwgbGVuID0gZnJhbWUuaGFuZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBoYW5kID0gZnJhbWUuaGFuZHNbaV07XG4gICAgaGFuZFN0cmluZyA9IGNvbmNhdERhdGEoXCJoYW5kX3R5cGVcIiwgaGFuZC50eXBlKTtcbiAgICBoYW5kU3RyaW5nICs9ICc8YnI+JztcblxuICAgIC8vIEhlbHBlcnMgZm9yIHRodW1iLCBwaW5reSwgZXRjLlxuICAgIGZpbmdlclN0cmluZyA9IGNvbmNhdEpvaW50UG9zaXRpb24oaGFuZC50aHVtYi5kaXBQb3NpdGlvbik7XG4gICAgLy9wYXNzIGluIHR5cGUgb2YgaGFuZCBhbmQgcG9zaXRpb24gZm9yIGNhbGN1bGF0aW9ucztcbiAgICBoYW5kVHlwZSA9IGhhbmQudHlwZTtcbiAgICBjdXJyZW50UG9zaXRpb25WYWx1ZXMgPSBoYW5kLnRodW1iLmRpcFBvc2l0aW9uO1xuICAgIC8vIGZvcihsZXQgaSA9IDA7IGkgPCAzOyBpKyspe1xuICAgIC8vICAgc21vb3RoZWRDdXJyZW50UG9zaXRpb25WYWx1ZXNbaV0gKz0gKGN1cnJlbnRQb3NpdGlvblZhbHVlc1tpXSAtIHNtb290aGVkQ3VycmVudFBvc2l0aW9uVmFsdWVzW2ldKSAvIGxvd1Bhc3NGaWx0ZXJDb25zdDtcbiAgICAvLyB9XG4gICAgLy8gY2FsY3VsYXRlUG9zaXRpb24oaGFuZFR5cGUsIHNtb290aGVkQ3VycmVudFBvc2l0aW9uVmFsdWVzKTtcbiAgICBjYWxjdWxhdGVQb3NpdGlvbihoYW5kVHlwZSwgY3VycmVudFBvc2l0aW9uVmFsdWVzKTtcblxuXG4gICAgZnJhbWVTdHJpbmcgKz0gaGFuZFN0cmluZztcbiAgICBmcmFtZVN0cmluZyArPSBmaW5nZXJTdHJpbmc7XG4gIH1cblxuICBvdXRwdXQuaW5uZXJIVE1MID0gZnJhbWVTdHJpbmc7XG5cbn0pO1xuXG52YXIgc2F2ZWRQb3NpdGlvbkYgPSBuZXcgQXJyYXkoXCIwXCIsXCIwXCIpO1xudmFyIHNhdmVkUG9zaXRpb25KID0gbmV3IEFycmF5KFwiMFwiLFwiMFwiKTtcbnZhciBzYXZlZFBvc2l0aW9uRSA9IG5ldyBBcnJheShcIjBcIixcIjBcIik7XG52YXIgc2F2ZWRQb3NpdGlvbkkgPSBuZXcgQXJyYXkoXCIwXCIsXCIwXCIpO1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVQb3NpdGlvbihoYW5kLCBwb3NpdGlvbil7XG4gIC8vIGNvbnNvbGUubG9nKHBvc2l0aW9uc1swXSk7XG4gIC8vIGNvbnNvbGUubG9nKGhhbmQpO1xuXG4gIC8vRlxuICBpZihoYW5kID09ICdsZWZ0JyAmJiBwb3NpdGlvblswXSA8PSAwICYmIHBvc2l0aW9uWzJdID49IC03MCl7XG4gICAgc2F2ZWRQb3NpdGlvbkZbY291bnRlckZdID0gcG9zaXRpb247XG4gICAgLy8gY29uc29sZS5sb2coc2F2ZWRQb3NpdGlvbkYpO1xuICAgIC8vIGlmKHNhdmVkUG9zaXRpb25GWzBdID09IFwiMFwiIHx8IHNhdmVkUG9zaXRpb25GWzFdID09IFwiMFwiKXtcbiAgICAvLyAgIGNvbnNvbGUubG9nKFwic2Vjb25kIGRpZG50IHBhc3NlZFwiKTtcbiAgICAvLyAgIHJldHVybiAwO1xuICAgIC8vIH1cbiAgICBpc1ByZXNzZWRGID0gZmluaXRlU3RhdGVNYWNoaW5lRihzYXZlZFBvc2l0aW9uRik7XG4gICAgaWYoaXNQcmVzc2VkRiA9PSAxKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiRiBwcmVzc2VkXCIpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWRcIikucGxheSgpO1xuICAgIH1cbiAgICBjb3VudGVyRisrO1xuICAgIGlmKGNvdW50ZXJGID09IDIpe1xuICAgICAgY291bnRlckYgPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8vSlxuICBpZihoYW5kID09ICdyaWdodCcgJiYgcG9zaXRpb25bMF0gPiAwICYmIHBvc2l0aW9uWzJdID49IC03MCl7XG4gICAgc2F2ZWRQb3NpdGlvbkpbY291bnRlckpdID0gcG9zaXRpb247XG5cbiAgICBpc1ByZXNzZWRKID0gZmluaXRlU3RhdGVNYWNoaW5lSihzYXZlZFBvc2l0aW9uSik7XG4gICAgaWYoaXNQcmVzc2VkSiA9PSAxKXtcbiAgICAgIGNvbnNvbGUubG9nKFwiSiBwcmVzc2VkXCIpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWRcIikucGxheSgpO1xuICAgIH1cbiAgICBjb3VudGVySisrO1xuICAgIGlmKGNvdW50ZXJKID09IDIpe1xuICAgICAgY291bnRlckogPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8vRVxuICBpZihoYW5kID09ICdsZWZ0JyAmJiBwb3NpdGlvblswXSA8PSAwICYmIHBvc2l0aW9uWzJdIDwgLTcwKXtcbiAgICBzYXZlZFBvc2l0aW9uRVtjb3VudGVyRV0gPSBwb3NpdGlvbjtcblxuICAgIGlzUHJlc3NlZEUgPSBmaW5pdGVTdGF0ZU1hY2hpbmVFKHNhdmVkUG9zaXRpb25FKTtcbiAgICBpZihpc1ByZXNzZWRFID09IDEpe1xuICAgICAgY29uc29sZS5sb2coXCJFIHByZXNzZWRcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJsdWVcIikucGxheSgpO1xuICAgIH1cbiAgICBjb3VudGVyRisrO1xuICAgIGlmKGNvdW50ZXJFID09IDIpe1xuICAgICAgY291bnRlckUgPSAwO1xuICAgIH1cbiAgfVxuXG4gIC8vSVxuICBpZihoYW5kID09ICdyaWdodCcgJiYgcG9zaXRpb25bMF0gPiAwICYmIHBvc2l0aW9uWzJdIDwgLTcwKXtcbiAgICBzYXZlZFBvc2l0aW9uSVtjb3VudGVySV0gPSBwb3NpdGlvbjtcblxuICAgIGlzUHJlc3NlZEkgPSBmaW5pdGVTdGF0ZU1hY2hpbmVJKHNhdmVkUG9zaXRpb25JKTtcbiAgICBpZihpc1ByZXNzZWRJID09IDEpe1xuICAgICAgY29uc29sZS5sb2coXCJJIHByZXNzZWRcIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJsdWVcIikucGxheSgpO1xuICAgIH1cbiAgICBjb3VudGVySSsrO1xuICAgIGlmKGNvdW50ZXJJID09IDIpe1xuICAgICAgY291bnRlckkgPSAwO1xuICAgIH1cbiAgfVxuXG59XG52YXIgdXBGID0gZmFsc2U7Ly9mYWxzZSBpbml0aWFsbHlcbnZhciBkb3duRiA9IGZhbHNlOy8vZmFsc2UgaW5pdGlhbGx5XG52YXIgdXBKID0gZmFsc2U7Ly9mYWxzZSBpbml0aWFsbHlcbnZhciBkb3duSiA9IGZhbHNlOy8vZmFsc2UgaW5pdGlhbGx5XG52YXIgdXBFID0gZmFsc2U7Ly9mYWxzZSBpbml0aWFsbHlcbnZhciBkb3duRSA9IGZhbHNlOy8vZmFsc2UgaW5pdGlhbGx5XG52YXIgdXBJID0gZmFsc2U7Ly9mYWxzZSBpbml0aWFsbHlcbnZhciBkb3duSSA9IGZhbHNlOy8vZmFsc2UgaW5pdGlhbGx5XG5cblxuZnVuY3Rpb24gZmluaXRlU3RhdGVNYWNoaW5lRihwb3NpdGlvbil7XG4gIGlmKHBvc2l0aW9uWzBdID09IDAgfHwgcG9zaXRpb25bMV0gPT0gMCl7XG4gICAgLy8gY29uc29sZS5sb2coXCJzZWNvbmQgZGlkbnQgcGFzc2VkXCIpO1xuICAgIHJldHVybiAwO1xuICB9XG4gIC8vIGNvbnNvbGUubG9nKHBvc2l0aW9uKTtcbiAgaWYocG9zaXRpb25bMF1bMl0gPCBwb3NpdGlvblsxXVsyXSkvL25lZWQgbW9yZSBjb25zaWRlcmF0aW9uIG9uIGlkZW50aWZ5aW5nIHBhdHRlcm5zXG4gICAge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJ1cFwiKTtcbiAgICAgICAgdXBGID0gdHJ1ZTsvL2NoYW5nZSB0aGUgc3RhdGVcbiAgICB9XG4gIGVsc2UgaWYocG9zaXRpb25bMF1bMl0gPiBwb3NpdGlvblsxXVsyXSkvL25lZWQgbW9yZSBjb25zaWRlcmF0aW9uIG9uIGlkZW50aWZ5aW5nIHBhdHRlcm5zXG4gICAge1xuICAgICAgICBkb3duRiA9IHRydWU7Ly9jaGFuZ2UgdGhlIHN0YXRlXG4gICAgfVxuICBpZihCb29sZWFuKHVwRikgJiBCb29sZWFuKGRvd25GKSkvL3RydWUgQU5EIHRydWVcbiAge1xuICAgIHVwRiA9IGZhbHNlO1xuICAgIGRvd25GID0gZmFsc2U7XG4gICAgcmV0dXJuIDE7Ly9zdGVwKytcbiAgfVxuICBlbHNle1xuICAgICAgcmV0dXJuIDA7Ly9pZiBub3RoaW5nXG4gIH1cbn1cbmZ1bmN0aW9uIGZpbml0ZVN0YXRlTWFjaGluZUoocG9zaXRpb24pe1xuICBpZihwb3NpdGlvblswXSA9PSAwIHx8IHBvc2l0aW9uWzFdID09IDApe1xuICAgIC8vIGNvbnNvbGUubG9nKFwic2Vjb25kIGRpZG50IHBhc3NlZFwiKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZihwb3NpdGlvblswXVsyXSA8IHBvc2l0aW9uWzFdWzJdKS8vbmVlZCBtb3JlIGNvbnNpZGVyYXRpb24gb24gaWRlbnRpZnlpbmcgcGF0dGVybnNcbiAgICB7XG4gICAgICAgIHVwSiA9IHRydWU7Ly9jaGFuZ2UgdGhlIHN0YXRlXG4gICAgfVxuICBlbHNlIGlmKHBvc2l0aW9uWzBdWzJdID4gcG9zaXRpb25bMV1bMl0pLy9uZWVkIG1vcmUgY29uc2lkZXJhdGlvbiBvbiBpZGVudGlmeWluZyBwYXR0ZXJuc1xuICAgIHtcbiAgICAgICAgZG93bkogPSB0cnVlOy8vY2hhbmdlIHRoZSBzdGF0ZVxuICAgIH1cbiAgaWYoQm9vbGVhbih1cEopICYgQm9vbGVhbihkb3duSikpLy90cnVlIEFORCB0cnVlXG4gIHtcbiAgICB1cEogPSBmYWxzZTtcbiAgICBkb3duSiA9IGZhbHNlO1xuICAgIHJldHVybiAxOy8vc3RlcCsrXG4gIH1cbiAgZWxzZXtcbiAgICAgIHJldHVybiAwOy8vaWYgbm90aGluZ1xuICB9XG59XG5mdW5jdGlvbiBmaW5pdGVTdGF0ZU1hY2hpbmVFKHBvc2l0aW9uKXtcbiAgaWYocG9zaXRpb25bMF0gPT0gMCB8fCBwb3NpdGlvblsxXSA9PSAwKXtcbiAgICAvLyBjb25zb2xlLmxvZyhcInNlY29uZCBkaWRudCBwYXNzZWRcIik7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYocG9zaXRpb25bMF1bMl0gPCBwb3NpdGlvblsxXVsyXSkvL25lZWQgbW9yZSBjb25zaWRlcmF0aW9uIG9uIGlkZW50aWZ5aW5nIHBhdHRlcm5zXG4gICAge1xuICAgICAgICB1cEUgPSB0cnVlOy8vY2hhbmdlIHRoZSBzdGF0ZVxuICAgIH1cbiAgZWxzZSBpZihwb3NpdGlvblswXVsyXSA+IHBvc2l0aW9uWzFdWzJdKS8vbmVlZCBtb3JlIGNvbnNpZGVyYXRpb24gb24gaWRlbnRpZnlpbmcgcGF0dGVybnNcbiAgICB7XG4gICAgICAgIGRvd25FID0gdHJ1ZTsvL2NoYW5nZSB0aGUgc3RhdGVcbiAgICB9XG4gIGlmKEJvb2xlYW4odXBFKSAmIEJvb2xlYW4oZG93bkUpKS8vdHJ1ZSBBTkQgdHJ1ZVxuICB7XG4gICAgdXBFID0gZmFsc2U7XG4gICAgZG93bkUgPSBmYWxzZTtcbiAgICAgIHJldHVybiAxOy8vc3RlcCsrXG4gIH1cbiAgZWxzZXtcbiAgICAgIHJldHVybiAwOy8vaWYgbm90aGluZ1xuICB9XG59XG5mdW5jdGlvbiBmaW5pdGVTdGF0ZU1hY2hpbmVJKHBvc2l0aW9uKXtcbiAgaWYocG9zaXRpb25bMF0gPT0gMCB8fCBwb3NpdGlvblsxXSA9PSAwKXtcbiAgICAvLyBjb25zb2xlLmxvZyhcInNlY29uZCBkaWRudCBwYXNzZWRcIik7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYocG9zaXRpb25bMF1bMl0gPCBwb3NpdGlvblsxXVsyXSkvL25lZWQgbW9yZSBjb25zaWRlcmF0aW9uIG9uIGlkZW50aWZ5aW5nIHBhdHRlcm5zXG4gICAge1xuICAgICAgICB1cEkgPSB0cnVlOy8vY2hhbmdlIHRoZSBzdGF0ZVxuICAgIH1cbiAgZWxzZSBpZihwb3NpdGlvblswXVsyXSA+IHBvc2l0aW9uWzFdWzJdKS8vbmVlZCBtb3JlIGNvbnNpZGVyYXRpb24gb24gaWRlbnRpZnlpbmcgcGF0dGVybnNcbiAgICB7XG4gICAgICAgIGRvd25JID0gdHJ1ZTsvL2NoYW5nZSB0aGUgc3RhdGVcbiAgICB9XG4gIGlmKEJvb2xlYW4odXBJKSAmIEJvb2xlYW4oZG93bkkpKS8vdHJ1ZSBBTkQgdHJ1ZVxuICB7XG4gICAgdXBJID0gZmFsc2U7XG4gICAgZG93bkkgPSBmYWxzZTtcbiAgICAgIHJldHVybiAxOy8vc3RlcCsrXG4gIH1cbiAgZWxzZXtcbiAgICAgIHJldHVybiAwOy8vaWYgbm90aGluZ1xuICB9XG59XG5cbi8vIGZ1bmN0aW9uIChmaW5nZXJUeXBlKSB7XG4vLyAgIHN3aXRjaCgpIHtcbi8vICAgICBjYXNlIDA6XG4vLyAgICAgICByZXR1cm4gJ1RodW1iJztcbi8vICAgICBicmVhaztcbi8vXG4vLyAgICAgY2FzZSAxOlxuLy8gICAgICAgcmV0dXJuICdJbmRleCc7XG4vLyAgICAgYnJlYWs7XG4vL1xuLy8gICAgIGNhc2UgMjpcbi8vICAgICAgIHJldHVybiAnTWlkZGxlJztcbi8vICAgICBicmVhaztcbi8vXG4vLyAgICAgY2FzZSAzOlxuLy8gICAgICAgcmV0dXJuICdSaW5nJztcbi8vICAgICBicmVhaztcbi8vXG4vLyAgICAgY2FzZSA0OlxuLy8gICAgICAgcmV0dXJuICdQaW5reSc7XG4vLyAgICAgYnJlYWs7XG4vLyAgIH1cbi8vIH1cblxuLy9hbHRlcm5hdGl2ZSBjaGVja2luZ1xuLy8gd2luZG93Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChldmVudCl7XG4vLyAgIGlmKGV2ZW50LmtleUNvZGUgPT0gNzApe1xuLy8gICAgIGNvbnNvbGUubG9nKFwibGVmdCByZWRcIik7XG4vLyAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWRcIikucGxheSgpO1xuLy8gICAgIGlmKGRpc3Q8NjAgJiYgZGlzdD41MCAmJiB0YWlrb1R5cGVbMF09PTApe1xuLy8gICAgICAgc2NvcmUrKztcbi8vICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NvcmVcIikudmFsdWUgPSBzY29yZTtcbi8vICAgICB9XG4vLyAgIH1cbi8vICAgaWYoZXZlbnQua2V5Q29kZSA9PSA3NCl7XG4vLyAgICAgY29uc29sZS5sb2coXCJyaWdodCByZWRcIik7XG4vLyAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWRcIikucGxheSgpO1xuLy8gICAgIGlmKGRpc3Q8NjAgJiYgZGlzdD41MCAmJiB0YWlrb1R5cGVbMF09PTApe1xuLy8gICAgICAgc2NvcmUrKztcbi8vICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NvcmVcIikudmFsdWUgPSBzY29yZTtcbi8vICAgICB9XG4vLyAgIH1cbi8vICAgaWYoZXZlbnQua2V5Q29kZSA9PSA2OSl7XG4vLyAgICAgY29uc29sZS5sb2coXCJsZWZ0IGJsdWVcIik7XG4vLyAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJibHVlXCIpLnBsYXkoKTtcbi8vICAgICBpZihkaXN0PDYwICYmIGRpc3Q+NTAgJiYgdGFpa29UeXBlWzBdPT0xKXtcbi8vICAgICAgIHNjb3JlKys7XG4vLyAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjb3JlXCIpLnZhbHVlID0gc2NvcmU7XG4vLyAgICAgfVxuLy8gICB9XG4vLyAgIGlmKGV2ZW50LmtleUNvZGUgPT0gNzMpe1xuLy8gICAgIGNvbnNvbGUubG9nKFwicmlnaHQgYmx1ZVwiKTtcbi8vICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJsdWVcIikucGxheSgpO1xuLy8gICAgIGlmKGRpc3Q8NjAgJiYgZGlzdD41MCAmJiB0YWlrb1R5cGVbMF09PTEpe1xuLy8gICAgICAgc2NvcmUrKztcbi8vICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NvcmVcIikudmFsdWUgPSBzY29yZTtcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cbiJdfQ==
