

// ----------RECORD FUNCTIONS----------------------//


//starting recording, takes selector and recording array index 
function startRecording(input, index){
    console.log("start recording at this index", index);
    console.log("record array at startRecording: ", recordArray);
    recordArray[index].recorder.setInput(input);
    recordArray[index].recorder.record(recordArray[index].recording);
    eval(selector).setVolume(0.2, 0.05);
  }
  

function checkRecording(){
    for(var i = 0; i < recordArray.length; i++){
        if(recordArray[i].filled === false){
            path = new pathStore();
            startRecording(eval(selector), i);
            arrayIndex = i;
            console.log("check recording, arrayIndex", arrayIndex);
            makeModule(selector, arrayIndex);
            canDraw = false;
            break;

    }
}
}



  // stops recording, takes index to specify which looper to start. 
  function stopRecording(index){
    console.log("stop recording index",index );
    setTimeout(function(){
      recordArray[index].recorder.stop();
      recordArray[index].filled = true;
      if(index === 0){
      looper0.start();
        }else if(index === 1){
        looper1.start();
            }
            else if(index === 2){
            looper2.start();
                }
                else if(index === 3){
                    looper3.start();
                    }
  }, 200);
  }


// ----------LOOPERS FOR RECORD ARRAY----------------------//



looper0 = new p5.SoundLoop(function(timeFromNow){
    recordArray[0].recording.play(timeFromNow);
        beginShape();
        for(var i = 0; i < pathArray[0].drawing.history.length; i++){
            var pos = pathArray[0].drawing.history[i];
            fill(255 * (looper0.iterations % 2), 255 * (looper0.iterations % 2),0);
            vertex(pos.x,pos.y);
            endShape();
    }
    }, 4);

looper1 = new p5.SoundLoop(function(timeFromNow){
    recordArray[1].recording.play(timeFromNow);
    beginShape();       
    for(var i = 0; i < pathArray[1].drawing.history.length; i++){
            var pos = pathArray[1].drawing.history[i];
            fill(0,0, 255 * (looper1.iterations % 2));
            vertex(pos.x,pos.y);
            endShape();
    }
    }, 4);

looper2 = new p5.SoundLoop(function(timeFromNow){
    recordArray[2].recording.play(timeFromNow);
        beginShape();
        for(var i = 0; i < pathArray[2].drawing.history.length; i++){
            var pos = pathArray[2].drawing.history[i];
            fill(0, 255 * (looper2.iterations % 2),0);
            vertex(pos.x,pos.y);
            endShape();
    }
    }, 4);

looper3 = new p5.SoundLoop(function(timeFromNow){
    recordArray[3].recording.play(timeFromNow);
    beginShape();
for(var i = 0; i < pathArray[3].drawing.history.length; i++){
    var pos = pathArray[3].drawing.history[i];
    fill(255 * (looper3.iterations % 2),0,0);
    vertex(pos.x,pos.y);
    endShape();
}
    }, 4);




// redraws shapes after deleting. 
function redrawShapes(){
    beginShape();
    for(var i = 0; i < pathArray[0].drawing.history.length; i++){
        var pos = pathArray[0].drawing.history[i];
        fill(255 * (looper0.iterations % 2), 255 * (looper0.iterations % 2),0);
        vertex(pos.x,pos.y);
        endShape();
        }
        beginShape();       
        for(var i = 0; i < pathArray[1].drawing.history.length; i++){
                var pos = pathArray[1].drawing.history[i];
                fill(0,0, 255 * (looper1.iterations % 2));
                vertex(pos.x,pos.y);
                endShape();
        }
        beginShape();
        for(var i = 0; i < pathArray[2].drawing.history.length; i++){
            var pos = pathArray[2].drawing.history[i];
            fill(0, 255 * (looper2.iterations % 2),0);
            vertex(pos.x,pos.y);
            endShape();  
        }  
    
        beginShape();
        for(var i = 0; i < pathArray[3].history.drawing.length; i++){
            var pos = pathArray[3].drawing.history[i];
            fill(255 * (looper3.iterations % 2),0,0);
            vertex(pos.x,pos.y);
            endShape();
        }
}









  
  


