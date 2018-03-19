var counter = 0;
let looper1, looper2,looper3,looper4,looper5, looper6;
var startLoop1,startLoop2,startLoop3,startLoop4,startLoop5,startLoop6;


looper1 = new p5.SoundLoop(function(timeFromNow){
    recordBufferArray[0].soundFile.play(timeFromNow);
    }, 2);

looper2 = new p5.SoundLoop(function(timeFromNow){
    recordBufferArray[1].soundFile.play(timeFromNow);
    }, 2);

looper3 = new p5.SoundLoop(function(timeFromNow){
    recordBufferArray[2].soundFile.play(timeFromNow);
    }, 2);

looper4 = new p5.SoundLoop(function(timeFromNow){
    recordBufferArray[3].soundFile.play(timeFromNow);
    }, 2);

looper5 = new p5.SoundLoop(function(timeFromNow){
    recordBufferArray[4].soundFile.play(timeFromNow);
    }, 2);

looper6 = new p5.SoundLoop(function(timeFromNow){
    recordBufferArray[5].soundFile.play(timeFromNow);
    }, 2);



function startLoop1(){
    looper1.start();
    counter = 1;
    console.log(counter);
}

function startLoop2(){
    looper2.start();
    counter = 2;
    console.log(counter);
}

function startLoop3(){
    looper3.start();
    counter = 3;
    console.log(counter);
}

function startLoop4(){
    looper4.start();
    counter = 4;
    console.log(counter);
}

function startLoop5(){
    looper5.start();
    counter = 5;
    console.log(counter);
}

function startLoop6(){
    looper6.start();
    counter = 6;
    console.log(counter);
}


function startRecording(input){
    recordBufferArray[counter].recorder.setInput(input);
    recordBufferArray[counter].recorder.record(recordBufferArray[counter].soundFile);
}

function stopRecording(){
    setTimeout(stopRecorder, 1000);
}

function stopRecorder(){
    recordBufferArray[counter].recorder.stop();
    if(counter === 0){
    startLoop1();
    }else if(counter === 1){
        startLoop2();
    }else if(counter === 2){
        startLoop3();
    }else if(counter === 3){
        startLoop4();
    }else if(counter === 4){
        startLoop5();
    }else if(counter === 5){
        startLoop6();
    }
    
}






  
  


