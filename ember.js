class Ember {
  constructor(manager, x, y, jitterRange, jitterFrequency, fps, frenzy) {
    this.manager = manager;
    this.x = x;
    this.y = y;
    this.velocity = createVector(0, 0);
    this.lift = createVector(0, -1 * (Math.random() + 0.3));
    this.jitterRange = jitterRange;
    this.jitterFrequency = jitterFrequency;
    this.jitter = createVector(0, 0);
    this.timeToLive = Math.random() * 80;
    this.timeStep = 1 / fps;
    this.time = (Math.random() - 0.5) * 10 * this.timeStep;
    this.invertedX = Math.random() > 0.5;
    this.sizeStart = 7;
    this.sizeEnd = 1;
    this.colorStart = color("#ffffff");
    this.colorEnd = color("#e7641d");

    if (frenzy) {
      this.jitterRange *= 2;
      this.jitterFrequency *= 2;
      this.lift.y *= 2;
    }
  }

  update() {
    this.lift.y *= 1.01;
    this.updateJitter();
    this.velocity.add(this.lift);
    this.velocity.x = this.jitter.x;
    this.velocity.y = Math.max(this.velocity.y + this.lift.y, this.lift.y * 4);

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  show() {
    let drawColor = lerpColor(
      this.colorEnd,
      this.colorStart,
      this.timeToLive / 100
    );
    let drawSize = lerp(this.sizeEnd, this.sizeStart, this.timeToLive / 100);

    stroke(drawColor, 0.5);

    strokeWeight(drawSize);

    point(this.x, this.y);

    this.timeToLive -= 1;
    if (this.timeToLive < 0) {
      this.kill();
    }
  }

  kill() {
    this.manager.removeEmber(this);
  }

  updateJitter() {
    this.jitterRange *= 0.99;
    this.time += this.timeStep;
    this.jitter.x =
      this.jitterRange * Math.sin(2 * PI * this.time * this.jitterFrequency);
    if (this.invertedX) {
      this.jitter.x *= -1;
    }
  }
}
