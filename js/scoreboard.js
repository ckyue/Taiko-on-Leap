var Firebase = require('firebase');
var scoreboard = new Firebase('https://taiko-on-leap.firebaseio.com/');

var scoreRef = scoreboard.child('score');
scoreRef.update({
  caonima: "123"
});

scoreRef.orderByValue().on('value',function(snapshot){
    snapshot.forEach(function(data){
      console.log("Name: " + data.key() + "scored " + data.val());
    });
});
