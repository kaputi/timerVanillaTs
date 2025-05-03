import { generateUID } from '@/core/generateUid';

enum InteractionType {
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

  constructor(
    public readonly name: string,
    { origin, width, height }: EntityProps
  ) {
    this.width = width;
    this.height = height;
    if (origin) this.origin = origin;
  }

  public pick({ x, y }: Coord): boolean {
    if (this.interactions.size === 0) return false;

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

  public abstract update(delta: number): void;
  public abstract draw(ctx: CanvasRenderingContext2D): void;
}
