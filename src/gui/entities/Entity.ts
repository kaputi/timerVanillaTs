import { generateUID } from '@/core/generateUid';

export enum InteractionType {
  mouseDown = 'mouseDown',
  mouseUp = 'mouseUp',
  mouseIn = 'mouseIn',
  mouseOut = 'mouseOut',
  drag = 'drag',
}

export interface EntityProps {
  width: number;
  height: number;
  origin?: Coord;
  rotation?: number;
}

export abstract class Entity {
  public readonly id = generateUID();

  protected origin: Coord = { x: 0, y: 0 };
  protected width: number;
  protected height: number;

  protected interactions = new Map<InteractionType, Set<(coord?: Coord) => void>>();

  protected mouseDown = false;
  protected mouseIn = false;

  get geometry(): { width: number; height: number; x: number; y: number } {
    return {
      x: this.origin.x,
      y: this.origin.y,
      width: this.width,
      height: this.height,
    };
  }

  constructor(
    public readonly name: string,
    { origin, width, height }: EntityProps
  ) {
    this.width = width;
    this.height = height;
    if (origin) this.origin = origin;
  }

  public pick({ x, y }: Coord): boolean {
    const {
      origin: { x: originX, y: originY },
      width,
      height,
    } = this;
    return x >= originX && x <= originX + width && y >= originY && y <= originY + height;
  }

  public resetInteractions(): void {
    this.mouseDown = false;
    this.mouseIn = false;
  }

  private doInteraction(type: InteractionType, coord?: Coord): void {
    const interaction = this.interactions.get(type);
    if (interaction) {
      interaction.forEach((callback) => {
        callback(coord);
      });
    }
  }

  public onMouseDown(): void {
    this.mouseDown = true;
    this.doInteraction(InteractionType.mouseDown);
  }

  public onMouseUp(): void {
    this.mouseDown = false;
    this.doInteraction(InteractionType.mouseUp);
  }

  public onDrag(coord: Coord): void {
    this.doInteraction(InteractionType.drag, coord);
  }

  public hover(): void {
    this.doInteraction(InteractionType.mouseIn);
    this.mouseIn = true;
  }

  public unhover(): void {
    this.doInteraction(InteractionType.mouseOut);
    this.mouseIn = false;
  }

  public addInteraction(type: InteractionType, callback: (coord?: Coord) => void): void {
    if (!this.interactions.has(type)) {
      this.interactions.set(type, new Set());
    }
    this.interactions.get(type)?.add(callback);
  }

  public abstract update(deltaTime: number): void;
  public abstract draw(ctx: CanvasRenderingContext2D): void;
}
