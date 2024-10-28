class Ember {
  constructor(x, y, jitter) {
    this.x = x;
    this.y = y;
    this.velocity = createVector(0, 0);
    this.lift = createVector(0, -3);
    this.jitter = jitter;
    this.timeToLive = Math.random() * 100;
  }

  update() {
    this.velocity.add(this.lift);
    this.y += this.velocity.y;
    this.x += this.velocity.x;
  }

  show() {
    stroke(255);
    strokeWeight(4);
    point(this.x, this.y);
  }

  kill() {
    this.velocity = createVector(0, 0);
  }
}
