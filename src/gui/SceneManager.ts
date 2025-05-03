import { UniqueStack } from '@/core/UniqueStack';
import { Scene } from './Scene';
import { MouseObserver } from './InputManger';

class SceneManager implements MouseObserver {
  private scenes = new Map<string, Scene>();
  private activeScenes = new UniqueStack<Scene>();

  constructor() {
    window.addEventListener('resize', () => {
      this.activeScenes.forEach((scene) => {
        scene.resize();
      });
    });
  }

  public addScene(name: string): void {
    if (this.scenes.has(name)) {
      throw new Error(`Scene with name ${name} already exists`);
    }

    this.scenes.set(name, new Scene(name));
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
    if (active) {
      console.log(event);
    }
  }

  public onMouseMove(event: MouseEvent): void {
    const active = this.activeScenes.peek();
    if (active) {
      console.log(event);
    }
  }
}

export const sceneManager = new SceneManager();
