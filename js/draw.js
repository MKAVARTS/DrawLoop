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
var canDraw = true;
var path = new pathStore();
var looper0,looper1, looper2, looper3, looper4;
var fillCount = 0;


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
  if(this.history.length > 100){
    this.history.splice(0,1);
  }
}

  this.showSine = function(){
      for(var i = 0; i < this.history.length; i++){
      var pos = this.history[i];
          stroke(0);
          strokeWeight(1);
          fill(255,255,0);
          ellipse(pos.x,pos.y, 10, 10);
      }
  }
  this.showTriangle = function(){
    for(var i = 0; i < this.history.length; i++){
    var pos = this.history[i];
        stroke(0);
        strokeWeight(1);
        fill(0,0,255);
        ellipse(pos.x,pos.y, 10, 10);
    }
  }
    this.showSaw = function(){
      for(var i = 0; i < this.history.length; i++){
      var pos = this.history[i];
          stroke(0);
          strokeWeight(1);
          fill(0,255,0);
          ellipse(pos.x,pos.y, 10, 10);
      }
    }
      this.showSquare = function(){
        for(var i = 0; i < this.history.length; i++){
        var pos = this.history[i];
            stroke(0);
            strokeWeight(1);
            fill(255,0,0);
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

  eval(selector).setVolume(0.0, 0.01);
  // console.log(pathArray);
  // console.log("end recording");
  stopRecording(arrayIndex);
  // console.log("arrayIndex, mouseRelease:", arrayIndex);
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

  // for(var i = 0; i <dropDownArray.length; i++){
  //   recordArray[i].recording.rate(parseFloat($(`#${i}effect1`).val()));
  //   eval("looper"+i).interval = parseFloat($(`#${i}effect2`).val());
  //   }

// function updateSlider(amount0,amount1){
//   console.log("amount1 at updateSlider: " , amount1);
//   looper0.interval = amount0;
//   looper1.interval = amount1;
// // recordArray[0].recording.setVolume(amount);
// }


// $('.dropdown-item').change(function(){
//   for(var i = 0; i < dropDownArray.length; i++){
//     var updated = 
//   }
// });

  function windowResized() {
     w = innerWidth / 1.5;
     h = newW / 2;
     resizeCanvas(w,h);
  }

  if(mouseIsPressed){ 
    if(fillCount > 8){
      canDraw === false;
  }else if(fillCount <= 8){
    canDraw === true;
  }

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

  for(var i = 0; i < recordArray.length; i++){
    if(recordArray[i].type === "sine" && recordArray[i].type != false){
    recordArray[i].drawing.showSine();
    }
    if(recordArray[i].type === "triangle" && recordArray[i].type != false){
      recordArray[i].drawing.showTriangle();
      }
      if(recordArray[i].type === "sawtooth" && recordArray[i].type != false){
        recordArray[i].drawing.showSaw();
        }
        if(recordArray[i].type === "square" && recordArray[i].type != false){
          recordArray[i].drawing.showSquare();
          }
    }
}





 









