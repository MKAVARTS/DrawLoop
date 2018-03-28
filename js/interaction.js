var sketch, randomID, looper1, looper2, looper3, looper4;


// --------- TOOLS -------- //



// tool selector by image id
$(document).click(() => {
    if(event.target.className === "toolImage"){
    console.log("a click on tool ", event.target.id);
    selector = event.target.id;
    console.log("selector: " , selector);
    }
  });


// --------- TOOLBOX -------- //

//delete draw path
$(document).click(()=>{
    console.log(event.target.id);
 if(event.target.className === 'delete'){
     console.log('saw delete class');
     console.log("ID of item to be deleted", event.target.id);
     var buttonID = parseFloat(event.target.id);
     for(var i = 0; i < dropDownArray.length; i++){
         console.log("dropDowArrayID: " ,dropDownArray[i].id);
                 if(dropDownArray[i].id === buttonID){
                     console.log('match!!');
                     console.log("ID of deleted item", dropDownArray[i].id);
                     dropDownArray.splice([i], 1);
                     reprintModules();
                     clear();
                     background(255);
                     break;
                 }
             
    }   
             for(var i = 0; i < recordArray.length; i++){
                var buttonID = parseFloat(event.target.id);
                 if(recordArray[i].id === buttonID){
                    //  var index = parseInt([i]);
                    recordArray[buttonID].recording.stop();
                    (eval(`looper${buttonID}`).stop());
                     recordArray[buttonID].filled = false;
                     recordArray[buttonID].drawing.history = [];
                     recordArray[buttonID].type = false;
                     fillCount--;
                     if(fillCount < 8 ){
                         canDraw = true;
                     }

                     console.log("AT DELETE - fillCount : ", fillCount);
                     console.log("AT DELETE - canDraw? : ", canDraw);
                     console.log("AT DELETE - stop this looper: ", buttonID);
                     console.log("AT DELETE - arrayIndex, delete module: ", buttonID);
                     console.log("AT DELETE - pathArray", pathArray);
                     console.log("AT DELETE - dropDownArray", dropDownArray);
                     console.log("AT DELETE - recording array: ", recordArray);

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
    console.log('trying to re-print modules');
    for(var i = 0; i < dropDownArray.length; i++){
        $('#modules').append(dropDownArray[i].module);
    }
}
}

// ------ CANVAS ----- //

// make modules after drawing shape on canvas
function makeModule(type, index){
      console.log("makeModule arrayIndex", index);
    //   randomID = Math.random();
      var dropDownModule = `<div class="dropdown"> 
      <button style="height:40;width:75%" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <img class="toolImage" src='../Assets/vectors/${type}.png' height="15" width="40">
      <button id=${index} class="delete" type="button"> X </button>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <label>Effect 1</label>
        <input id='${index}effect1' type="range" value="1" min="-4" max="4" step= "1" class="dropdown-item">
        <label>Effect 2</label>
        <input id='${index}effect2' type="range" min="1" max="4" step ="1" value="4" class="dropdown-item">
        <label>Effect 3</label>
        <input id='${index}effect3' type="range" min="-10" max="10" class="dropdown-item">
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


// saves picture of canavs with .toDataURL and pushes sketch to firebase add function 
$(document).click(function(){
    if(event.target.id === "save"){
    canvas = document.getElementById('defaultCanvas0');
    dataURL = canvas.toDataURL('image/jpeg', 0.5);

    sketch = {
        drawing: dataURL,
        soundClip: "nothingRightNow"
    }

    addSketch(sketch)
    .then((sketchID) => {
        console.log(sketchID);
      });
    }
})


// ------ GALLERY ----- //


// clears HTML and javascript and populates from firebase 
$('#populateGallery').click(function(){
        masterVolume(0.0, 0.1);
        setTimeout(function(){
        recordArray = [];
        arrayIndex = 0;
        selector = "null";
        populateGallery();
        getSketch().then((sketches) =>{
            console.log(sketches);
            console.log(Object.keys(sketches));

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


//clears HTML and dropdown menus 
// $('#new').click(function(){
//     clear();
//     background(0);
//     $('#modules').html('');
//     dropDownArray = [];
//   });

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
        populateRecordArray();
      });

