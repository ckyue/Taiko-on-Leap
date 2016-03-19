var score = 0;

window.onkeydown = function (event){
  if(event.keyCode == 70){
    console.log("red");
    document.getElementById("red").play();
    if(dist<60 && dist>50 && taikoType[0]==0){
      score++;
      document.getElementById("score").value = score;
    }
  }
  if(event.keyCode == 69){
    console.log("blue");
    document.getElementById("blue").play();
    if(dist<60 && dist>50 && taikoType[0]==1){
      score++;
      document.getElementById("score").value = score;
  }
}
}
