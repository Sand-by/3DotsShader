

// a shader variable
let theShader;
var mic;
var j = 0;
var z = 0;
function preload(){
  // load the shader
  theShader = loadShader('uniform.vert', 'uniform.frag');
}

function setup() {
  // disables scaling for retina screens which can create inconsistent scaling between displays
  pixelDensity(1);
  getAudioContext().suspend();
  mic = new p5.AudioIn();
  button = createButton('--------------------------------------------');
  button.position(0, 0);
  button.mousePressed(changeBG);
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

}
function mousePressed() {
  userStartAudio();
}
function changeBG() {
  mic.start();
}

function draw() {
  shader(theShader);
  var vol = mic.getLevel();
  var m = map(vol,0,1,0,2);
  j+=m;
  if(mousePressed){
    z=1;
  }
  else{
    z=0;
  }
  theShader.setUniform("u_resolution", [windowWidth, windowHeight]);
  theShader.setUniform("u_time", j*0.1);
  theShader.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0),z]);
  // rect gives us some geometry on the screen
  rect(500,500,10000,10000);
 }

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
