var score = 0;
var picnum = 2;
var beatsCanvas = document.getElementById("beats");
var redTaiko = new Image();
var cant = 0;
redTaiko.src="./images/redTaiko.png";
redTaiko.onload = function (){
  cant++;
  if(cant > picnum - 1){
    drawTaiko();
  }
}
var blueTaiko = new Image();
blueTaiko.src="./images/blueTaiko.png";
blueTaiko.onload = function (){
  cant++;
  if(cant > picnum - 1){
    drawTaiko();
  }
}

var beatsCtx = beatsCanvas.getContext("2d");
beatsCtx.beginPath();
beatsCtx.moveTo(150,300)
beatsCtx.lineTo(150,100)
beatsCtx.strokeStyle = "#000"
beatsCtx.stroke()

var playgroundCanvas = document.getElementById("playground");
var playgroundCtx = playgroundCanvas.getContext("2d");
var bgImage = new Image();
        bgImage.onload = function() {
          playgroundCtx.drawImage(this, 0, 0);
        };

        bgImage.src = "./images/bg.jpeg";

var n;
var approachRate;
var vy = 65;
var hitObjects = new Array(120,120,60,120,120,120,60,120,60,120,
120,120,60,120,60,120,60,60,120,120,
120,120,60,120,120,120,60,120,60,120,
120,120,60,120,60,120,60,60,120,120,
120,120,60,120,120,120,60,120,60,120,
120,120,60,120,60,120,60,60,120,120,
120,120,60,120,120,120,60,120,60,120,
120,120,60,120,60,120,60,60,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,300,
120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120,
120,120,120,120,120,120,120,120);
var typeOfTaiko = new Array(0,0,0,1,0,0,0,1,0,1,
0,0,0,1,0,1,0,1,0,0,
0,0,0,1,0,0,0,1,0,1,
0,0,0,1,0,1,0,1,0,0,
0,0,0,1,0,0,0,1,0,1,
0,0,0,1,0,1,0,1,0,0,
0,0,0,1,0,0,0,1,0,1,
0,0,0,1,0,1,0,1,0,0,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,0,1,0,0,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,0,1,0,0,0,
0,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1,
0,1,1,0,1,1,0,1);
var dist= 280;
var isover = false;
function drawTaiko(){
  beatsCtx.clearRect(0,0,500,100);
  approachRate = dist;
  if(approachRate<0){
    if(typeOfTaiko.length < 2){
      alert("over");
      isover = true;
      return;
    }
    approachRate = hitObjects[0];
    hitObjects.shift();
    typeOfTaiko.shift();
  }
  approachRate -= 3;
  dist = approachRate;
  checkHit(dist);
  // console.log(dist);
  for(n=0;n<20;n++){
    if(typeOfTaiko[n] == 0){
      beatsCtx.drawImage(redTaiko,approachRate,vy);
    }else if(typeOfTaiko[n] == 1){
      beatsCtx.drawImage(blueTaiko,approachRate,vy);
    }
    approachRate += hitObjects[n]
    if(approachRate>1300){
      break;
    }
  }
  if(!isover){
    setTimeout(drawTaiko,20);
  }
}



//leapmotion reader
function concatData(id, data) {
  return id + ": " + data + "<br>";
}

function concatJointPosition(position) {
  return position[0] + ", " + position[1] + ", " + position[2] + "<br>";
}


var output = document.getElementById('output');
var frameString = "", handString = "", fingerString = "";
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
    fingerString = concatJointPosition(hand.thumb.dipPosition);
    //pass in type of hand and position for calculations;
    handType = hand.type;
    currentPositionValues = hand.thumb.dipPosition;
    // for(let i = 0; i < 3; i++){
    //   smoothedCurrentPositionValues[i] += (currentPositionValues[i] - smoothedCurrentPositionValues[i]) / lowPassFilterConst;
    // }
    // calculatePosition(handType, smoothedCurrentPositionValues);
    // console.log(dist);
    calculatePosition(handType, currentPositionValues, dist);


    frameString += handString;
    frameString += fingerString;
  }

  output.innerHTML = frameString;

});

var savedPositionF = new Array("0","0");
var savedPositionJ = new Array("0","0");
var savedPositionE = new Array("0","0");
var savedPositionI = new Array("0","0");

var drumCanvas = document.getElementById('drum')
var drumCtx = drumCanvas.getContext('2d');


function drawRed(){
  drumCtx.beginPath();
  drumCtx.arc(180,200, 140, 0, Math.PI, false);
  drumCtx.closePath();
  drumCtx.lineWidth = 5;
  drumCtx.fillStyle = '#E5372C';
  drumCtx.fill();
  setTimeout(function() {drumCtx.clearRect(0,0,440,440);}, 100);
}
function drawBlue(){
  drumCtx.beginPath();
  drumCtx.arc(180,200, 140, Math.PI, 2*Math.PI);
  drumCtx.closePath();
  drumCtx.lineWidth = 5;
  drumCtx.fillStyle = '#67BABE';
  drumCtx.fill();
  setTimeout(function() {drumCtx.clearRect(0,0,440,440);}, 100);
}

