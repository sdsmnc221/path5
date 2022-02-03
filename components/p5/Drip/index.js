export default class Drip {
  constructor(x, y, size, col, p5) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.final = size / 4;
    this.color = [col[0], col[1], col[2], 32];
    this.p5 = p5;
  }
  move(up = false) {
    this.y += up ? -1 : 1;
    if (this.size > this.final) this.size *= 0.96;
  }
  show() {
    this.p5.noStroke();
    this.p5.fill(this.color);
    this.p5.ellipse(this.x, this.y, this.size, this.size);
  }
}
