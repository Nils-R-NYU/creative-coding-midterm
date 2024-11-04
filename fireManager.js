class FireManager {
  constructor(
    fps = 60,
    followMouse = false,
    emberLimit = 100,
    offsetSize = 50,
    staticMode = false,
    staticX,
    staticY
  ) {
    this.embers = [];
    this.out = false;
    this.frenzy = false;
    this.fps = fps;
    this.followMouse = followMouse;
    this.staticMode = staticMode;
    this.staticX = staticX;
    this.staticY = staticY;
    this.emberLimit = emberLimit;
    this.offsetSize = offsetSize;
    this.createEmber();
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

    this.drawGlow();
  }

  setEmberLimit(limit) {
    this.emberLimit = limit;
  }

  relight() {
    this.out = false;
    this.createEmber();
  }

  createEmber(forceSpawn = false) {
    if (
      this.embers.filter((e) => !e.skipNewEmber).length >= this.emberLimit &&
      !forceSpawn
    ) {
      return;
    }

    const xOffset = (Math.random() - 0.5) * this.offsetSize;
    const yOffset = (Math.random() - 0.5) * this.offsetSize;

    const jitter = Math.random() * 5;
    const jitterFrequency = Math.random() * 3;

    let x = 0;
    let y = 0;

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
      return;
    }
    this.createEmber();
    if (Math.random() > 0.7) {
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
    console.log("poking");
    for (let i = 0; i <= 50; i++) {
      this.createEmber(true);
    }
  }

  drawGlow() {
    push();
    noStroke();

    const glowSize = 20 + this.embers.length;
    console.log(glowSize, this.embers.length);
    let ctx = drawingContext;
    let gradient = ctx.createRadialGradient(
      this.staticX,
      this.staticY,
      0,
      this.staticX,
      this.staticY,
      glowSize / 2
    );
    gradient.addColorStop(0, "rgba(255, 50, 30, 0.4)");
    gradient.addColorStop(1, "rgba(255, 50, 30, 0)");
    ctx.fillStyle = gradient;
    rect(0, this.staticY - 200, width, 215);
    pop();
  }
}
