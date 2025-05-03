import { applyCss } from '@/core/applyCss';

export interface MouseDownObserver {
  onMouseDown(event: MouseEvent): void;
}

export interface MouseUpObserver {
  onMouseUp(event: MouseEvent): void;
}

export interface MouseMoveObserver {
  onMouseMove(event: MouseEvent): void;
}

export interface KeyDownObserver {
  onKeyDown(event: KeyboardEvent): void;
}

export interface KeyUpObserver {
  onKeyUp(event: KeyboardEvent): void;
}

export interface MouseObserver extends MouseDownObserver, MouseUpObserver, MouseMoveObserver {}

class InputManager {
  private div = document.createElement('div');
  private observers = {
    mouseDown: new Set<MouseDownObserver>(),
    mouseUp: new Set<MouseUpObserver>(),
    mouseMove: new Set<MouseMoveObserver>(),
    keyDown: new Set<KeyDownObserver>(),
    keyUp: new Set<KeyUpObserver>(),
  };

  constructor() {
    const styles: CssStyle = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%',
      zIndex: '99999',
      pointerEvents: 'none',
    };

    applyCss(this.div, styles);
    document.body.appendChild(this.div);

    document.addEventListener('keydown', (event) => this.notifyObservers('keyDown', event));
    document.addEventListener('keyup', (event) => this.notifyObservers('keyUp', event));
    document.addEventListener('mousedown', (event) => this.notifyObservers('mouseDown', event));
    document.addEventListener('mouseup', (event) => this.notifyObservers('mouseUp', event));
    document.addEventListener('mousemove', (event) => this.notifyObservers('mouseMove', event));
  }

  private notifyObservers(type: keyof typeof this.observers, event: Event): void {
    this.observers[type].forEach((observer) => {
      switch (type) {
        case 'mouseDown':
          (observer as MouseDownObserver).onMouseDown(event as MouseEvent);
          break;
        case 'mouseUp':
          (observer as MouseUpObserver).onMouseUp(event as MouseEvent);
          break;
        case 'mouseMove':
          (observer as MouseMoveObserver).onMouseMove(event as MouseEvent);
          break;
        case 'keyDown':
          (observer as KeyDownObserver).onKeyDown(event as KeyboardEvent);
          break;
        case 'keyUp':
          (observer as KeyUpObserver).onKeyUp(event as KeyboardEvent);
          break;
      }
    });
  }

  private manageObserver(
    type: keyof typeof this.observers,
    observer:
      | MouseDownObserver
      | MouseUpObserver
      | MouseMoveObserver
      | KeyDownObserver
      | KeyUpObserver,
    action: 'add' | 'remove'
  ): void {
    const observerSet = this.observers[type] as Set<typeof observer>;
    if (action === 'add') {
      observerSet.add(observer);
    } else {
      observerSet.delete(observer);
    }
  }

  public registerMouseDown(observer: MouseDownObserver): void {
    this.manageObserver('mouseDown', observer, 'add');
  }

  public registerMouseUp(observer: MouseUpObserver): void {
    this.manageObserver('mouseUp', observer, 'add');
  }

  public registerMouseMove(observer: MouseMoveObserver): void {
    this.manageObserver('mouseMove', observer, 'add');
  }

  public registerKeyDown(observer: KeyDownObserver): void {
    this.manageObserver('keyDown', observer, 'add');
  }

  public registerKeyUp(observer: KeyUpObserver): void {
    this.manageObserver('keyUp', observer, 'add');
  }

  public unregisterMouseDown(observer: MouseDownObserver): void {
    this.manageObserver('mouseDown', observer, 'remove');
  }

  public unregisterMouseUp(observer: MouseUpObserver): void {
    this.manageObserver('mouseUp', observer, 'remove');
  }

  public unregisterMouseMove(observer: MouseMoveObserver): void {
    this.manageObserver('mouseMove', observer, 'remove');
  }

  public unregisterKeyDown(observer: KeyDownObserver): void {
    this.manageObserver('keyDown', observer, 'remove');
  }

  public unregisterKeyUp(observer: KeyUpObserver): void {
    this.manageObserver('keyUp', observer, 'remove');
  }
}

export const inputManager = new InputManager();
