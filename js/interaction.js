var sketch, randomID, looper1, looper2, looper3, looper4, firebaseRecording;
var song,videoElement, stream, mediaRecorder, canvus, firebaseRecorder, firebaseVideo, videoPlayback;
var storageRef, firebaseVideoRef;

// --------- MOUSE HOVERS & SELECTORS  -------- //


$(document).mouseover(function(){
    if(event.target.className === "user" && updateSliders === true){
        console.log('mousing over user class');
        $(`#${event.target.id}`).addClass('hoverState');
        $('.user').not(`#${event.target.id}`).removeClass('hoverState');
    }else{
        $('.user').removeClass('hoverState');
    }
})




// --------- TOOLBOX -------- //



// tool selector by image id
$(document).click(() => {
    if(event.target.className === "toolImage"){
    // console.log("a click on tool ", event.target.id);
    console.log("on document click log selector :", selector);
    selector = event.target.id;
    $( `#${event.target.id}` ).addClass( 'hoverState');
    $('.toolImage').not(`#${event.target.id}`).removeClass('hoverState');
    // console.log("selector: " , selector);
    }
  });





// --------- TOOLS -------- //

//delete draw path
$(document).click(()=>{
 if(event.target.className === 'delete'){
     var buttonID = parseFloat(event.target.id);
     for(var i = 0; i < dropDownArray.length; i++){
                 if(dropDownArray[i].id === buttonID){
                     dropDownArray.splice([i], 1);
                     $(`#${buttonID.toString()}`).remove();
                     clear();
                     background(255);
                     break;
                 }
             
    }   
             for(var i = 0; i < recordArray.length; i++){
                var buttonID = parseFloat(event.target.id);
                 if(recordArray[i].id === buttonID){
                    recordArray[buttonID].recording.stop();
                    (eval(`looper${buttonID}`).stop());
                     recordArray[buttonID].filled = false;
                     recordArray[buttonID].drawing.history = [];
                     recordArray[buttonID].type = false;
                     fillCount--;
                     if(fillCount < 8 ){
                         canDraw = true;
                     }

                }
             }
    }
});



//reprint modules after deleting
function reprintModules(){
    if(dropDownArray.length === 0){
        $('#modules').html('');
    }else{
    $('#modules').empty();
    for(var i = 0; i < dropDownArray.length; i++){
        $('#modules').append(dropDownArray[i].module);
    }
}
}

// ------ CANVAS ----- //

// make modules after drawing shape on canvas
function makeModule(type, index){
      console.log("makeModule arrayIndex", index);
      var dropDownModule = `<div id='${index}' class="dropdown"> 
      <button style="height:40;width:75%" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <img class="toolImage" src='../Assets/vectors/${type}.png' height="15" width="40">
      <button id=${index} class="delete" type="button"> X </button>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <label>Rate</label>
        <input id='${index}effect1' type="range" value="1.0"  min="-2.0" max="2.0" step= "0.25" class="dropdown-item" class="effectSlider">
        <label>Length</label>
        <input id='${index}effect2' value ="4.0" type="range" min="0.5" max="4.0" step ="0.5" class="dropdown-item" class="effectSlider">
        <label>Volume</label>
        <input id='${index}effect3' type="range" value="1.0" step="0.1" min="0.0" max="0.5" class="dropdown-item" class="effectSlider">
      </div>
    </div>`
      dropDownArray.push(
        {
          module: dropDownModule,
          id: index
        }
      );
      $('#modules').append(dropDownModule);
    }


// ------ SAVE ----- //



$(document).click(function(){
    if(event.target.id === "save"){
        $('#savingDrawing').modal('show');



        initRecorderWithCanvas();
        setTimeout(startFirebaseRecording, 1000);
        

    function initRecorderWithCanvas() {
       var canvas = document.getElementById('defaultCanvas0');
        var stream = canvas.captureStream(60); // build a 24 fps stream
        recorder = new MediaRecorder(stream);
        // listen to dataavailable, which gets triggered whenever we have
        // an audio blob available
        recorder.addEventListener('dataavailable', function (evt) {
          updateVideo(evt.data);
        });
        // recorder.addEventListener('stop', function(evt){
        //     sendToFirebase(recorder);
        // })
      }



        setTimeout(stopFirebaseRecording, 20000);


        function startFirebaseRecording() {
          
            recorder.start();
          }



          function stopFirebaseRecording() {
            $('#savingDrawing').modal('hide');

            // eventually this will trigger the dataavailable event
            recorder.stop();

          }


          function updateVideo(blob) {

            // use the blob from MediaRecorder as source for the video tag
            firebaseVideo = new Blob([blob], {type: 'video/mp4'});
            // videoPlayback = window.URL.createObjectURL(firebaseVideo);
            sendToFirebase(firebaseVideo);
            // video.play();
          }
          

    }
});





// saves picture of canavs with .toDataURL and pushes sketch to firebase add function 
function sendToFirebase(recording){


    console.log("send to firebase recording: ", recording);


    runStorage(recording);

    function runStorage(file){

    storageRef = firebase.storage().ref(`sketch/${Math.random()}.mp4`);
    var task = storageRef.put(recording);
    task.on('state_changed',

    function error(err){
        console.log('error from firebase storage PUT: ', err);
        getUrl();
    },

    function complete(){
        getUrl();
    
});
}
}


    function getUrl(){
    storageRef.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
        
        // This can be downloaded directly:
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        

    sketch = {
        downloadURL: url
    }

    addSketch(sketch)
    .then((firebaseNodeInfo) => {
        console.log(firebaseNodeInfo);
      });
    

        }).catch(function(error) {
            console.log("download from firebase error: ", error);
        });
    }
    // canvas = document.getElementById('defaultCanvas0');
    // dataURL = canvas.toDataURL('image/jpeg', 0.5);


    // var firebaseEntry = URL.createObjectURL(recording);



// ------ GALLERY ----- //

// function updateVideo(blob) {
//     firebaseVideo = document.getElementById('video');
//     // use the blob from MediaRecorder as source for the video tag
//     firebaseVideo.src = URL.createObjectURL(blob);
//     firebaseVideo.controls = true;
//     video.play();
//   }
  


// clears HTML and javascript and populates from firebase 
$('#populateGallery').click(function(){
        updateSliders = false;

        masterVolume(0.0, 0.1);
        looper0.stop();
        looper1.stop();
        looper2.stop();
        looper3.stop();
        looper4.stop();
        looper5.stop();
        looper6.stop();
        looper7.stop();
        setTimeout(function(){
        // recordArray = [];
        // arrayIndex = 0;
        selector = "null";
        masterVolume(1.0, 0.1);
        populateGallery();


        getSketch().then((sketches) =>{
            console.log(sketches);

            Object.keys(sketches).forEach(function(item){
                var source = sketches[item].downloadURL;
                $('#mainDiv')
                .append(`<video class="col" controls="true" src='${source}'></video>`);
        });

             });

        }, 200);
    });



// ------ NEW ----- //


//clears javascript arrays and handles audio 
    $('#deleteDrawing').click(function(){
        masterVolume(0.0, 0.1);
        clear();
        background(255);
        $('#modules').html('');
        dropDownArray = [];
        pathArray = [];
        recordArray = [];
        arrayIndex = 0;
        looper0.stop();
        looper1.stop();
        looper2.stop();
        looper3.stop();
        looper4.stop();
        looper5.stop();
        looper6.stop();
        looper7.stop();
        populateRecordArray();
      });

