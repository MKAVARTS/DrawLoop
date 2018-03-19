console.log('main.js working');

$(document).ready(function() {
  populateDraw();
});

// mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height
let recordBufferArray = [];
let dropDownArray = [];
var w = innerWidth / 1.5;
var h = w / 2;
let sine;
let amplitude;
var selector;
var noDraw = true;
var startRecording, stopRecording, playbackRecording, stopRecorder;
var startLooper, startLooping;
var database;
var cnv;

function preload(){
  sine = loadSound('../Assets/sounds/drone.wav', callSineLoop);
  for(var i = 0; i < 16; i++){
    recordBufferArray[i] =
      {
        recorder: new p5.SoundRecorder(),
        soundFile: new p5.SoundFile(),
        gain: new p5.Gain
    }
  }
}

function callSineLoop(){
  sine.setVolume(0.0);
  sine.playMode('sustain');
  sine.loop();
}


function setup(){
  var cnv = createCanvas(w,h);
  cnv.parent('soniDraw');
  background(255); 

  textSize(25);

  console.log(recordBufferArray);
  amplitude = new p5.Amplitude();

}


function draw(){

  function windowResized() {
     w = innerWidth / 1.5;
     h = newW / 2;

     resizeCanvas(w,h);

  }

  
  $('#soniDraw').mousedown(function(){
    startRecording(sine);
    if(selector === "sine"){
    stroke(255,0,0);
    strokeWeight(20);
    point(mouseX,mouseY);
    }
  });

  if(mouseIsPressed && selector === "sine"){
  noDraw === false;
  sine.setVolume(mouseY, 0, h, 0.0, 0.1);
  sine.rate(map(mouseX, 0, w, 0.0, 4.0));
  strokeWeight(2);
  stroke(0);
  line(mouseX,mouseY, pmouseX,pmouseY);
}

$('#soniDraw').mouseup(function(){
  if(selector === "sine"){
  stroke(255,0,0);
  strokeWeight(20);
  point(mouseX,mouseY);
  sine.setVolume(0.0, 0.1);
  console.log('trying to turn down sine');
  makeModule();
  stopRecording();
  selector = "null";
} 
});

$('#new').click(function(){
  clear();
  background(255);
  $('#modules').html('');
  dropDownArray = [];
});
}









