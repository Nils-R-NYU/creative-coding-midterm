class FireManager {
  constructor() {
    this.embers = [];
    this.embers.push(new Ember());
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

  addEmber() {
    this.embers.push(new Ember());
  }
}
