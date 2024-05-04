// import DemoLower from "../assets/images/maps/DemoLower.png";
// import Hero from "../assets/images/characters/people/hero.png";
// import Npc1 from "../assets/images/characters/people/npc1.png";
// import GameObject from "./GameObject";

import DirectionInput from "./DirectionInput";
import OverworldMap from "./OverworldMap";
import { PersonConfig } from "./Person";

interface ConfigElement {
  element: HTMLElement | null;
}

export default class Overworld {
  element: HTMLElement | null;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  map: OverworldMap | undefined;
  directionInput: DirectionInput | undefined;

  constructor(config: ConfigElement) {
    this.element = config.element;
    this.canvas = this.element?.querySelector(
      ".game-canvas"
    ) as HTMLCanvasElement | null;
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
  }

  startGameLoop() {
    const step = () => {
      this.ctx?.clearRect(
        0,
        0,
        this.canvas?.width ?? 0,
        this.canvas?.height ?? 0
      );

      const cameraPerson: PersonConfig = this.map?.gameObjects?.hero;

      Object.values(this.map?.gameObjects || {}).forEach((object: any) => {
        object.update({
          arrow: this.directionInput?.direction,
          map: this.map,
        });
      });

      if (this.ctx) {
        this.map?.drawLowerImage(this.ctx, cameraPerson);
      }

      Object.values(this.map?.gameObjects || {}).forEach((object: any) => {
        object.sprite.draw(this.ctx, cameraPerson);
      });

      if (this.ctx) {
        this.map?.drawUpperImage(this.ctx, cameraPerson);
      }

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  init() {
    interface WindowWithOverworldMaps extends Window {
      OverworldMaps?: any;
    }
    const windowWithOverworldMaps = window as WindowWithOverworldMaps;
    const overworldMaps = windowWithOverworldMaps.OverworldMaps;
    if (overworldMaps && overworldMaps.DemoRoom) {
      this.map = new OverworldMap(overworldMaps.DemoRoom);
    }

    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.directionInput.direction;

    this.startGameLoop();
  }
}
