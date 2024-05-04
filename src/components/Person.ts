import GameObject, { GameObjectConfig } from "./GameObject";

export interface PersonConfig extends GameObjectConfig {
  isPlayerControlled?: boolean;
  movingProgressRemaining?: number;
  directionUpdate?: Record<string, [string, number]>;
}

export default class Person extends GameObject {
  movingProgressRemaining: number;
  directionUpdate: any;
  isPlayerControlled: boolean;
  constructor(config: PersonConfig) {
    super(config);
    this.movingProgressRemaining = 0;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state: Record<string, string>) {
    this.updatePosition();
    this.updateSprite(state);
    if (
      this.isPlayerControlled &&
      this.movingProgressRemaining === 0 &&
      state.arrow
    ) {
      this.direction = state.arrow;
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property as keyof this] += change;
      this.movingProgressRemaining -= 1;
    }
  }

  updateSprite(state: Record<string, string>) {
    if (
      this.isPlayerControlled &&
      this.movingProgressRemaining === 0 &&
      !state.arrow
    ) {
      this.sprite.setAnimation("idle-" + this.direction);
      return;
    }

    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
    }
  }
}
