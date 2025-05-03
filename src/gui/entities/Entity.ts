import { generateUID } from '@/core/generateUid';

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

  protected pickable = false;

  constructor(
    public readonly name: string,
    { origin, width, height }: EntityProps
  ) {
    this.width = width;
    this.height = height;
    if (origin) this.origin = origin;
  }

  public pickObject({ x, y }: Coord): boolean {
    if (!this.pickable) return false;

    const {
      origin: { x: originX, y: originY },
      width,
      height,
    } = this;
    return x >= originX && x <= originX + width && y >= originY && y <= originY + height;
  }

  public abstract update(delta: number): void;

  public abstract draw(ctx: CanvasRenderingContext2D): void;
}
