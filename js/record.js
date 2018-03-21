

// ----------RECORD FUNCTIONS----------------------//







// ----------LOOPERS FOR RECORD ARRAY----------------------//



looper1 = new p5.SoundLoop(function(timeFromNow){
    recordArray[0].recording.play(timeFromNow);
    //     for(var i = 0; i < pathArray[0].history.length; i++){
    //         var pos = pathArray[0].history[i];
    //         fill(255,0,0);
    //         ellipse(pos.x,pos.y, random(10), random(10));
    // }
    }, 1);

looper2 = new p5.SoundLoop(function(timeFromNow){
    recordArray[1].recording.play(timeFromNow);
    //     for(var i = 0; i < pathArray[1].history.length; i++){
    //         var pos = pathArray[1].history[i];
    //         fill(0,255,0);
    //         ellipse(pos.x,pos.y, random(10), random(10));
    // }
    }, 3);

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









  
  


