const WebglLoader = (p) => {
  let s = 320,
    gap = 10,
    step,
    bs = 32,
    i,
    data = [],
    a = 0;
  const palette = ["#ffb5a7", "#fcd5ce", "#f8edeb", "#f9dcc4", "#fec89a"];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);

    step = s / gap;

    for (let x = 0; x <= s; x += step) {
      for (let y = 0; y <= s; y += step) {
        for (let z = 0; z <= s; z += step) {
          data.push({ rd: p.random(0.032, 3.2), c: p.random(palette) });
        }
      }
    }
  };

  p.draw = () => {
    p.clear();
    p.strokeWeight(3.2);

    p.translate(0, 0, -s * 1.6);
    p.rotateZ(a);

    // blendMode(MULTIPLY);

    i = 0;
    for (let x = 0; x <= s; x += step) {
      for (let y = 0; y <= s; y += step) {
        for (let z = 0; z <= s; z += step) {
          const { rd, c } = data[i];
          p.push();
          p.translate(x - s / 2, y - s / 2, z - s / 2);
          const c_ = p.color("#ea2560");
          c_.setAlpha(16 * rd + 120 * p.sin(p.millis() / 320));
          p.stroke(c);
          p.fill(c_);
          p.box(
            bs,
            bs,
            p.map(p.sin(p.radians(p.frameCount * 32)) * rd, -1, 1, -z, 0)
          );
          p.pop();
          i++;
        }
      }
    }

    a += 0.032;
  };
};

export default WebglLoader;
