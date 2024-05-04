import DemoLower from "../assets/images/maps/DemoLower.png";
import DemoUpper from "../assets/images/maps/DemoUpper.png";
import KitchenLower from "../assets/images/maps/KitchenLower.png";
import KitchenUpper from "../assets/images/maps/KitchenUpper.png";
import Hero from "../assets/images/characters/people/hero.png";
import Npc1 from "../assets/images/characters/people/npc1.png";
import { utils } from "../helpers/utils";
import Person, { PersonConfig } from "./Person";

interface OverworldMapConfig {
  walls: {};
  gameObjects: any;
  lowerSrc: string;
  upperSrc: string;
}

export default class OverworldMap {
  gameObjects: any;
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;
  walls: any;
  constructor(config: OverworldMapConfig) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx: CanvasRenderingContext2D, cameraPerson: PersonConfig) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }
  drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: PersonConfig) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y
    );
  }

  isSpaceTaken(currentX: number, currentY: number, direction: string) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  // addWall(x: number, y: number) {
  //   this.walls[`${x},${y}`] = true;
  // }
  // removeWall(x: number, y: number) {
  //   delete this.walls[`${x},${y}`];
  // }
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
      walls: Record<string, boolean>;
    };
    Kitchen: {
      lowerSrc: string;
      upperSrc: string;
      gameObjects: {
        hero: PersonConfig;
        npc1: PersonConfig;
      };
      walls: Record<string, boolean>;
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
        x: utils.withGrid(2),
        y: utils.withGrid(6),
        src: Hero,
      }),
      npc1: new Person({
        x: utils.withGrid(4),
        y: utils.withGrid(8),
        src: Npc1,
      }),
    },
    walls: {
      [utils.asGridCoords(7, 6)]: true,
      [utils.asGridCoords(8, 6)]: true,
      [utils.asGridCoords(7, 7)]: true,
      [utils.asGridCoords(8, 7)]: true,
    },
  },
  Kitchen: {
    lowerSrc: KitchenLower,
    upperSrc: KitchenUpper,
    gameObjects: {
      hero: new Person({
        x: utils.withGrid(2),
        y: utils.withGrid(2),
        src: Hero,
      }),
      npc1: new Person({
        x: utils.withGrid(4),
        y: utils.withGrid(4),
        src: Npc1,
      }),
    },
    walls: {
      [utils.asGridCoords(7, 6)]: true,
      [utils.asGridCoords(8, 6)]: true,
      [utils.asGridCoords(7, 7)]: true,
      [utils.asGridCoords(8, 7)]: true,
    },
  },
};
