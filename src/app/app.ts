import { inputManager } from '@/gui/InputManger';
import { sceneManager } from '@/gui/SceneManager';

class App {
  public readonly sceneManager = sceneManager;
  public readonly inputManager = inputManager;
}

export const app = new App();
