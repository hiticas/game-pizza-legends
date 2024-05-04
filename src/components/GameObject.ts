import Hero from "../assets/images/characters/people/hero.png";
import Sprite, { Animations } from "./Sprite";

export interface GameObjectConfig {
  x: number;
  y: number;
  direction?: string;
  src?: string;
  animations?: Animations;
  currentAnimation?: string;
  currentAnimationFrame?: number;
}

export default class GameObject {
  x: number;
  y: number;
  direction: string;
  sprite: Sprite;
  // update: () => void;

  constructor(config: GameObjectConfig) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || Hero,
      animations: config.animations,
      currentAnimation: config.currentAnimation,
      currentAnimationFrame: config.currentAnimationFrame,
    });

    // update() {}
  }
}
