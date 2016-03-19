var score = 0;

//leapmotion reader
function concatData(id, data) {
  return id + ": " + data + "<br>";
}

function concatJointPosition(id, position) {
  return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
}


var output = document.getElementById('output');
var frameString = "", handString = "", fingerString = "";
var hand, finger;

// Leap.loop uses browser's requestAnimationFrame
var options = { enableGestures: true };

// Main Leap Loop
Leap.loop(options, function(frame) {
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
window.onkeydown = function (event){
  if(event.keyCode == 70){
    console.log("left red");
    document.getElementById("red").play();
    if(dist<60 && dist>50 && taikoType[0]==0){
      score++;
      document.getElementById("score").value = score;
    }
  }
  if(event.keyCode == 74){
    console.log("right red");
    document.getElementById("red").play();
    if(dist<60 && dist>50 && taikoType[0]==0){
      score++;
      document.getElementById("score").value = score;
    }
  }
  if(event.keyCode == 69){
    console.log("left blue");
    document.getElementById("blue").play();
    if(dist<60 && dist>50 && taikoType[0]==1){
      score++;
      document.getElementById("score").value = score;
    }
  }
  if(event.keyCode == 73){
    console.log("right blue");
    document.getElementById("blue").play();
    if(dist<60 && dist>50 && taikoType[0]==1){
      score++;
      document.getElementById("score").value = score;
    }
  }
}
