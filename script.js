var vStart = false;
var nTouche = 20;
var dTap = 0;
var mTouche = [];
var average = 0;
var delay;
var total = 0;
var tStart = 0;
var bpm;
var lastCode = 0;

function setup (){
  var canvas = document.getElementById("canvas");
  canvas.height = 800;
  canvas.width = 800;
  draw();
}

window.addEventListener("load",setup);

window.onresize = function(event){
  setup();
}

document.body.onkeypress = function(event){
  event = event || window.event;
  if(vStart === true && nTouche > 0 && event.keyCode === 120 || vStart === true && nTouche > 0 && event.keyCode === 99) {
    if(event.keyCode != lastCode){
      lastCode = event.keyCode;
      mTouche.push(Date.now() - delay);
      delay = Date.now();
      dTap++;
      nTouche--;
      draw();
      if(dTap >= 2) checkDoubleTap(dTap);
    }
    //console.log("Y");
  } if(nTouche === 0){
    stop();
  }
}

function draw(){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.fillStyle = "white";
  context.fillRect(0,0,800,800);
  context.fillStyle = "black";
  context.font = "40px Arial";
  context.fillText("Appuyez encore : " + nTouche + " touches.", 100,100);
  context.fillText("Utilisez les touches \"X\" et \"C\".", 100,150);
  if(average != 0){
    context.fillText("Moyenne : " + average + " ms.", 100,200);
    context.fillText("Total : " + total + " ms.", 100,250);
    context.fillText(bpm + " BPM.", 100,300);
  }
}

function start(){
  if(vStart === false){
    mTouche = [];
    dTap = 0;
    average = 0;
    total = 0;
    delay = Date.now();
    nTouche = 20;
    vStart = true;
    console.log("Start");
    draw();
  } else {
    console.log("Already started");
  }
}

function stop(){
  if(vStart === true){
    vStart = false;
    console.log("Stop");
    calculAverage();
  }
}

function calculAverage(){
  for(var i = 0 ; i < mTouche.length-1 ; i++){
    total += mTouche[i];
  }
  average = total / 20;
  bpm = ((60000 * 20) / total) / 4;
  draw();
}

function checkDoubleTap(x){
  var actual = mTouche[x - 2] + mTouche[x - 1];
  if(actual <= 70){
    alert("Stop double tap.")
  }
}