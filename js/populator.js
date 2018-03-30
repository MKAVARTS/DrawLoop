
$(document).ready(function() {
    populateDraw();
  });


function populateDraw(){
    $('#mainDiv').html(
       `<div class="row" id="top">
        <div id="indexHeaders" class="col-4">
            <h1>DrawLoop</h1>
            <h3>A sound drawing application and community gallery</h3>
        </div>
        <div id="toolBox" class= "col-4">
            <div>
                <h4 id="toolBoxHeading">Toolbox</h4>
            </div>
            <div id="vectorImage">
                <img id="sine" class="toolImage" src='Assets/vectors/sine.png' height="40" width="65">
                <img id="triangle" class="toolImage" src='Assets/vectors/triangle.png' height="40" width="65">
                <img id="sawtooth" class="toolImage" src='Assets/vectors/sawtooth.png' height="40" width="65">
                <img id="square" class="toolImage" src='Assets/vectors/square.png' height="40" width="65">
            </div>
        </div>
        <div id="toolsHeader" class="col">
        <button type="button" id="information" class="user" data-toggle="modal" data-target="#info"> ? </button>
            <button class="user" id="save"> S </button>
            <button class="user" id="galleryButton"  class="user" data-toggle="modal" data-target="#galleryWarning"> G </button>
            <button class="user" id="new"  class="user" data-toggle="modal" data-target="#newDrawing"> N </button>
            <h5>Tools</h5>
        </div>
    </div>
    <div class="row" class="canvasAndModules">
        <div class="col-8" id="soniDraw"></div>
        <div class="col-1"></div>
        <div id="modules" class="col-2">
        </div>
    </div>`
    );
}

function populateGallery(){
    $('#mainDiv').empty();
    $('#mainDiv').html(
    `<div id="galleryHeaders">
        <h1 class="galleryTitle">DrawLoop</h1>
            <h4  class="galleryTitle"> Gallery </h4>
            <a href="index.html"><button class="user" id="backToDrawButton">Back To Draw</button></a>
    </div>

    <div id="galleryPicsContainer" class="container">
        <div id="pics" class="row">

        </div>
    </div>`
    );
}