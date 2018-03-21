console.log('main.js working');


var cnv;



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
  if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h){  
    path = new pathStore();
    startRecording(eval(selector), arrayIndex);
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
  if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h){
  pathArray.push(path);
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
  input.setVolume(0.5, 0.1);
}

function stopRecording(index){
  makeModule(selector);
  console.log("arrayIndex", index);
  eval(selector).setVolume(0.0,0.02);
  setTimeout(function(){
  recordArray[index].recorder.stop();
  if(index === 0){
  looper1.start(0.1);
  }else if(index === 1){
  looper2.syncedStart(looper1);
  }
  else if(index === 2){
    looper3.syncedStart(looper2);
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
    if(selector === "sine"){
    path.update(mouseX,mouseY);
    sine.rate(1.0);
    stroke(0);
    line(mouseX,mouseY, pmouseX, pmouseY);
    }
} if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h){
  if(selector === "triangle"){
  path.update(mouseX,mouseY);
  sine.rate(1.0);
  stroke(0);
  line(mouseX,mouseY, pmouseX, pmouseY);
  }
} if(mouseX > 0 && mouseX < w && mouseY > 0 && mouseY < h){
  if(selector === "sawtooth"){
  path.update(mouseX,mouseY);
  sine.rate(1.0);
  stroke(0);
  line(mouseX,mouseY, pmouseX, pmouseY);
  }
}
}
for(var i = 0; i < pathArray.length; i++){
    if(canDraw === true){
    pathArray[i].show();
    }
}

}




$('#new').click(function(){
  clear();
  background(0);
  $('#modules').html('');
  dropDownArray = [];
});












