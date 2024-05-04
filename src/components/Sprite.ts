import Shadow from "../assets/images/characters/shadow.png";
import { utils } from "../helpers/utils";
import { GameObjectConfig } from "./GameObject";
import { PersonConfig } from "./Person";

interface SpriteConfig {
  gameObject: GameObjectConfig;
  src: string;
  animations?: Animations;
  currentAnimation?: string;
  animationFrameLimit?: number;
  currentAnimationFrame?: number;
}

export interface Animations {
  [key: string]: number[][];
}

export default class Sprite {
  animations?: Animations;
  currentAnimation?: string;
  currentAnimationFrame?: number;
  image: HTMLImageElement;
  shadow: HTMLImageElement;
  ctx: CanvasRenderingContext2D | null = null;
  isLoaded: boolean | undefined;
  isShadowLoaded: boolean | undefined;
  useShadow: boolean;
  gameObject: GameObjectConfig;
  animationFrameLimit: any;
  animationFrameProgress: number;

  constructor(config: SpriteConfig) {
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    this.shadow = new Image();
    this.useShadow = true;
    if (this.useShadow) {
      this.shadow.src = Shadow;
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    this.animations = config.animations || {
      "idle-down": [[0, 0]],
      "idle-up": [[0, 2]],
      "idle-left": [[0, 3]],
      "idle-right": [[0, 1]],
      "walk-down": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-up": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-left": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
      "walk-right": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
    };
    this.currentAnimation = "idle-right"; // config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations?.[this.currentAnimation ?? "idle-down"]?.[
      this.currentAnimationFrame ?? 0
    ];
  }

  setAnimation(key: string) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress && this.animationFrameProgress > 0) {
      this.animationFrameProgress--;
      return;
    }
    if (this.animationFrameLimit) {
      this.animationFrameProgress = this.animationFrameLimit;
    }
    if (this.currentAnimationFrame !== undefined) {
      this.currentAnimationFrame++;
    }
    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D, cameraPerson: PersonConfig) {
    const x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
    const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;

    this.isShadowLoaded &&
      ctx?.drawImage(
        this.shadow,
        0, // left cut
        0, // right cut
        32, // width
        32, // height
        x,
        y,
        32,
        32
      );

    const frame = this.frame;
    if (frame) {
      const [frameX, frameY] = frame;
      this.isLoaded &&
        ctx?.drawImage(
          this.image,
          frameX * 32, // left cut
          frameY * 32, // right cut
          32, // width
          32, // height
          x,
          y,
          32,
          32
        );
    }

    this.updateAnimationProgress();
  }
}
