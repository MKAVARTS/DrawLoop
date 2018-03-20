console.log('main.js working');

$(document).ready(function() {
  populateDraw();
});

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

function preload(){
  sine = loadSound('../Assets/sounds/synthy.wav', sineStart);
  triangle = loadSound('../Assets/sounds/african.wav', triangleStart);
  sawtooth = loadSound('../Assets/sounds/triangle.wav', sawToothStart);
  square = loadSound('../Assets/sounds/thumb.wav', squareStart);

}

function sineStart(){
 sine.setVolume(0.0);
 sine.playMode("restart");
 sine.loop();
}

 function triangleStart(){
 triangle.setVolume(0.0);
 triangle.playMode("restart");
 triangle.loop();

}

function sawToothStart(){
  sawtooth.setVolume(0.0);
  sawtooth.playMode("restart");
  sawtooth.loop();
 }

 function squareStart(){
  square.setVolume(0.0);
  square.playMode("restart");
  square.loop();
 }

function setup(){
  cnv = createCanvas(w,h);
  cnv.parent('soniDraw');
  background(255); 

  textSize(25);

  console.log(recordBufferArray);

  for(var i = 0; i < 16; i++){
    recordBufferArray[i] =
      {
        recorder: new p5.SoundRecorder(),
        soundFile: new p5.SoundFile(),
        gain: new p5.Gain
    }
  }

}


function draw(){

  function windowResized() {
     w = innerWidth / 1.5;
     h = newW / 2;

     resizeCanvas(w,h);

  }

  // mouseDown sine 
  $('#soniDraw').mousedown(function(){
  if(selector === "sine"){
    sine.setVolume(0.1, 0.1, 0.05);
    startRecording(sine);

    stroke(255,255,0);
    strokeWeight(20);
    point(mouseX,mouseY);

  }else if(selector === "triangle"){

    startRecording(triangle);
    triangle.setVolume(0.1, 0.1, 0.05);

    stroke(255,255,0);
    strokeWeight(20);
    point(mouseX,mouseY);
  }else if(selector === "sawtooth"){

    startRecording(sawtooth);
    sawtooth.setVolume(0.1, 0.1, 0.05);

    stroke(255,255,0);
    strokeWeight(20);
    point(mouseX,mouseY);
  }else if(selector === "square"){

    startRecording(square);
    square.setVolume(0.1, 0.1, 0.05);

    stroke(255,255,0);
    strokeWeight(20);
    point(mouseX,mouseY);
  }
  });


  //mouseIsPressed
  if(mouseIsPressed && selector === "sine"){
  // sine.rate(map(mouseX, 0, w, 1.5, 2.0));
  strokeWeight(2);
  stroke(0);
  line(mouseX,mouseY, pmouseX,pmouseY);

  }else if(mouseIsPressed && selector === "triangle"){
    strokeWeight(2);
    stroke(0);
    line(mouseX,mouseY, pmouseX,pmouseY);
  }else if(mouseIsPressed && selector === "sawtooth"){
    strokeWeight(2);
    stroke(0);
    line(mouseX,mouseY, pmouseX,pmouseY);
  }else if(mouseIsPressed && selector === "square"){
    strokeWeight(2);
    stroke(0);
    line(mouseX,mouseY, pmouseX,pmouseY);
  }


//mousedUp 
$('#soniDraw').mouseup(function(){
  if(selector === "sine"){
  stroke(255,255,0);
  strokeWeight(20);
  point(mouseX,mouseY);

  sine.setVolume(0.0,0.1);

  makeModule();
  
  setTimeout(stopRecording, 400);

  selector = "null";
} else if(selector === "triangle"){
  stroke(255,255,0);
  strokeWeight(20);
  point(mouseX,mouseY);

  triangle.setVolume(0.0,0.1);

  makeModule();
  
  setTimeout(stopRecording, 400);

  selector = "null";
} else if(selector === "sawtooth"){
  stroke(255,255,0);
  strokeWeight(20);
  point(mouseX,mouseY);

  sawtooth.setVolume(0.0,0.1);

  makeModule();
  
  setTimeout(stopRecording, 400);

  selector = "null";
}else if(selector === "square"){
  stroke(255,255,0);
  strokeWeight(20);
  point(mouseX,mouseY);

  square.setVolume(0.0,0.1);

  makeModule();
  
  setTimeout(stopRecording, 400);

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









