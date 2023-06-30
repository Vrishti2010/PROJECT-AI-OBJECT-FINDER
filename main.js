status = "";
objects = [];


function setup(){
    canvas = createCanvas(380, 380);
    canvas.position(650,340);
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("input_box").value;
}

function modelLoaded(){
    console.log("Model is loaded");
    status = true;
}

function gotResult(error, results){
if(error){
    console.error(error);
}
console.log(results);
objects = results;
}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i<objects.length; i++){
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+ "" +percent+ "%", objects[i].x +15 , objects[i].y + 15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       
    
    if(objects[i].label == object_name){
        video.stop();   
        objectDetector.detect(gotResult);
        document.getElementById("status").innerHTML = "Object mentioned found";
        synth = window.speechSynthesis();
        speakdata = "object mentioned found";
        utterthis = new SpeechSynthesisUtterance(speakdata);
        synth.speak(utterthis);
    }
    else{
        document.getElementById("status").innerHTML = "Object mentioned not found";
}
}
}
}