let manager;

function setup() {
  createCanvas(800, 800);
  manager = new fireManager();
}

function draw() {}

function keyPressed() {
  if (key == " ") {
    this.bird.up();
  }
}
