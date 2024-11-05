const fps = 30;
let fireManager;
counter = 0;

function setup() {
  createCanvas(800, 1200);
  setFrameRate(fps);
  fireManager = new FireManager(fps, false, 25, 50, true, 400, 650);
}

function draw() {
  background(0);
  updateManager(); // This is responsible for the dynamic changes to the fire

  fireManager.update(); // Update all particle positions
  fireManager.show(); // Draw all particles

  for (var i = 0; i < managers.length; i++) {
    managers[i].update();
    managers[i].show();
  }

  drawLogs();
}

function updateManager() {
  counter++;

  if ((counter - fps * 2) % (fps * 5) == 0) {
    // "Poke" the fire every 5 seconds, but make the first "poke" happen after 3 seconds
    fireManager.poke();
  }

  if (counter / fps == 10) {
    // Ater 10 seconds decrease the amount of embers to 10
    fireManager.setEmberLimit(10);
  } else if (counter / fps == 15) {
    // After 15 increase it to 50 again
    fireManager.setEmberLimit(50);
  } else if (counter / fps == 20) {
    // Extinguish the flame after 20 seconds
    fireManager.extinguish();
  } else if (counter / fps == 25) {
    // Relight it after 25
    fireManager.relight();
  }

  if (counter > fps * 30) {
    // After 30 seconds, reset the counter so the changes loop
    counter = 0;
  }
}

function keyPressed() {
  if (key == "l") {
    fireManager.lightAll();
  } else if (key == "e") {
    fireManager.extinguish();
  } else if (key == "p") {
    fireManager.poke();
  }
}

function mousePressed() {
  fireManager.setFrenzyMode(true); // Frenzy mode makes the fire go faster
}

function mouseReleased() {
  fireManager.setFrenzyMode(false);
}

function drawLogs() {
  // Drawing all the shapes for the sticks/logs of the campfire
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
