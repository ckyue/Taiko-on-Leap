// upload music
// $("#upload").on("click", function() {
//     // var file_data = $("#file").prop("files")[0];
//     var file_data = $("#file")[0];
//     var form_data = new FormData();
//     form_data.append("file", file_data);
//     alert(form_data);
//     $.ajax({
//                 url: "http://ec2-52-36-8-247.us-west-2.compute.amazonaws.com/music.php",
//                 dataType: 'text',
//                 cache: false,
//                 contentType: false,
//                 processData: false,
//                 data: form_data,
//                 type: 'post',
//                 success: function(php_script_response){
//                     alert(php_script_response); // display response from the PHP script, if any
//                 }
//      });
// });
//
// var data = new FormData();
// data.append('qwe', 'asds');
//
// var xhr = new XMLHttpRequest();
// xhr.open('POST', 'http://ec2-52-36-8-247.us-west-2.compute.amazonaws.com/music.php', true);
// xhr.onload = function () {
//     // do something to response
//     console.log(this.responseText);
// };
// xhr.send(data);

document.querySelector('#afile').addEventListener('change', function(e) {
  var file = this.files[0];
  console.log(file);
  var fd = new FormData();
  fd.append("file", file);
  // console.log(toString(fd));
  // These extra params aren't necessary but show that you can include other data.
  // fd.append("tktkt", "ktktkt");
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://ec2-52-36-8-247.us-west-2.compute.amazonaws.com/music.php', true);

  xhr.upload.onprogress = function(e) {
    if (e.lengthComputable) {
      var percentComplete = (e.loaded / e.total) * 100;
      console.log(percentComplete + '% uploaded');
    }
  };
  xhr.onload = function() {
    console.log(this.status);

    if (this.status == 200) {
      // var resp = JSON.parse(this.response);
      var resp = this.response;
      console.log('From server:', resp);
      // var image = document.createElement('img');
      // image.src = resp.dataUrl;
      // document.body.appendChild(image);
    };
  };
  xhr.send(fd);
}, false);

//define Beatmap notes
var hitObjects = new Array(120,120,60,120,120,120,60,120,60,120,120,120,60,120,60,120,60,60,120,120,120,120,60,120,120,120,60,120,60,120,120,120,60,120,60,120,60,60,120,120,120,120,60,120,120,120,60,120,60,120,120,120,60,120,60,120,60,60,120,120,120,120,60,120,120,120,60,120,60,120,120,120,60,120,60,120,60,60,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,300,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120);
var typeOfTaiko = new Array(0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,1,1,0,1,1,0,1,0,1,1,0,1);
var dist= 350;

//scoredboard
var Firebase = require('firebase');
var scoreboard = new Firebase('https://taiko-on-leap.firebaseio.com/');

var scoreRef = scoreboard.child('score');
// scoreRef.set({
//   caonima: "22",
//   ggwp: "33",
//   sb: "11"
// });
var scoreBoardCanvas = document.getElementById('scoreboard');
var scoreBoardCtx = scoreBoardCanvas.getContext('2d');
scoreBoardCtx.font = "20px Arial";
scoreBoardCtx.fillStyle = "#fff";

function drawScoreBoard(){
  // alert(score)
  scoreBoardCtx.clearRect(0,0,scoreBoardCanvas.width,scoreBoardCanvas.height);
  scoreBoardCtx.fillText("Scoreboard", 10, 30);
  // console.log(scoreBoardStack.length);
  for(let i = 1; i <= scoreBoardStack.length; i++){
    //parse object
    var scoreAndName = scoreBoardStack.pop();
    let score;
    let name;
    for(var n in scoreAndName){
      name = n;
      score = scoreAndName[n];
    }
    // console.log(JSON.stringify(score));
    let scoreString = i + "   " + name + "   " + score;
    scoreBoardCtx.fillText(scoreString, 10, i*35+50);
  }
  //if not undefine or null?

  // console.log(JSON.stringify(scoreBoardStack));
}

var scoreBoardStack = new Array();
function scoreStack(name, score){
  //implement a stack to revese data;
  //push to stack;
  var bufferData = {};
  bufferData[name] = score;
  scoreBoardStack.push(bufferData);
}
scoreRef.orderByValue().on('value',function(snapshot){
    snapshot.forEach(function(data){
      var key = data.key();
      var value = data.val();
      scoreStack(key,value);
      // console.log("Name: " + data.key() + " scored " + data.val());
    });
    drawScoreBoard();
});


var controller = new Leap.Controller();

controller.on('deviceConnected', function() {
  console.log("A Leap device has been connected.");
  doMyOwnStuff();
});

controller.on('deviceDisconnected', function() {
  console.log("A Leap device has been disconnected.");
});

