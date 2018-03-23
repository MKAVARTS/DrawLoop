console.log('main.js working');


var cnv;

$(document).click(function(){
  clickTarget = event.target.className;
})

// mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height
let recordBufferArray = [];
let dropDownArray = [];
var w = innerWidth / 1.5;
var h = w / 2;
var sine, triangle, sawooth, square;
let amplitude;
var selector = "null";
var noDraw = true;
var ifIndexFilled = true;
var startRecording, stopRecording, playbackRecording, stopRecorder, checkRecording;
var startLooper, startLooping;
var database;
var cnv;
var pathRecord;

var clickTarget;
var sound;
var pathArray = [];
var updatePath;
var recordArray = [];
var points = [];
var arrayIndex;
var looper1, looper2;
var canDraw = false;
var path = new pathStore();
var looper1, looper2, looper3, looper4;


// ----------PRELOAD SOUNDS----------------------//

function preload(){
  masterVolume(0.0);
  sine = loadSound('../Assets/sounds/synthy.wav', function(){
    sine.setVolume(0.0);
    sine.playMode("restart");
    sine.loop();
  });
  triangle = loadSound('../Assets/sounds/drone.wav', function(){
    triangle.setVolume(0.0);
    triangle.playMode("restart");
    triangle.loop();
  });
  sawtooth = loadSound('../Assets/sounds/african.wav', function(){
    // sawtooth.rate(2.0);
    sawtooth.setVolume(0.0);
    sawtooth.playMode("restart");
    sawtooth.loop();
  });
  square = loadSound('../Assets/sounds/thumb.wav', function(){
    square.rate(0.5);
    square.setVolume(0.0);
    square.playMode("restart");
    square.loop();

    masterVolume(1.0);
  });

}

//populates an array with an object at each index
// containing a recorder function,
// and a gain function. 
function populateRecordArray(){
for(var i = 0; i < 4; i++){
  recordArray.push(
      {
          recorder: new p5.SoundRecorder(),
          recording: new p5.SoundFile(),
          gain: new p5.Gain(),
          filled: false
      }
  );
  console.log("recordArray", recordArray);  
}
}



// ----------STORE PATHS ----------------------//



//this function is called every time a user draws
// to store the points of the draw path. 
function pathStore(x,y){
  this.history = [];

this.update = function(x,y){
  var v = createVector(x,y);
  this.history.push(v);
}

  this.show = function(){
      for(var i = 0; i < this.history.length; i++){
          var pos = this.history[i];
          stroke(0);
          fill(random(255));
          ellipse(pos.x,pos.y, 10, 10);
  
      }
  }
}





// ---------- MOUSE PRESS AND RELEASE  ----------------------//


// this function starts a recording and a new pathStore function 
// to record points into, if the mouse press is on the canvas, 
// and isn't clicking on a menu pop-up with a "user" class. 


function mousePressed(){
  if(clickTarget === "user"){

  }else if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h && selector != "null"){
    masterVolume(1.0, 0.01);
    var source = eval(selector);
    setTimeout(function(){
    checkRecording(source);  
    }, 25);
  }
}


//this function ends the recording and pushes the path into an array  
// if the mouse press is on the canvas, 
// and isn't clicking on a menu pop-up with a "user" class. 
function mouseReleased(){
  if(clickTarget === "user"){

  }else if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h && selector != "null"){
  pathArray.push(
    {
      drawing: path,
      id: arrayIndex
  }

  );
  eval(selector).setVolume(0.0, 0.01);
  console.log(pathArray);
  console.log("end recording");
  stopRecording(arrayIndex);
  console.log("arrayIndex, mouseRelease:", arrayIndex);
  selector = "null";
  }
  canDraw === true;
}



// ----------------SETUP ----------------------//


function setup(){
  cnv = createCanvas(w,h);
  cnv.parent('soniDraw');
  background(255); 
  textSize(25);

  populateRecordArray();
}


// ----------------DRAWLOOP ----------------------//

function draw(){

  function windowResized() {
     w = innerWidth / 1.5;
     h = newW / 2;
     resizeCanvas(w,h);
  }


  if(mouseIsPressed){ 
  setTimeout(updatePath, 200);
    function updatePath(){
    if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h && selector != "null"){
    path.update(mouseX,mouseY);
    strokeWeight(1);
    stroke(0);
    line(mouseX,mouseY, pmouseX, pmouseY);
      }
    }
  }

  for(var i = 0; i < pathArray.length; i++){
    pathArray[i].drawing.show();
  }
}



 









