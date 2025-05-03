import { UniqueStack } from '@/core/UniqueStack';
import { Scene } from './Scene';

class SceneManager {
  private scenes = new Map<string, Scene>();
  private activeScenes = new UniqueStack<Scene>();

  public addScene(scene: Scene): void {
    if (this.scenes.has(scene.name)) {
      throw new Error(`Scene with name ${scene.name} already exists`);
    }
    this.scenes.set(scene.name, scene);
  }

  public removeScene(scene: Scene): void {
    if (!this.scenes.has(scene.name)) {
      throw new Error(`Scene with name ${scene.name} does not exist`);
    }
    this.scenes.delete(scene.name);
    this.activeScenes.remove(scene);
  }

  public activateScene(scene: Scene | string): void {
    if (typeof scene === 'string') {
      const foundScene = this.scenes.get(scene);
      if (!foundScene) {
        throw new Error(`Scene with name ${scene} does not exist`);
      }
      scene = foundScene;
    }
    const prevScene = this.activeScenes.peek();
    if (prevScene) prevScene.deactivate();
    this.activeScenes.push(scene);
    scene.activate();
  }

  public deactivateScene(scene: Scene | string): void {
    if (typeof scene === 'string') {
      const foundScene = this.scenes.get(scene);
      if (!foundScene) {
        throw new Error(`Scene with name ${scene} does not exist`);
      }
      scene = foundScene;
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
}

export const sceneManager = new SceneManager();
