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
  name: "FeelsOkayMan",
};

const defaultEmoteSrc = "https://cdn.betterttv.net/frankerfacez_emote/145947/4";

interface Emote {
  code: string;
  images: {
    "1x": string;
    "2x": string;
    "4x": string;
  };
}

let emoteList: Emote[] = [];

fetch("https://api.betterttv.net/3/cached/frankerfacez/users/twitch/22484632")
  .then((res) => res.json())
  .then((emotes) => {
    emoteList = emotes;
  });

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let emoteNameEl = document.getElementById("emote-name");

const pickRandomEmote = () => {
  const lastIndex = emoteList.length - 1;
  const randomIndex = Math.floor(lastIndex * Math.random());
  const randomEmote = emoteList[randomIndex];
  const randomImage =
    randomEmote?.images["4x"] ??
    randomEmote?.images["2x"] ??
    randomEmote?.images["1x"] ??
    defaultEmoteSrc;

  if (emoteNameEl) emoteNameEl.innerHTML = randomEmote?.code ?? "FeelsOkayMan";

  emote.img.src = randomImage;
};

const checkCollision = () => {
  if (emote.x + 112 >= canvas.width || emote.x <= 0) {
    emote.xSpeed *= -1;
    pickRandomEmote();
  }

  if (emote.y + 108 >= canvas.height || emote.y <= 0) {
    emote.ySpeed *= -1;
    pickRandomEmote();
  }
};

const update = () => {
  requestAnimationFrame(() => {
    // Set canvas background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the emote
    ctx.fillStyle = emote.color;
    ctx.fillRect(emote.x, emote.y, 112, 108);
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

if (emoteNameEl) emoteNameEl.innerHTML = "";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

pickRandomEmote();

update();
