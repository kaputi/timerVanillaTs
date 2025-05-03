import { UniqueStack } from '@/core/UniqueStack';
import { Scene } from './Scene';
import { inputManager, MouseObserver } from './InputManger';

class SceneManager implements MouseObserver {
  private scenes = new Map<string, Scene>();
  private activeScenes = new UniqueStack<Scene>();

  constructor() {
    window.addEventListener('resize', () => {
      this.activeScenes.forEach((scene) => {
        scene.resize();
      });
    });
    inputManager.registerMouseDown(this);
    inputManager.registerMouseUp(this);
    inputManager.registerMouseMove(this);
  }

  public createScene(name: string): Scene {
    if (this.scenes.has(name)) {
      throw new Error(`Scene with name ${name} already exists`);
    }

    const scene = new Scene(name);

    this.scenes.set(name, scene);
    return scene;
  }

  public removeScene(name: string): void {
    const scene = this.scenes.get(name);
    if (!scene) {
      throw new Error(`Scene with name ${name} does not exist`);
    }

    this.scenes.delete(name);
    this.activeScenes.remove(scene);
  }

  public activateScene(name: string): void {
    const scene = this.scenes.get(name);

    if (!scene) {
      throw new Error(`Scene with name ${name} does not exist`);
    }

    const prevScene = this.activeScenes.peek();
    if (prevScene) prevScene.deactivate();
    this.activeScenes.push(scene);
    scene.activate();
  }

  public deactivateScene(name: string): void {
    const scene = this.scenes.get(name);
    if (!scene) {
      throw new Error(`Scene with name ${name} does not exist`);
    }

    scene.deactivate();
    this.activeScenes.remove(scene);
  }

  public clearActiveScenes(): void {
    this.activeScenes.forEach((scene) => {
      scene.deactivate();
    });
    this.activeScenes.clear();
  }

  public onMouseDown(event: MouseEvent): void {
    const active = this.activeScenes.peek();
    if (active) active.onMouseDown(event);
  }

  public onMouseUp(event: MouseEvent): void {
    const active = this.activeScenes.peek();
    if (active) active.onMouseUp(event);
  }

  public onMouseMove(event: MouseEvent): void {
    const active = this.activeScenes.peek();
    if (active) active.onMouseMove({ x: event.clientX, y: event.clientY });
  }

  public draw(): void {
    for (let i = this.activeScenes.length - 1; i >= 0; i--) {
      const scene = this.activeScenes.peekAt(i);
      if (scene) {
        scene.draw();
      }
    }
  }
  public update(deltaTime: number): void {
    for (let i = this.activeScenes.length - 1; i >= 0; i--) {
      const scene = this.activeScenes.peekAt(i);
      if (scene) {
        scene.update(deltaTime);
      }
    }
  }
}

export const sceneManager = new SceneManager();
