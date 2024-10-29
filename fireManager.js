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
  }

  createEmber() {
    if (this.embers.length >= this.emberLimit) {
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

    const newEmber = new Ember(this, x, y, jitter, jitterFrequency, fps);
    this.embers.push(newEmber);
  }

  removeEmber(ember) {
    this.embers = this.embers.filter((e) => e !== ember);
    this.createEmber();
    if (Math.random() > 0.7) {
      this.createEmber();
    }
  }
}
