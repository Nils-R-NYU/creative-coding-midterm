const fps = 30;
let primaryManager;
const managers = [];
const dots = [];
counter = 0;

function setup() {
  createCanvas(800, 1200);
  setFrameRate(fps);
  primaryManager = new FireManager(fps, false, 25, 50, true, 400, 650);
}

function draw() {
  background(0);
  updateManager();

  primaryManager.update();
  primaryManager.show();

  for (var i = 0; i < managers.length; i++) {
    managers[i].update();
    managers[i].show();
  }

  drawLogs();
}

function updateManager() {
  counter++;

  if ((counter - 120) % (60 * 5) == 0) {
    primaryManager.poke();
  }

  if (counter / fps == 10) {
    primaryManager.setEmberLimit(10);
  } else if (counter / fps == 15) {
    primaryManager.setEmberLimit(50);
  } else if (counter / fps == 20) {
    primaryManager.extinguish();
  } else if (counter / fps == 25) {
    primaryManager.relight();
  } else if (counter / fps == 30) {
  }

  if (counter > fps * 40) {
    counter = 0;
  }
}

function keyPressed() {
  if (key == " ") {
    primaryManager.createEmber();
  } else if (key == "l") {
    primaryManager.lightAll();
  } else if (key == "e") {
    primaryManager.extinguish();
  } else if (key == "p") {
    primaryManager.poke();
  }
}

function mousePressed() {
  primaryManager.setFrenzyMode(true);
}

function mouseReleased() {
  primaryManager.setFrenzyMode(false);
}

function drawLogs() {
  noStroke();
  fill(color(0, 0, 0));

  beginShape();
  vertex(355.5, 701);
  vertex(389.5, 657);
  vertex(386.5, 645);
  vertex(396.5, 642);
  vertex(399.5, 648);
  vertex(406.5, 640);
  vertex(411.5, 644);
  vertex(369.5, 711);
  endShape();

  beginShape();
  vertex(399.5, 716);
  vertex(402.5, 693);
  vertex(397.5, 685);
  vertex(401.5, 685);
  vertex(405.5, 689);
  vertex(408.5, 674);
  vertex(406.5, 663);
  vertex(411.5, 664);
  vertex(413.5, 671);
  vertex(419.5, 669);
  vertex(423.5, 675);
  vertex(418.5, 719);
  endShape();

  beginShape();
  vertex(463.5, 669);
  vertex(353.5, 652);
  vertex(355.5, 647);
  vertex(463.5, 663);
  endShape();

  beginShape();
  vertex(434.5, 701);
  vertex(396.5, 667);
  vertex(402.5, 666);
  vertex(439.5, 697);
  endShape();

  beginShape();
  vertex(382.5, 715);
  vertex(387.5, 672);
  vertex(392.5, 672);
  vertex(388.5, 716);
  endShape();

  beginShape();
  vertex(345.5, 668);
  vertex(419.5, 650);
  vertex(420.5, 644);
  vertex(423.5, 644);
  vertex(423.5, 647);
  vertex(436.5, 649);
  vertex(440.5, 671);
  vertex(351.5, 686);
  endShape();
}
