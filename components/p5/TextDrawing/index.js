import Drip from "../Drip";
import WatercolorDrip from "../Drip/Watercolor";

const TextDrawing = (p) => {
  const { Vector } = require("p5");

  let fontScript;
  let fontSans;
  let word = "path.5";
  let phrase = "From mathematics to web-friendly generative artworks.";
  let drips = [];
  let dripsPhrase = [];
  let dripsShadow = [];
  let paint = [];
  let i = 0;
  let ii = 0;
  let iPhrase = 0;
  let bound;
  let boundPhrase;
  let points;
  let pointsPhrase;
  let size, brush, brushPhrase;

  let timer = 100;
  let timeout = timer * 320;
  let nextChange = timer;
  let start;

  let objs = [];
  let maxR;
  let nt = 0;
  let nR = 0;
  let nTheta = 1000;

  p.preload = () => {
    fontScript = p.loadFont("fonts/DancingScript.ttf");
    fontSans = p.loadFont("fonts/Bebas-Regular.ttf");
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth - 100, p.windowHeight - 50);
    init();
  };

  p.draw = () => {
    let R = p.map(p.noise(nt * 0.01, nR), 0, 1, 0, maxR);
    let t = p.map(p.noise(nt * 0.001, nTheta), 0, 1, -p.PI, p.PI);
    let xx = R * p.cos(t) + p.random(-p.width / 1.2, p.width / 1.2);
    let yy = R * p.sin(t) + p.random(-p.height / 1.2, p.height / 1.2);
    let x = R * p.cos(t) + p.width / 2;
    let y = R * p.sin(t) + p.height / 2;
    objs.push(new WatercolorDrip(x, y, p));
    objs.push(new WatercolorDrip(xx, yy, p));

    if (iPhrase >= pointsPhrase.length - 1) {
      if (p.mouseIsPressed) {
        objs.push(new WatercolorDrip(p.mouseX, p.mouseY, p));
      }

      for (let i = 0; i < objs.length; i++) {
        objs[i].move();
        objs[i].display();
      }

      for (let j = objs.length - 1; j >= 0; j--) {
        if (objs[j].isFinished()) {
          objs.splice(j, 1);
        }
      }
      nt++;
    }

    if (iPhrase < pointsPhrase.length - 1) {
      dripsShadow.push(
        new Drip(
          (p.width - boundPhrase.w) / 2.4 -
            boundPhrase.x +
            pointsPhrase[iPhrase].x,
          pointsPhrase[iPhrase].y,
          p.random(3.2 * brush, 12 * brush),
          [234, 37, 96, 255],
          p
        )
      );
    }

    if (p.frameCount % 4 == 0 && i < points.length - 1) {
      drips.push(
        new Drip(
          (p.width - bound.w) / 2 - bound.x + points[i].x,
          points[i].y - p.height / 10,
          p.random(3.2 * brush, 12 * brush),
          paint,
          p
        )
      );
    }

    if (p.frameCount % 2 == 0 && iPhrase < pointsPhrase.length - 1) {
      dripsPhrase.push(
        new Drip(
          (p.width - boundPhrase.w) / 2.4 -
            boundPhrase.x +
            pointsPhrase[iPhrase].x,
          pointsPhrase[iPhrase].y,
          p.random(3.2 * brushPhrase, 12 * brushPhrase),
          [255, 244, 227],
          p
        )
      );
    }

    for (let j = 0; j < dripsShadow.length - 1; j++) {
      p.push();
      if (j >= dripsShadow.length - 12) p.blendMode(p.HARD_LIGHT);
      dripsShadow[j].move();
      dripsShadow[j].show();

      p.pop();
    }
    for (let j = 0; j < dripsPhrase.length - 1; j++) {
      dripsPhrase[j].move(j % 2 == 0);
      dripsPhrase[j].show();
    }
    for (let j = 0; j < drips.length - 1; j++) {
      drips[j].move(true);
      drips[j].show();
    }

    if (i < points.length - 1) {
      for (let k = 0; k <= i; k++) {
        p.push();
        p.fill(paint[0], paint[1], paint[2], 32);
        p.noStroke();
        p.translate((p.width - bound.w) / 2 - bound.x, -p.height / 10);
        p.translate(points[i].x, points[i].y);
        p.rotate(points[i].alpha);
        p.rectMode(p.CENTER);

        p.blendMode(p.BLEND);
        p.fill(paint[0], paint[1], paint[2], 16);

        p.fill(paint[0], paint[1], paint[2], 64);
        p.rect(0, 0, 2 * brush, 4 * brush, brush, brush, brush, brush);
        p.ellipse(0, 0, 2 * brush);
        p.pop();
      }
    }

    for (let step = 0; step < 32; step++) {
      p.push();
      p.fill(paint[0], paint[1], paint[2], 32);
      p.noStroke();
      p.translate((p.width - bound.w) / 2 - bound.x, -p.height / 10);
      p.translate(points[i].x, points[i].y);
      p.rotate(points[i].alpha);
      p.rectMode(p.CENTER);

      p.blendMode(p.HARD_LIGHT);
      if (i < points.length - 10) {
        for (let i = 0; i < p.int(size / 32); i++) {
          let pos = Vector.random2D();
          let rad = 1 + p.random(4 * brush, 16 * brush);
          pos.mult(rad);
          let s = p.width / 20 / rad;
          p.fill(paint[0], paint[1], paint[2], 64);
          p.ellipse(pos.x, pos.y, s);
        }
      }

      p.blendMode(p.BLEND);
      p.fill(paint[0], paint[1], paint[2], 16);
      if (i < points.length - 1) {
        p.fill(paint[0], paint[1], paint[2], 64);
        p.rect(0, 0, 2 * brush, 4 * brush, brush, brush, brush, brush);
        p.ellipse(0, 0, 2 * brush);
        i++;
      }

      p.pop();
    }

    if (iPhrase < pointsPhrase.length - 1) {
      for (let k = 0; k <= iPhrase; k++) {
        p.push();
        p.noStroke();
        p.translate((p.width - boundPhrase.w) / 2.4 - boundPhrase.x, 0);
        p.translate(pointsPhrase[k].x, pointsPhrase[k].y);
        p.rotate(pointsPhrase[k].alpha);
        p.rectMode(p.CENTER);
        p.fill(255, 255, 255, 255);
        p.rect(
          0,
          0,
          2 * brushPhrase,
          4 * brushPhrase,
          brushPhrase,
          brushPhrase,
          brushPhrase,
          brushPhrase
        );
        p.ellipse(0, 0, 2 * brushPhrase);
        p.pop();
      }
    }

    for (let step = 0; step < 64; step++) {
      p.push();
      p.noStroke();
      p.translate((p.width - boundPhrase.w) / 2.4 - boundPhrase.x, 0);
      p.translate(pointsPhrase[iPhrase].x, pointsPhrase[iPhrase].y);
      p.rotate(pointsPhrase[iPhrase].alpha);
      p.rectMode(p.CENTER);

      if (iPhrase < pointsPhrase.length - 1) {
        p.fill(255, 244, 227, 255);
        p.rect(
          0,
          0,
          2 * brushPhrase,
          4 * brushPhrase,
          brushPhrase,
          brushPhrase,
          brushPhrase,
          brushPhrase
        );
        p.ellipse(0, 0, 2 * brushPhrase);
        iPhrase++;
      }

      p.pop();
    }

    if (p.millis() > nextChange && p.millis() - start < timeout) {
      p.blendMode(p.BLEND);
      p.fill(255, 191, 186, p.random(16, 32));
      p.noStroke();
      p.ellipse(p.random(p.width), p.random(p.height), p.random(32, 320));
      nextChange = p.millis() + timer;
    }

    if (i >= points.length - 1) {
      i = 0;

      ii++;
      paint = ii % 2 == 0 ? [234, 37, 96, 255] : [255, 244, 227, 255];
    }
    // if (iPhrase >= pointsPhrase.length - 1) iPhrase = 0;
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth - 100, p.windowHeight - 50);
    init();
    p.redraw();
  };

  function init() {
    p.background("#fff4e3");

    i = 0;
    iPhrase = 0;
    drips = [];
    size = (3.2 * p.width) / (8 + word.length);
    bound = fontScript.textBounds(word, 0, p.height / 2, size);
    points = fontScript.textToPoints(word, 0, p.height / 2, size, {
      sampleFactor: 0.4,
      simplifyThreshold: 0,
    });
    boundPhrase = fontSans.textBounds(phrase, 0, p.height / 2, size / 8.4);
    pointsPhrase = fontSans.textToPoints(phrase, 0, p.height / 2, size / 8.4, {
      sampleFactor: 0.64,
      simplifyThreshold: 0,
    });
    paint = [234, 37, 96, 16];
    brush = size / 64;
    brushPhrase = brush / 10;
    nextChange = timer;
    start = p.millis();

    maxR = p.max(p.width, p.height) * 0.32;
  }
};

export default TextDrawing;
