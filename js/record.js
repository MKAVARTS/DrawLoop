

// ----------RECORD FUNCTIONS----------------------//







// ----------LOOPERS FOR RECORD ARRAY----------------------//



looper1 = new p5.SoundLoop(function(timeFromNow){
    recordArray[0].recording.play(timeFromNow);
        for(var i = 0; i < pathArray[0].history.length; i++){
            var pos = pathArray[0].history[i];
            fill(255,0,0);
            ellipse(pos.x,pos.y, random(10), random(10));
    }
    }, 2);

looper2 = new p5.SoundLoop(function(timeFromNow){
    recordArray[1].recording.play(timeFromNow);
        for(var i = 0; i < pathArray[1].history.length; i++){
            var pos = pathArray[1].history[i];
            fill(0,255,0);
            ellipse(pos.x,pos.y, random(10), random(10));
    }
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













// var counter = 0;
// var looper1, looper2,looper3,looper4,looper5, looper6;
// var startLoop1,startLoop2,startLoop3,startLoop4,startLoop5,startLoop6;

// var length;
// var lengthCounter = 0;
// var loopLength = 0;


// looper1 = new p5.SoundLoop(function(timeFromNow){
//     recordBufferArray[0].soundFile.play(timeFromNow);
// }, 4);

// looper2 = new p5.SoundLoop(function(timeFromNow){
//     recordBufferArray[1].soundFile.play(timeFromNow);
// }, 4);

// looper3 = new p5.SoundLoop(function(timeFromNow){
//     recordBufferArray[2].soundFile.play(timeFromNow);
// }, 4);

// looper4 = new p5.SoundLoop(function(timeFromNow){
//     recordBufferArray[3].soundFile.play(timeFromNow);
// }, 4);

// looper5 = new p5.SoundLoop(function(timeFromNow){
//     recordBufferArray[4].soundFile.play(timeFromNow);
// }, 4);

// looper6 = new p5.SoundLoop(function(timeFromNow){
//     recordBufferArray[5].soundFile.play(timeFromNow);
// }, 4);



// function startLoop1(){
//     looper1.start(0.5);
//     counter = 1;
//     console.log(counter);
// }

// function startLoop2(){
//     looper2.start(0.5);
//     counter = 2;
//     console.log(counter);
// }

// function startLoop3(){
//     looper3.start();
//     counter = 3;
//     console.log(counter);
// }

// function startLoop4(){
//     looper4.start();
//     counter = 4;
//     console.log(counter);
// }

// function startLoop5(){
//     looper5.start();
//     counter = 5;
//     console.log(counter);
// }

// function startLoop6(){
//     looper6.start();
//     counter = 6;
//     console.log(counter);
// }


// function startRecording(input){
//     recordBufferArray[counter].recorder.setInput(input);
//     recordBufferArray[counter].recorder.record(recordBufferArray[counter].soundFile);
// }

// function stopRecording(){
//    setTimeout(stopRecorder, 150);
// }

// function stopRecorder(){
//     recordBufferArray[counter].recorder.stop();
//     if(counter === 0){
//         startLoop1();
//     }else if(counter === 1){
//         startLoop2();
//     }else if(counter === 2){
//         startLoop3();
//     }else if(counter === 3){
//         startLoop4();
//     }else if(counter === 4){
//         startLoop5();
//     }else if(counter === 5){
//         startLoop6();
//     }
    
// }






  
  


