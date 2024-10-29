const fps = 60;
let primaryManager;
const managers = [];

function setup() {
  createCanvas(800, 800);
  setFrameRate(fps);
  primaryManager = new FireManager(fps, false, 200, 50, true, 400, 650);
}

function draw() {
  background(0);

  primaryManager.update();
  primaryManager.show();

  for (var i = 0; i < managers.length; i++) {
    managers[i].update();
    managers[i].show();
  }
}

function keyPressed() {
  if (key == " ") {
    primaryManager.createEmber();
  }
}

function mousePressed() {
  managers.push(new FireManager(fps, false, 50, 50, true, mouseX, mouseY));
}
