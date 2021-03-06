console.log('main.js working');


var cnv;

$(document).click(function(){
  clickTarget = event.target.className;
});

$( document ).ready(function() {
  $('#info').modal('show');
});



// mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height
let recordBufferArray = [];
let dropDownArray = [];
var w = 700;
var h = 350;
var sine, triangle, sawooth, square;
let amplitude;
var selector = "null";
var ifIndexFilled = true;
var startRecording, stopRecording, playbackRecording, stopRecorder, checkRecording;
var startLooper, startLooping;
var cnv;

var clickTarget;
var updatePath;
var recordArray = [];
var arrayIndex;
var canDraw = true;
var path = new pathStore();
var looper0,looper1, looper2, looper3, looper4;
var fillCount = 0;
var updateSliders = false;




// ----------PRELOAD SOUNDS----------------------//

function preload(){
  masterVolume(0.0);
  sine = loadSound('../Assets/sounds/goldenDrums.wav', function(){
    sine.setVolume(0.0);
    sine.playMode("restart");
    sine.loop();
  });
  triangle = loadSound('../Assets/sounds/drone.wav', function(){
    triangle.setVolume(0.0);
    triangle.playMode("restart");
    triangle.loop();
  });
  sawtooth = loadSound('../Assets/sounds/synthy.wav', function(){
    // sawtooth.rate(2.0);
    sawtooth.setVolume(0.0);
    sawtooth.playMode("restart");
    sawtooth.loop();
  });
  square = loadSound('../Assets/sounds/popMarimbaD.wav', function(){
    // square.rate(0.5);
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
for(var i = 0; i <= 8; i++){
  recordArray.push(
      {
          recorder: new p5.SoundRecorder(),
          recording: new p5.SoundFile(),
          filled: false,
          type: false,
          id: false,
          drawing: new pathStore()
      }
  );
  // console.log("recordArray", recordArray);  
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
}



// ---------- MOUSE PRESS AND RELEASE  ----------------------//


// this function starts a recording and a new pathStore function 
// to record points into, if the mouse press is on the canvas, 
// and isn't clicking on a menu pop-up with a "user" class. 


function mousePressed(){

  if(clickTarget === "user"){

  }else if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h && selector != "null" && canDraw === true){
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

  }else if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h && selector != "null" && canDraw === true){

  canDraw = false;
  eval(selector).setVolume(0.0, 0.02);
  // console.log(pathArray);
  // console.log("end recording");

setTimeout(callRecordingStop, 50);

function callRecordingStop(){
  stopRecording(arrayIndex);
}
  // console.log("arrayIndex, mouseRelease:", arrayIndex);
  setTimeout(ableToDraw, 250);
  function ableToDraw(){
    canDraw = true;
  }
  }
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



  //this loop updates the sliders if it has a "filled" property
  for(var i = 0; i < 7; i++ && updateSliders === true){
    if(recordArray[i].filled === true){
    recordArray[i].recording.rate(parseFloat($(`#${i}effect1`).val()));
    eval("looper"+i).interval = parseFloat($(`#${i}effect2`).val());
    recordArray[i].recording.setVolume(parseFloat($(`#${i}effect3`).val()));
    }else {
      //
    }
  }


  //stop drawing if there are more than 8 drawings in the canvas.

  if(mouseIsPressed){ 
    if(fillCount > 8){
      canDraw === false;
  }else if(fillCount <= 8){
    canDraw === true;
  }


//store the mouseX & mouseY points 
  if(canDraw === true){

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
  }
}






 









