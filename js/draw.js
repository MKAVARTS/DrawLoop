console.log('main.js working');

$(document).ready(function() {
  populateDraw();
});

var length, cnv;
var lengthCounter = 0;
var loopLength = 4;

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
  sine = loadSound('../Assets/sounds/Marimba04.wav', callSineLoop);
  triangle = loadSound('../Assets/sounds/piano.wav', callTriangleLoop);
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
  sine.playMode('restart');
  sine.loop();
}

function callTriangleLoop(){
  triangle.setVolume(0.0);
  triangle.playMode('restart');
  triangle.loop();
}


function setup(){
  cnv = createCanvas(w,h);
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
    if(selector === "sine"){ 
    startRecording(sine);
    stroke(255,0,0);
    strokeWeight(20);
    point(mouseX,mouseY);
    } else if(selector === "triangle"){
      startRecording(triangle);
      strokeWeight(1);
      fill(random(255), random(100), random(150));
      rect(mouseX,mouseY, 50,50);
    }
  });

  if(mouseIsPressed && selector === "sine"){
  noDraw === false;
  lengthCounter++;

  sine.setVolume(0.1, 0.05);
  sine.rate(map(mouseX, 0, w, 1.5, 2.0));

  strokeWeight(2);
  stroke(0);
  line(mouseX,mouseY, pmouseX,pmouseY);

}else if(mouseIsPressed && selector === "triangle"){
  noDraw === false;
  lengthCounter++;
  fill(random(255), random(100), random(150));
  ellipse(mouseX,mouseY, 10,10);

  triangle.setVolume(0.1, 0.05);

  if(lengthCounter % 50 === 0){
    fill(random(255, random(255), random(255)));
    ellipse(mouseX, mouseY, 100, 100);
    triangle.rate(random(2.0));
  }else{
    fill(random(255), random(100), random(150));
    ellipse(mouseX,mouseY, 10, 10);
    triangle.rate(map(mouseX, 0, w, 1.0, 1.2));
  }

} 



$('#soniDraw').mouseup(function(){
  if(selector === "sine"){
  stroke(255,0,0);
  strokeWeight(20);
  point(mouseX,mouseY);

  sine.setVolume(0.0, 0.1);

  makeModule();
  stopRecording();

  length = lengthCounter;
  loopLength = length / 20.00;

  lengthCounter = 0;
  selector = "null";

} else if(selector === "triangle"){

  strokeWeight(1);
  fill(random(255), random(100), random(150));
  rect(mouseX,mouseY, 50,50);

  triangle.setVolume(0.0, 0.05);

  makeModule();
  stopRecording();

  length = lengthCounter;
  loopLength = length / 20.00;

  lengthCounter = 0;
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









