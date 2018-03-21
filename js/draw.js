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
var selector;
var noDraw = true;
var startRecording, stopRecording, playbackRecording, stopRecorder;
var startLooper, startLooping;
var database;
var cnv;
var pathRecord;

var clickTarget;
var sound;
var pathArray = [];
var recordArray = [];
var points = [];
var arrayIndex = 0;
var looper1, looper2;
var canDraw = false;
var path;
// var w = 900;
// var h = 600;
var looper1, looper2, looper3, looper4;


// ----------PRELOAD SOUNDS----------------------//

function preload(){
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
  sawtooth = loadSound('../Assets/sounds/triangle.wav', function(){
    sawtooth.setVolume(0.0);
    sawtooth.playMode("restart");
    sawtooth.loop();
  });
  square = loadSound('../Assets/sounds/thumb.wav', function(){
    square.setVolume(0.0);
    square.playMode("restart");
    square.loop();
  });
}





// ----------STORE PATHS ----------------------//



function mousePressed(){
  if(clickTarget === "user"){

  }else if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h){
    var source = eval(selector);
    setTimeout(function(){
      startRecording(source, arrayIndex);  
    }, 25);
    path = new pathStore();
    console.log('start recording');
  }
}

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
          ellipse(pos.x,pos.y, 10, 10);
  
      }
  }
}


function mouseReleased(){
  if(clickTarget === "user"){

  }else if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h){
  makeModule(selector);
  pathArray.push(path);
  eval(selector).setVolume(0.0, 0.01);
  console.log(pathArray);
  console.log("end recording");
  stopRecording(arrayIndex);
  arrayIndex++;
  }
  canDraw === true;
}



// ----------------SETUP AND CREATE RECORD ARRAY ----------------------//


function setup(){
  cnv = createCanvas(w,h);
  cnv.parent('soniDraw');
  pixelDensity(1);
  background(255); 
  textSize(25);

  for(var i = 0; i < 4; i++){
    recordArray.push(
        {
            recorder: new p5.SoundRecorder(),
            recording: new p5.SoundFile(),
            gain: new p5.Gain()
        }
    );
    console.log("recordArray", recordArray);  
}

}



function startRecording(input, index){
  recordArray[index].recorder.setInput(input);
  recordArray[index].recorder.record(recordArray[index].recording);
  eval(selector).setVolume(0.2, 0.05);
}

function stopRecording(index){
  console.log("arrayIndex", index);
  setTimeout(function(){
    recordArray[index].recorder.stop();
    if(index === 0){
    looper1.start();
  }else if(index === 1){
  looper2.start();
  }
  else if(index === 2){
    looper3.start();
    }
}, 200);
}


// ----------------DRAWLOOP ----------------------//

function draw(){

  function windowResized() {
     w = innerWidth / 1.5;
     h = newW / 2;

     resizeCanvas(w,h);

  }
  if(mouseIsPressed){ 
    if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h){
    path.update(mouseX,mouseY);
    stroke(0);
    line(mouseX,mouseY, pmouseX, pmouseY);
    }
  }
  for(var i = 0; i < pathArray.length; i++){
    pathArray[i].show();
  }
}


$('#new').click(function(){
  clear();
  background(0);
  $('#modules').html('');
  dropDownArray = [];
});












