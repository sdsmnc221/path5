import { shuffle } from "../../../utils";

const InfiniteGallery = (p, f) => {
  const { setModalVisible, setId } = f;
  let imgs = [];
  let s,
    g,
    xDir = 1,
    yDir = 1,
    xOff = 0,
    yOff = 0,
    data = [],
    colors = [
      "#eae4e9",
      "#fff1e6",
      "#fde2e4",
      "#fad2e1",
      "#e2ece9",
      "#bee1e6",
      "#f0efeb",
      "#dfe7fd",
      "#cddafd",
    ];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    setTimeout(() => {
      imgs = shuffle(
        Array.from(document.querySelectorAll(".instafeed__figure")).map(
          (fig) => {
            const img = fig.querySelector("img");
            const a = fig.querySelector("a");

            return {
              p5: p.loadImage(img.src),
              id: a.href.match(
                /(?<=https:\/\/www.instagram.com\/)(.*)(?=\/)/g
              )[0],
            };
          }
        )
      );

      let i = 0;
      for (let x = -p.width; x < p.width * 2; x += s + g) {
        for (let y = -p.height; y < p.height * 2; y += s + g) {
          const r = p.random(0.6, 0.9);
          const a = p.random(-p.PI / 4, p.PI / 4);
          const c = p.random(colors);
          const w = p.random(1.1, 1.2);
          const h = p.random(1.1, 1.2);
          data.push({ r, a, c, w, h });
          i++;
        }
      }
    }, 2400);

    g = 32;
    s = ((p.width * p.height) / 10000) * 2;
  };

  p.draw = () => {
    p.clear();

    p.translate(xOff, yOff);
    if (imgs.length > 0) {
      let i = 0;

      //   for (let x = -p.width * 2; x < p.width * 4; x += g) {
      //     for (let y = -p.height * 2; y < p.height * 4; y += g) {
      //       p.strokeWeight(
      //         p.dist(x, y, p.mouseX - xOff, p.mouseY - yOff) > 120
      //           ? 3.2
      //           : i % 2 == 0
      //           ? p.sin(p.radians(p.frameCount * 10)) * 12
      //           : p.cos(p.radians(p.frameCount * 10)) * 12
      //       );
      //       p.stroke(
      //         [
      //           "#590d22",
      //           "#800f2f",
      //           "#a4133c",
      //           "#c9184a",
      //           "ff4d6d#",
      //           "#ff758f",
      //           "#ff8fa3",
      //           "#ffb3c1",
      //           "#ffb3c1",
      //           "#fff0f3",
      //         ][i % 9]
      //       );
      //       p.point(x, y);
      //       i++;
      //     }
      //   }

      i = 0;
      for (let x = -p.width; x < p.width * 2; x += s + g) {
        for (let y = -p.height; y < p.height * 2; y += s + g) {
          const img = imgs[i % imgs.length];
          const { r, a, c, w, h } = data[i];
          const x_ = x + (s - s * r) / 2;
          const y_ = y + (s - s * r) / 2;

          p.push();
          p.translate(x_, y_);
          p.rotate(a);

          p.push();
          p.translate(-(s * r * w) / 16, -(s * r * h) / 16);
          p.fill(c);
          if (
            p.mouseX - x_ - xOff > 0 &&
            p.mouseX - x_ - xOff < s * r * w &&
            p.mouseY - y_ - yOff > 0 &&
            p.mouseY - y_ - yOff < s * r * h
          ) {
            p.stroke("red");
            p.strokeWeight(32);

            if (p.mouseIsPressed) {
              setModalVisible(true);
              setId(img.id);
            }
          } else {
            p.noStroke();
          }
          p.rect(0, 0, s * r * w, s * r * h);
          p.pop();

          p.blendMode(p.HARD_LIGHT);
          p.image(img.p5, 0, 0, s * r, s * r);
          p.blendMode(p.BLEND);
          p.pop();

          i++;
        }
      }
    }

    p.push();
    p.translate(-xOff, -yOff);
    p.blendMode(p.DIFFERENCE);
    p.noStroke();
    p.fill("#f28482");
    p.circle(p.mouseX, p.mouseY, g * 1.6);
    p.blendMode(p.BLEND);
    p.pop();

    if (!p.mouseIsPressed) {
      xOff += p.sin(p.radians(p.frameCount) * 0.01) * xDir;
      yOff += p.cos(p.radians(p.frameCount) * 0.01) * yDir;
    }

    if (yOff >= p.height) {
      yOff = p.lerp(yOff, p.height - g, 0.1);
      yDir *= -1;
    }
    if (yOff < -p.height) {
      yOff = p.lerp(yOff, p.mouseIsPressed ? -p.height + g : p.height / 2, 0.1);
      yDir *= -1;
    }

    if (xOff >= p.width) {
      xOff = p.lerp(xOff, p.width - g, 0.1);
      xDir *= -1;
    }
    if (xOff <= -p.width) {
      xOff = p.lerp(xOff, -p.width + g, 0.1);
      xDir *= -1;
    }
  };

  p.mouseDragged = () => {
    xOff += p.mouseX - p.pmouseX;
    yOff += p.mouseY - p.pmouseY;
  };
};

export default InfiniteGallery;
