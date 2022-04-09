import "./styles.css";

const config = {
  /**
   * Image scaling factor.
   *
   * Can be used to increase or decrease image size.
   */
  scale: 1,
};

const emote = {
  x: 200,
  y: 300,
  xSpeed: 3,
  ySpeed: 3,
  color: "black",
  img: new Image(),
};

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

const pickRandomColor = () => {
  const r = Math.random() * 254;
  const g = Math.random() * 254;
  const b = Math.random() * 254;

  emote.color = `rgb(${r},${g},${b})`;
};

const checkCollision = () => {
  if (emote.x + emote.img.width * config.scale >= canvas.width || emote.x <= 0) {
    emote.xSpeed *= -1;
    pickRandomColor();
  }

  if (emote.y + emote.img.height * config.scale >= canvas.height || emote.y <= 0) {
    emote.ySpeed *= -1;
    pickRandomColor();
  }
};

const update = () => {
  requestAnimationFrame(() => {
    // Set canvas background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the emote
    ctx.fillStyle = emote.color;
    ctx.fillRect(emote.x, emote.y, emote.img.width * config.scale, emote.img.height * config.scale);
    ctx.drawImage(
      emote.img,
      emote.x,
      emote.y,
      emote.img.width * config.scale,
      emote.img.height * config.scale
    );

    // Move the emote
    emote.x += emote.xSpeed;
    emote.y += emote.ySpeed;

    checkCollision();
    update();
  });
};

canvas = document.getElementById("screen")! as HTMLCanvasElement;
ctx = canvas.getContext("2d")!;
emote.img.src = "https://cdn.betterttv.net/emote/6151c623b63cc97ee6d39040/3x";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

pickRandomColor();
update();