var score = 0;
//draw taikos
var numOfTaikoType = 2;
var redTaiko = new Image();
var counterTaiko = 0;
redTaiko.src="./images/redTaiko.png";
redTaiko.onload = function (){
  counterTaiko++;
  if(counterTaiko > numOfTaikoType - 1){
    drawTaiko();
  }
}
var blueTaiko = new Image();
blueTaiko.src="./images/blueTaiko.png";
blueTaiko.onload = function (){
  counterTaiko++;
  if(counterTaiko > numOfTaikoType - 1){
    drawTaiko();
  }
}

//draw background
var beatsCanvas = document.getElementById("beats");
var beatsCtx = beatsCanvas.getContext("2d");
beatsCtx.beginPath();
beatsCtx.moveTo(150,300);
beatsCtx.lineTo(150,100);
beatsCtx.strokeStyle = "#000";
beatsCtx.stroke();
var playgroundCanvas = document.getElementById("playground");
var playgroundCtx = playgroundCanvas.getContext("2d");
var bgImage = new Image();
bgImage.onload = function() {
  playgroundCtx.drawImage(this, 0, 0);
};
bgImage.src = "./images/bg.png";




//,0,0,0,1,0,1,0,1,0,0,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,0,0,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,0,1,0,0,0,0,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1
// var typeOfTaiko = new Array(0,1);
//draw beatmap notes(Taikos)
var approachRate;
var yOffset = 65;
var isover = false;
var playerName;

function drawTaiko(){
  beatsCtx.clearRect(0,0,1500,300);
  approachRate = dist;
  if(approachRate<0){
    if(typeOfTaiko.length < 2){
      playerName = prompt("Congratulations! Enter Your Name HERE!!", "Wearhack Waterloo 2016");
      //send to database;
      var bufferData = {};
      bufferData[playerName] = score;
      scoreRef.update(bufferData);
      isover = true;
      return;
    }
    approachRate = hitObjects[0];
    hitObjects.shift();
    typeOfTaiko.shift();
  }
  approachRate -= 6;
  dist = approachRate;
  checkHit(dist);
  // console.log(dist);
  for(let i=0; i<20; i++){
    if(typeOfTaiko[i] == 0){
      beatsCtx.drawImage(redTaiko,approachRate,yOffset);
    }else if(typeOfTaiko[i] == 1){
      beatsCtx.drawImage(blueTaiko,approachRate,yOffset);
    }
    approachRate += hitObjects[i]
    if(approachRate>1300){
      break;
    }
  }
  if(!isover){
    setTimeout(drawTaiko,20);
  }
}


//leapmotion reader

//helper function to display position data
function concatData(id, data) {
  return id + ": " + data + "<br>";
}
//helper function to display position data
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

//draw status
var leapStatusCanvas = document.getElementById("leapStatus");
var leapStatusCtx = leapStatusCanvas.getContext("2d");
leapStatusCtx.font = "15px Arial";
leapStatusCtx.fillStyle = "#fff";
var statusString;
var handStatusString;
var fingerStatusString;

function drawStatus(hand, finger){
  // alert(score)
  // console.log(finger);
  leapStatusCtx.clearRect(0,0,leapStatusCanvas.width,leapStatusCanvas.height);
  statusString = "LeapMotion Status: " + "Connected";
  leapStatusCtx.fillText(statusString, 0, 30);
  handStatusString = "Current Hitting Hand: " + hand;
  leapStatusCtx.fillText(handStatusString,0,60);
  fingerStatusString = "Hand Location: " + finger;
  leapStatusCtx.fillText(fingerStatusString,0,90);

}

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
    drawStatus(handType, currentPositionValues);
  }

  // output.innerHTML = frameString;

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
  drumCtx.fillStyle = '#F5001C';
  drumCtx.fill();
  setTimeout(function() {drumCtx.clearRect(0,0,440,440);}, 100);
}
function drawBlue(){
  drumCtx.beginPath();
  drumCtx.arc(180,200, 140, Math.PI, 2*Math.PI);
  drumCtx.closePath();
  drumCtx.lineWidth = 5;
  drumCtx.fillStyle = '#33C5FF';
  drumCtx.fill();
  setTimeout(function() {drumCtx.clearRect(0,0,440,440);}, 100);
}

function checkHit(dist){
  // console.log(dist);
  return dist;
}

//draw score
var scoreCanvas = document.getElementById("score");
var scoreCtx = scoreCanvas.getContext("2d");
scoreCtx.font = "55px Arial";
scoreCtx.fillStyle = "#E6377B";
scoreCtx.textAlign = "center";
var scoreString;

