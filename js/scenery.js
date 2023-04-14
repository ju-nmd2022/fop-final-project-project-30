export default class Scenery {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.grassBlades = [];
    this.grassBladeSettings = {
      amount: 2000,
      maxSize: 3,
    };
    this.waterBubbles = [];
    this.waterBubbleSettings = {
      amount: 200,
      maxSize: 4,
    };
  }

  createGrass() {
    if (this.grassBlades.length < this.grassBladeSettings.amount) {
      for (let i = 0; i < this.grassBladeSettings.amount; i++) {
        const grassBlade = {
          x: Math.floor(Math.random() * 500),
          y: Math.floor(Math.random() * 500),
          size: Math.floor(Math.random() * this.grassBladeSettings.maxSize),
        };
        this.grassBlades.push(grassBlade);
      }
    }
  }

  createBubbles() {
    if (this.waterBubbles.length < this.waterBubbleSettings.amount) {
      for (let i = 0; i < this.waterBubbleSettings.amount; i++) {
        const waterBubble = {
          x: Math.floor(Math.random() * 500),
          y: 82 + Math.floor(Math.random() * 135),
          size: Math.floor(Math.random() * this.waterBubbleSettings.maxSize),
          speed: 2,
        };
        this.waterBubbles.push(waterBubble);
      }
    }
  }

  draw() {
    this.createGrass();
    background("#FFF");
    const backgroundColor = {
      grass: "#9ab771",
      grassBlade: "#5F8575",
      water: "#89CFF0",
      waterBubble: "#6495ED",
      road: "#50514e",
    };
    push();
    noStroke();

    //GRASS
    fill(backgroundColor.grass);
    rect(0, 430, 500, 70);
    rect(0, 0, 500, 80);
    rect(0, 290, 500, 70);

    //grassBlades
    for (let grassBlade of this.grassBlades) {
      fill(backgroundColor.grassBlade);
      rect(grassBlade.x, grassBlade.y, grassBlade.size);
    }

    //ROAD
    fill(backgroundColor.road);
    rect(0, 360, 500, 70);
    rect(0, 220, 500, 70);
    //texture the road

    //WATER
    fill(backgroundColor.water);
    rect(0, 150, 500, 70);
    rect(0, 80, 500, 70);

    //waterBubbles
    this.createBubbles();
    for (let waterBubble of this.waterBubbles) {
      fill(backgroundColor.waterBubble);
      rect(waterBubble.x, waterBubble.y, waterBubble.size);

      waterBubble.x = waterBubble.x + waterBubble.speed;

      if (waterBubble.x > 500) {
        waterBubble.x = 0;
      }
    }

    pop();
  }
}
