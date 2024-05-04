import DemoLower from "../assets/images/maps/DemoLower.png";
import DemoUpper from "../assets/images/maps/DemoUpper.png";
import KitchenLower from "../assets/images/maps/KitchenLower.png";
import KitchenUpper from "../assets/images/maps/KitchenUpper.png";
import Hero from "../assets/images/characters/people/hero.png";
import Npc1 from "../assets/images/characters/people/npc1.png";
import { utils } from "../helpers/utils";
import Person, { PersonConfig } from "./Person";

interface OverworldMapConfig {
  gameObjects: any;
  lowerSrc: string;
  upperSrc: string;
}

export default class OverworldMap {
  gameObjects: any;
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;
  constructor(config: OverworldMapConfig) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.lowerImage, 0, 0);
  }
  drawUpperImage(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.upperImage, 0, 0);
  }
}

interface WindowWithOverworldMaps extends Window {
  OverworldMaps: {
    DemoRoom: {
      lowerSrc: string;
      upperSrc: string;
      gameObjects: {
        hero: PersonConfig;
        npc1: PersonConfig;
      };
    };
    Kitchen: {
      lowerSrc: string;
      upperSrc: string;
      gameObjects: {
        hero: PersonConfig;
        npc1: PersonConfig;
      };
    };
  };
}

declare let window: WindowWithOverworldMaps;

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: DemoLower,
    upperSrc: DemoUpper,
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(1),
        y: utils.withGrid(1),
        src: Hero,
      }),
      npc1: new Person({
        x: utils.withGrid(2),
        y: utils.withGrid(6),
        src: Npc1,
      }),
    },
  },
  Kitchen: {
    lowerSrc: KitchenLower,
    upperSrc: KitchenUpper,
    gameObjects: {
      hero: new Person({
        x: 2,
        y: 2,
        src: Hero,
      }),
      npc1: new Person({
        x: 4,
        y: 4,
        src: Npc1,
      }),
    },
  },
};
