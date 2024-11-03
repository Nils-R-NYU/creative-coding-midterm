const fps = 60;
let primaryManager;
const managers = [];

function setup() {
  createCanvas(800, 1200);
  setFrameRate(fps);
  primaryManager = new FireManager(fps, false, 250, 50, true, 400, 650);
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
  } else if (key == "l") {
    primaryManager.lightAll();
  } else if (key == "e") {
    primaryManager.extinguish();
  }
}

function mousePressed() {
  primaryManager.setFrenzyMode(true);
}

function mouseReleased() {
  primaryManager.setFrenzyMode(false);
}
