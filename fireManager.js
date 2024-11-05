class FireManager {
  constructor(
    fps = 60, // Used in the embers for calculating the jitter
    followMouse = false, // If true, the "fire" will follow the mouse position
    emberLimit = 100, // Amount of maximum embers
    offsetSize = 50, // Offset is the radius of the "spawn locations" of the embers from the center of the fire
    staticMode = false, // If static, the fire will not follow the mouse
    staticX, // X position for the fire if static
    staticY // Y position for the fire if static
  ) {
    this.embers = []; // The embers that make up the fire
    this.fps = fps;
    this.followMouse = followMouse;
    this.staticMode = staticMode;
    this.staticX = staticX;
    this.staticY = staticY;
    this.emberLimit = emberLimit;
    this.offsetSize = offsetSize;
    this.out = false; // If true no more embers will spawn
    this.frenzy = false; // If true the fire will go faster
    this.createEmber(); // Create the first ember so the fire will start
  }

  update() {
    for (var i = 0; i < this.embers.length; i++) {
      this.embers[i].update();
    }
  }

  show() {
    for (var i = 0; i < this.embers.length; i++) {
      this.embers[i].show();
    }

    // Also add a glow to the fire
    // (This made the performance drop significantly since i did not find a performant way of creating it)
    this.drawGlow();
  }

  setEmberLimit(limit) {
    this.emberLimit = limit;
  }

  relight() {
    // Religt the fire after it has been extinguished
    this.out = false;
    this.createEmber();
  }

  createEmber(forceSpawn = false) {
    if (
      this.embers.filter((e) => !e.skipNewEmber).length >= this.emberLimit &&
      !forceSpawn
    ) {
      // If the ember limit is reached, do not create a new ember (Except for when it is forced to spawn)
      // The force is used for the "poking"
      return;
    }

    // Calculate a random position of the ember within the offsetSize
    const xOffset = (Math.random() - 0.5) * this.offsetSize;
    const yOffset = (Math.random() - 0.5) * this.offsetSize;

    // The jitter is what makes the embers move from left to right
    // The jitterFrequency is the amount of times the jitter moves from left to right in a given interval
    const jitter = Math.random() * 5;
    const jitterFrequency = Math.random() * 3;

    let x = 0;
    let y = 0;

    // Spawn location is set depending on whether the fire should follow the mouse
    if (this.followMouse) {
      x = mouseX + xOffset;
      y = mouseY + yOffset;
    } else if (this.staticMode) {
      x = this.staticX + xOffset;
      y = this.staticY + yOffset;
    }

    const newEmber = new Ember(
      this,
      x,
      y,
      jitter,
      jitterFrequency,
      fps,
      this.frenzy,
      forceSpawn
    );
    this.embers.push(newEmber);
  }

  removeEmber(ember) {
    this.embers = this.embers.filter((e) => e !== ember);
    if (this.out || ember.skipNewEmber) {
      // If the ember limit is reached, do not create a new ember
      // The embers created through "poking" also do not spawn a new one, they have the skipNewEmber flag set
      return;
    }
    this.createEmber();
    if (Math.random() > 0.7) {
      // 30% chance of creating a new ember, so the amount of embers increases over time, making the fire grow
      this.createEmber();
    }
  }

  setFrenzyMode(frenzy) {
    this.frenzy = frenzy;
  }

  extinguish() {
    this.out = true;
  }

  lightAll() {
    this.out = false;
    for (let i = 0; i < this.emberLimit; i++) {
      this.createEmber();
    }
  }

  poke() {
    for (let i = 0; i <= 50; i++) {
      this.createEmber(true);
    }
  }

  drawGlow() {
    // The push and pop are needed so the gradiant is not applied to other shapes
    push();
    noStroke();

    const glowSize = 20 + this.embers.length; // The size of the glow is based on the amount of embers

    // Using the p5js drawingContext with createRadiaalGradient we can create a gradient,
    // which is then applied to the shapes. I used a rectangle whose bottom edge (y position) is
    // located a bit lower than the spawnpoint of the embers so that the glow shows the outline
    // of the sticks of the campfire when it grows
    let ctx = drawingContext;
    let gradient = ctx.createRadialGradient(
      this.staticX,
      this.staticY,
      0,
      this.staticX,
      this.staticY,
      glowSize / 2
    );
    gradient.addColorStop(0, "rgba(255, 50, 30, 0.4)"); // Adding the gradient colors
    gradient.addColorStop(1, "rgba(255, 50, 30, 0)");
    ctx.fillStyle = gradient; // Applying the gradient as a fill color for the shapes
    rect(0, this.staticY - 200, width, 215); // Drawing the rectangle that contains the gradient
    pop();
  }
}