function checkHit(dist){
  // console.log(dist);
  return dist;
}
function calculatePosition(hand, position, dist){
  // console.log(positions[0]);
  // console.log(hand);
  //F
  console.log(dist);
  if(hand == 'left' && position[0] <= 0 && position[2] >= -70){
    savedPositionF[counterF] = position;
    // console.log(savedPositionF);
    // if(savedPositionF[0] == "0" || savedPositionF[1] == "0"){
    //   console.log("second didnt passed");
    //   return 0;
    // }
    isPressedF = finiteStateMachineF(savedPositionF);
    if(isPressedF == 1){
      console.log("F pressed");
      document.getElementById("red").play();
      drawRed();
      // distance = checkHit();
      if(dist<50 && dist>20){
				score++;
				document.getElementById("score").innerHTML = score;
			}
    }
    counterF++;
    if(counterF == 2){
      counterF = 0;
    }
  }

  //J
  if(hand == 'right' && position[0] > 0 && position[2] >= -70){
    savedPositionJ[counterJ] = position;

    isPressedJ = finiteStateMachineJ(savedPositionJ);
    if(isPressedJ == 1){
      console.log("J pressed");
      document.getElementById("red").play();
      drawRed();
      if(dist<50 && dist>20){
        score++;
        document.getElementById("score").innerHTML = score;
      }
    }
    counterJ++;
    if(counterJ == 2){
      counterJ = 0;
    }
  }

  //E
  if(hand == 'left' && position[0] <= 0 && position[2] < -70){
    savedPositionE[counterE] = position;

    isPressedE = finiteStateMachineE(savedPositionE);
    if(isPressedE == 1){
      console.log("E pressed");
      document.getElementById("blue").play();
      drawBlue();
      if(dist<50 && dist>20){
        score++;
        document.getElementById("score").innerHTML = score;
      }
    }
    counterF++;
    if(counterE == 2){
      counterE = 0;
    }
  }

  //I
  if(hand == 'right' && position[0] > 0 && position[2] < -70){
    savedPositionI[counterI] = position;

    isPressedI = finiteStateMachineI(savedPositionI);
    if(isPressedI == 1){
      console.log("I pressed");
      document.getElementById("blue").play();
      drawBlue();
      if(dist<50 && dist>20){
        score++;
        document.getElementById("score").innerHTML = score;
      }
    }
    counterI++;
    if(counterI == 2){
      counterI = 0;
    }
  }

}
var upF = false;//false initially
var downF = false;//false initially
var upJ = false;//false initially
var downJ = false;//false initially
var upE = false;//false initially
var downE = false;//false initially
var upI = false;//false initially
var downI = false;//false initially


function finiteStateMachineF(position){
  if(position[0] == 0 || position[1] == 0){
    // console.log("second didnt passed");
    return 0;
  }
  // console.log(position);
  if(position[1][1] - position[0][1] > 30)//need more consideration on identifying patterns
    {
      // console.log("up");
        upF = true;//change the state
    }
  else if(position[0][1] - position[1][1] > 30)//need more consideration on identifying patterns
    {
        downF = true;//change the state
    }
  if(Boolean(upF) & Boolean(downF))//true AND true
  {
    upF = false;
    downF = false;
    return 1;//step++
  }
  else{
      return 0;//if nothing
  }
}
function finiteStateMachineJ(position){
  if(position[0] == 0 || position[1] == 0){
    // console.log("second didnt passed");
    return 0;
  }
  if(position[1][1] - position[0][1] > 30)//need more consideration on identifying patterns
    {
        upJ = true;//change the state
    }
  else if(position[0][1] - position[1][1] > 30)//need more consideration on identifying patterns
    {
        downJ = true;//change the state
    }
  if(Boolean(upJ) & Boolean(downJ))//true AND true
  {
    upJ = false;
    downJ = false;
    return 1;//step++
  }
  else{
      return 0;//if nothing
  }
}
function finiteStateMachineE(position){
  if(position[0] == 0 || position[1] == 0){
    // console.log("second didnt passed");
    return 0;
  }
  if(position[1][1] - position[0][1] > 30)//need more consideration on identifying patterns
    {
        upE = true;//change the state
    }
  else if(position[0][1] - position[1][1] > 30)//need more consideration on identifying patterns
    {
        downE = true;//change the state
    }
  if(Boolean(upE) & Boolean(downE))//true AND true
  {
    upE = false;
    downE = false;
      return 1;//step++
  }
  else{
      return 0;//if nothing
  }
}
function finiteStateMachineI(position){
  if(position[0] == 0 || position[1] == 0){
    // console.log("second didnt passed");
    return 0;
  }
  if(position[1][1] - position[0][1] > 30)//need more consideration on identifying patterns
    {
        upI = true;//change the state
    }
  else if(position[0][1] - position[1][1] > 30)//need more consideration on identifying patterns
    {
        downI = true;//change the state
    }
  if(Boolean(upI) & Boolean(downI))//true AND true
  {
    upI = false;
    downI = false;
      return 1;//step++
  }
  else{
      return 0;//if nothing
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
//     if(dist<120 && dist>50 && taikoType[0]==0){
//       score++;
//       document.getElementById("score").value = score;
//     }
//   }
//   if(event.keyCode == 74){
//     console.log("right red");
//     document.getElementById("red").play();
//     if(dist<120 && dist>50 && taikoType[0]==0){
//       score++;
//       document.getElementById("score").value = score;
//     }
//   }
//   if(event.keyCode == 69){
//     console.log("left blue");
//     document.getElementById("blue").play();
//     if(dist<120 && dist>50 && taikoType[0]==1){
//       score++;
//       document.getElementById("score").value = score;
//     }
//   }
//   if(event.keyCode == 73){
//     console.log("right blue");
//     document.getElementById("blue").play();
//     if(dist<120 && dist>50 && taikoType[0]==1){
//       score++;
//       document.getElementById("score").value = score;
//     }
//   }
// }
// module.exports = "hitObj";
