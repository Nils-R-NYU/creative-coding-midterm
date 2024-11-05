class Ember {
  constructor(
    manager,
    x,
    y,
    jitterRange,
    jitterFrequency,
    fps,
    frenzy,
    skipNewEmber
  ) {
    this.manager = manager; // Reference is used to remove this ember from the manager when its lifetime ran out
    this.x = x;
    this.y = y;
    this.skipNewEmber = skipNewEmber;
    this.velocity = createVector(0, 0); // Overall velocity of the ember. Jitter and lift are added during update
    this.lift = createVector(0, -1 * (Math.random() + 0.3)); // Lift is the upward force of the ember
    this.jitterRange = jitterRange; // The jitterRange is the amplitude of the jitter
    this.jitterFrequency = jitterFrequency; // The jitterFrequency is the amount of times the jitter moves from left to right in a given interval
    this.jitter = createVector(0, 0); // This is the vector used to store the current jitter velocity
    this.timeToLive = Math.random() * 80; // The time to live of the ember which is randomized to make the embers more realistic
    this.timeStep = 1 / fps; // The time step of the ember
    this.time = (Math.random() - 0.5) * 10 * this.timeStep; // Used to calculate the jitter with a sinus wave (the random start value makes it start at a random "jitter value")
    this.invertedX = Math.random() > 0.5; // Make half of the embers jitter into the opposite direction
    this.sizeStart = 7; // Start and end size for the ember (they shrink over time)
    this.sizeEnd = 1;
    this.colorStart = color("#fefe9a"); // Start and end color for the ember (they get more red)
    this.colorEnd = color("#e7641d");

    if (frenzy) {
      // When frenzy mode is active, crank everything up
      this.jitterRange *= 2;
      this.jitterFrequency *= 2;
      this.lift.y *= 2;
    }
  }

  update() {
    this.lift.y *= 1.01; // Make the lift increase over time because the ember gets kind of lighter as it rises (it shrinks)
    this.updateJitter(); // Calculate the new jitter velocity
    this.velocity.add(this.lift); // Add the lift
    this.velocity.x = this.jitter.x; // Add the jitter
    this.velocity.y = Math.max(this.velocity.y + this.lift.y, this.lift.y * 4); // Make the velocity cap out

    this.x += this.velocity.x; // Update position
    this.y += this.velocity.y;
  }

  show() {
    // lerp the color and size based on the timeToLive left
    let drawColor = lerpColor(
      this.colorEnd,
      this.colorStart,
      this.timeToLive / 100
    );
    let drawSize = lerp(this.sizeEnd, this.sizeStart, this.timeToLive / 100);

    stroke(drawColor, 0.5);
    strokeWeight(drawSize);

    // Draw the ember
    point(this.x, this.y);

    this.timeToLive -= 1; // Decrease timeToLive
    if (this.timeToLive < 0) {
      this.kill(); // If timeToLive is less than 0, remove the ember
    }
  }

  kill() {
    this.manager.removeEmber(this);
  }

  updateJitter() {
    this.time += this.timeStep;
    this.jitterRange *= 0.99; // Make the jitter move less from left to right over time
    // Calculate the jitter by using a sinus wave
    this.jitter.x =
      this.jitterRange * Math.sin(2 * PI * this.time * this.jitterFrequency);

    if (this.invertedX) {
      // If the jitter should be inverted
      this.jitter.x *= -1;
    }
  }
}
