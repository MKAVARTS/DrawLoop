var config;
  
  
   config = {
    apiKey: "AIzaSyAIRT_J6splfPCoupgJTBYfRQDFXYx_MB0",
    authDomain: "soni-5064d.firebaseapp.com",
    databaseURL: "https://soni-5064d.firebaseio.com",
    projectId: "soni-5064d",
    storageBucket: "soni-5064d.appspot.com",
    messagingSenderId: "967537043822"
  };
  firebase.initializeApp(config);
  database = firebase.database();

function saveSketch(){
  var ref= database.ref('')
}


function addSketch(sketch) {
	return $.ajax({
      url: `${config.databaseURL}/sketch.json`,
      type: 'POST',
      data: JSON.stringify(sketch),
      dataType: 'json'
   }).done((sketchID) => {
      return sketchID;
   });
}

function getSketch() {
  console.log('trying to get sketches');
 return $.ajax({
   url: `${config.databaseURL}/sketch.json`,
 }).done((sketches) => {
   return sketches;
  });
}
