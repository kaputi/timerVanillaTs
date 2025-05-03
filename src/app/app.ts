import { FPS } from '@/gui/FPS';
import { sceneManager } from '@/gui/SceneManager';

class App {
  private previeousTime = -1;
  private FPS = new FPS();
  private loopId: number | null = null;

  private update(deltaTime: number): void {
    sceneManager.update(deltaTime);
    this.FPS.update(deltaTime);
  }

  private draw(): void {
    sceneManager.draw();
    // this.FPS.draw();
  }

  private loop(deltaTime: number): void {
    if (this.previeousTime <= 0) this.previeousTime = deltaTime;

    this.update(deltaTime - this.previeousTime);
    this.draw();

    this.previeousTime = deltaTime;

    this.loopId = requestAnimationFrame(this.loop.bind(this));
  }

  public startLoop(): void {
    if (this.loopId) return;
    this.loopId = requestAnimationFrame(this.loop.bind(this));
  }

  public stopLoop(): void {
    if (!this.loopId) return;
    cancelAnimationFrame(this.loopId);
    this.loopId = null;
  }
}

export const app = new App();