function drawScore(score){
  // alert(score)
  scoreCtx.clearRect(0,0,scoreCanvas.width,scoreCanvas.height);
  scoreString = "Your Score: " + score;
  scoreCtx.fillText(scoreString, scoreCanvas.width/2, scoreCanvas.height/2);
}


function calculatePosition(hand, position, dist){
  // console.log(positions[0]);
  // console.log(hand);

  //F
  function playScoreSoundEffect(score){

    console.log(score);
    switch(score){
      case 10:
        document.getElementById("comboburst-0").play();
        break;
        case 20:
          document.getElementById("comboburst-1").play();
          break;
          case 30:
            document.getElementById("comboburst-2").play();
            break;
            case 40:
              document.getElementById("comboburst-3").play();
              break;
              case 50:
                document.getElementById("comboburst-4").play();
                break;
                case 60:
                  document.getElementById("comboburst-5").play();
                  break;
                  case 65:
                    document.getElementById("comboburst-6").play();
                    break;
                    case 70:
                      document.getElementById("comboburst-7").play();
                      break;
                      case 75:
                        document.getElementById("comboburst-8").play();
                        break;
                        case 80:
                          document.getElementById("comboburst-9").play();
                          break;
                          case 85:
                            document.getElementById("comboburst-10").play();
                            break;
                            case 90:
                              document.getElementById("comboburst-11").play();
                              break;
                              case 95:
                                document.getElementById("comboburst-12").play();
                                break;

    }
  }

  if(/*hand == 'left' && */position[0] <= 0 && position[2] >= -70){
    savedPositionF[counterF] = position;
    // console.log(savedPositionF);
    // if(savedPositionF[0] == "0" || savedPositionF[1] == "0"){
    //   console.log("second didnt passed");
    //   return 0;
    // }


    isPressedF = finiteStateMachineF(savedPositionF);
    if(isPressedF == 1){
      // console.log("F pressed");
      document.getElementById("red").play();
      drawRed();
      // distance = checkHit();
      if(dist<70 && dist>20){
				score++;
				// document.getElementById("score").innerHTML = score;
        playScoreSoundEffect(score);
        drawScore(score);
			}
    }
    counterF++;
    if(counterF == 2){
      counterF = 0;
    }
  }

  //J
  if(/*hand == 'right' && */position[0] > 0 && position[2] >= -70){
    savedPositionJ[counterJ] = position;

    isPressedJ = finiteStateMachineJ(savedPositionJ);
    if(isPressedJ == 1){
      // console.log("J pressed");
      document.getElementById("red").play();
      drawRed();
      if(dist<70 && dist>20){
        score++;
        // document.getElementById("score").innerHTML = score;
        playScoreSoundEffect(score);
        drawScore(score);
      }
    }
    counterJ++;
    if(counterJ == 2){
      counterJ = 0;
    }
  }

  //E
  if(/*hand == 'left' && */position[0] <= 0 && position[2] < -70){
    savedPositionE[counterE] = position;

    isPressedE = finiteStateMachineE(savedPositionE);
    if(isPressedE == 1){
      // console.log("E pressed");
      document.getElementById("blue").play();
      drawBlue();
      if(dist<70 && dist>20){
        score++;
        // document.getElementById("score").innerHTML = score;
        playScoreSoundEffect(score);
        drawScore(score);
      }
    }
    counterF++;
    if(counterE == 2){
      counterE = 0;
    }
  }

  //I
  if(/*hand == 'right' && */position[0] > 0 && position[2] < -70){
    savedPositionI[counterI] = position;

    isPressedI = finiteStateMachineI(savedPositionI);
    if(isPressedI == 1){
      // console.log("I pressed");
      document.getElementById("blue").play();
      drawBlue();
      if(dist<70 && dist>20){
        score++;
        // document.getElementById("score").innerHTML = score;
        playScoreSoundEffect(score);
        drawScore(score);
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
  if(position[1][1] - position[0][1] > 20)//need more consideration on identifying patterns
    {
      // console.log("up");
        upF = true;//change the state
    }
  else if(position[0][1] - position[1][1] > 20)//need more consideration on identifying patterns
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
  if(position[1][1] - position[0][1] > 20)//need more consideration on identifying patterns
    {
        upJ = true;//change the state
    }
  else if(position[0][1] - position[1][1] > 20)//need more consideration on identifying patterns
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
  if(position[1][1] - position[0][1] > 20)//need more consideration on identifying patterns
    {
        upE = true;//change the state
    }
  else if(position[0][1] - position[1][1] > 20)//need more consideration on identifying patterns
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
  if(position[1][1] - position[0][1] > 20)//need more consideration on identifying patterns
    {
        upI = true;//change the state
    }
  else if(position[0][1] - position[1][1] > 20)//need more consideration on identifying patterns
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
