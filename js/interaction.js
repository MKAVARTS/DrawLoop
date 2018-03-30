var sketch, randomID, looper1, looper2, looper3, looper4, firebaseRecording;
var song;



// --------- MOUSE HOVERS & SELECTORS  -------- //


$(document).mouseover(function(){
    if(event.target.className === "user"){
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
        firebaseRecording = new recordForFirebase();
        firebaseRecording.recorder.record(firebaseRecording.recording);
        setTimeout(stopFirebaseRecording, 1000);
    }
});




function stopFirebaseRecording(){
    console.log('trying to stop recording for firebase');
    firebaseRecording.recorder.stop();
    sendToFirebase(firebaseRecording.recording);
}

// saves picture of canavs with .toDataURL and pushes sketch to firebase add function 
function sendToFirebase(recording){

    $('#savingDrawing').modal('hide');
    canvas = document.getElementById('defaultCanvas0');
    dataURL = canvas.toDataURL('image/jpeg', 0.5);
    var audioBlob = new Blob(recording);
    var audioURL = URL.createObjectURL(audioBlob);


    console.log("recording at sendToFirebase", audioURL);
    sketch = {
        drawing: dataURL,
        soundClip: audioURL
    }

    addSketch(sketch)
    .then((firebaseNodeInfo) => {
        console.log(firebaseNodeInfo.drawing);
      });

}


// ------ GALLERY ----- //


// clears HTML and javascript and populates from firebase 
$('#populateGallery').click(function(){



        masterVolume(0.0, 0.1);
        looper0.stop();
        looper1.stop();
        looper2.stop();
        looper3.stop();
        looper4.stop();
        looper5.stop();
        looper6.stop();
        looper7.stop();
        updateSliders = false;
        setTimeout(function(){
        // recordArray = [];
        // arrayIndex = 0;
        selector = "null";
        populateGallery();
        getSketch().then((sketches) =>{
            // console.log(sketches);
            // console.log(Object.keys(sketches));

            Object.keys(sketches).forEach(function(item){
                $('#pics').append(
                `<div class="row">
                    <div class="col">
                         <img class="galleryPicture" width=500 height=300 src='${sketches[item].drawing}'/>
                    </div>
                </div>`);
            })
             });
        }, 200);
})


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

