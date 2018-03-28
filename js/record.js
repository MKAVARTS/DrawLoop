

// ----------RECORD FUNCTIONS----------------------//


//starting recording, takes selector and recording array index 
function startRecording(input, index){
    console.log("start recording at this index", index);
    console.log("record array at startRecording: ", recordArray);
    recordArray[index].recorder.setInput(input);
    recordArray[index].recorder.record(recordArray[index].recording);
    recordArray[index].type = selector;
    eval(selector).setVolume(0.5, 0.05);
  }
  

function checkRecording(){
    if(fillCount >= 8){
        console.log("fillCount is >= 8, not recording");
    }else if(fillCount < 8){
    for(var i = 0; i < recordArray.length; i++){
        if(recordArray[i].filled === false){
            path = new pathStore();
            startRecording(eval(selector), i);
            arrayIndex = i;
            console.log("check recording, arrayIndex", arrayIndex);
            makeModule(selector, arrayIndex);
            break;
        }

    }
}
}



  // stops recording, takes index to specify which looper to start. 
  function stopRecording(index){
    console.log("stop recording index",index );
    setTimeout(function(){

      
      recordArray[index].recorder.stop();
      recordArray[index].filled = true;
      recordArray[index].drawing = path;
      recordArray[index].id = index;
      recordArray[index].type = selector;

      selector = "null";
      canDraw = true;
      fillCount++;
      if(fillCount >= 8){
          canDraw = false;
          setTimeout(function(){
              $('#looperCountWarning').modal("show");
          })
      }
      console.log("fillCount :", fillCount);
      console.log()
      console.log('record array at STOP RECORDING: ', recordArray);
        if(index === 0){
            looper0.start();
            }
            else if(index === 1){
            looper1.start();
            }
            else if(index === 2){
            looper2.start();
            }
            else if(index === 3){
            looper3.start();
            } 
            else if(index === 4){
              looper4.start();
            }    
            else if(index === 5){
            looper5.start();
            }    
            else if(index === 6){
            looper6.start();
            }
            else if(index === 7){
            looper7.start();
            }
            
  }, 400);
  }


// ----------LOOPERS FOR RECORD ARRAY----------------------//



looper0 = new p5.SoundLoop(function(timeFromNow){
    recordArray[0].recording.play(timeFromNow);
    if(recordArray[0].filled === true){
        beginShape();
        for(var i = 0; i < recordArray[0].drawing.history.length; i++){
            var pos = recordArray[0].drawing.history[i];
            fill(255 * (looper0.iterations % 2));
            vertex(pos.x,pos.y);
            endShape();
            canDrawLooper0 = true;
        }
    } 
}, 4);

looper1 = new p5.SoundLoop(function(timeFromNow){
    recordArray[1].recording.play(timeFromNow);
    if(recordArray[1].filled === true){
    beginShape();       
    for(var i = 0; i < recordArray[1].drawing.history.length; i++){
            var pos = recordArray[1].drawing.history[i];
            fill(255 * (looper1.iterations % 2));
            vertex(pos.x,pos.y);
            endShape();
        }
    }
}, 2);

looper2 = new p5.SoundLoop(function(timeFromNow){
    if(recordArray[2].filled === true){
    recordArray[2].recording.play(timeFromNow);
        beginShape();
        for(var i = 0; i < recordArray[2].drawing.history.length; i++){
            var pos = recordArray[2].drawing.history[i];
            fill( 255 * (looper2.iterations % 2));
            vertex(pos.x,pos.y);
            endShape();
        }
    }
}, 2);

looper3 = new p5.SoundLoop(function(timeFromNow){
    recordArray[3].recording.play(timeFromNow);
if(recordArray[3].filled === true){
    beginShape();
for(var i = 0; i < recordArray[3].drawing.history.length; i++){
    var pos = recordArray[3].drawing.history[i];
    fill(255 * (looper3.iterations % 2));
    vertex(pos.x,pos.y);
    endShape();
        }
    }   
}, 2);


looper4 = new p5.SoundLoop(function(timeFromNow){
    recordArray[4].recording.play(timeFromNow);
    if(recordArray[4].filled === true){
        beginShape();
        for(var i = 0; i < recordArray[4].drawing.history.length; i++){
            var pos = recordArray[4].drawing.history[i];
            fill(255 * (looper4.iterations % 2));
            vertex(pos.x,pos.y);
            endShape();
        }
    }
}, 2);

looper5 = new p5.SoundLoop(function(timeFromNow){
    recordArray[5].recording.play(timeFromNow);
    if(recordArray[5].filled === true){
    beginShape();       
    for(var i = 0; i < recordArray[5].drawing.history.length; i++){
            var pos = recordArray[5].drawing.history[i];
            fill(255 * (looper5.iterations % 2));
            vertex(pos.x,pos.y);
            endShape();
        }
    }
}, 2);

looper6 = new p5.SoundLoop(function(timeFromNow){
    if(recordArray[6].filled === true){
    recordArray[6].recording.play(timeFromNow);
        beginShape();
        for(var i = 0; i < recordArray[6].drawing.history.length; i++){
            var pos = recordArray[6].drawing.history[i];
            fill( 255 * (looper6.iterations % 2));
            vertex(pos.x,pos.y);
            endShape();
        }
    }
}, 2);

looper7 = new p5.SoundLoop(function(timeFromNow){
    recordArray[7].recording.play(timeFromNow);
if(recordArray[7].filled === true){
    beginShape();
for(var i = 0; i < recordArray[7].drawing.history.length; i++){
    var pos = recordArray[7].drawing.history[i];
    fill(255 * (looper7.iterations % 2));
    vertex(pos.x,pos.y);
    endShape();
        }
    }   
}, 2);













  
  


