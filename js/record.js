

// ----------RECORD FUNCTIONS----------------------//


//starting recording, takes selector and recording array index 
function startRecording(input, index){
    console.log(index);
    recordArray[index].recorder.setInput(input);
    recordArray[index].recorder.record(recordArray[index].recording);
    eval(selector).setVolume(0.2, 0.05);
  }
  

  // stops recording, takes index to specify which looper to start. 
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


// ----------LOOPERS FOR RECORD ARRAY----------------------//



looper1 = new p5.SoundLoop(function(timeFromNow){
    recordArray[0].recording.play(timeFromNow);
    recordArray[0].recording.play(timeFromNow);
    //     for(var i = 0; i < pathArray[0].history.length; i++){
    //         var pos = pathArray[0].history[i];
    //         fill(255,0,0);
    //         ellipse(pos.x,pos.y, random(10), random(10));
    // }
    }, 4);

looper2 = new p5.SoundLoop(function(timeFromNow){
    recordArray[1].recording.play(timeFromNow);
    //     for(var i = 0; i < pathArray[1].history.length; i++){
    //         var pos = pathArray[1].history[i];
    //         fill(0,255,0);
    //         ellipse(pos.x,pos.y, random(10), random(10));
    // }
    }, 4);

looper3 = new p5.SoundLoop(function(timeFromNow){
    recordArray[2].recording.play(timeFromNow);
        for(var i = 0; i < pathArray[2].history.length; i++){
            var pos = pathArray[2].history[i];
            fill(0,0,255);
            ellipse(pos.x,pos.y, random(10), random(10));
    }
    }, 4);

looper4 = new p5.SoundLoop(function(timeFromNow){
    recordArray[3].recording.play(timeFromNow);
    background(255 * (looper4.iterations % 2));
    }, 2);









  
  


