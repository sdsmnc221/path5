const noiseScale = 0.001;
// const palette = ["#ACDEED55", "#EAD5E855", "#84C0E755", "#38439955"];
const palette = ["#ffb5a7", "#fcd5ce", "#f8edeb", "#f9dcc4", "#fec89a"];

export default class WatercolorDrip {
  constructor(ox, oy, p5) {
    this.p5 = p5;
    this.init(ox, oy);
  }

  init(ox, oy) {
    this.vel = this.p5.createVector(0, 0);
    this.pos = this.p5.createVector(ox, oy);
    this.t = this.p5.random(0, noiseScale);
    this.lifeMax = this.p5.random(20, 50);
    this.life = this.lifeMax;
    this.step = this.p5.random(0.1, 0.5);
    this.dMax = this.p5.random(10) >= 5 ? 10 : 30;
    this.d = this.dMax;
    this.c = this.p5.random(palette);
  }

  move() {
    let theta = this.p5.map(
      this.p5.noise(this.pos.x * noiseScale, this.pos.y * noiseScale, this.t),
      0,
      1,
      -360,
      360
    );
    this.vel.x = this.p5.cos(theta);
    this.vel.y = this.p5.sin(theta);
    this.pos.add(this.vel);
  }

  isFinished() {
    this.life -= this.step;
    this.d = this.p5.map(this.life, 0, this.lifeMax, 0, this.dMax);
    if (this.life < 0) {
      return true;
    } else {
      return false;
    }
  }

  display() {
    this.p5.noStroke();
    this.p5.fill(this.c);
    this.p5.circle(this.pos.x, this.pos.y, this.d);
  }
}
