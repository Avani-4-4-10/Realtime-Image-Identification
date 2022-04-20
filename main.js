function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier= ml5.imageClassifier('MobileNet' , modelLoaded)
}
function modelLoaded(){
   console.log("Model Loaded !")
}
function draw(){
  image(video , 0 , 0 , 300 , 300)
  classifier.classify(video , gotResult)
}
var previous_result=''

function gotResult(error , result){
  if(error){
    console.error(error)
  }
  else{
    if((result[0].confidence > 0.5)&&(previous_result != result[0].label)){
      console.log(result)
      previous_result=result[0].label

      document.getElementById("object_name").innerHTML= result[0].label
      document.getElementById("accuracy").innerHTML= result[0].confidence.toFixed(3)

      var synth=window.speechSynthesis
      var speak_data="The object identified is "+result[0].label
      var Utterthis=new SpeechSynthesisUtterance(speak_data)
      synth.speak(Utterthis)
    }
  }
}




