import { generateUID } from '@/core/generateUid';

export enum Interaction {
  mouseDown = 'mouseDown',
  moueUp = 'mouseUp',
  mouseMove = 'mouseMove',
  mouseIn = 'mouseIn',
  mouseOut = 'mouseOut',
  hover = 'hover',
  drag = 'drag',
}

export interface EntityProps {
  width: number;
  height: number;
  origin?: Coord;
  rotation?: number;
}

export abstract class Entity {
  protected id = generateUID();

  protected origin: Coord = { x: 0, y: 0 };
  protected rotation = 0;
  private width: number;
  private height: number;

  private interactions = new Set<Interaction>();
  private mouseIn = false;

  constructor(
    protected name: string,
    { origin, rotation, width, height }: EntityProps
  ) {
    this.width = width;
    this.height = height;
    if (origin) this.origin = origin;
    if (rotation) this.rotation = rotation;
  }

  public addInteraction(interaction: Interaction): void {
    this.interactions.add(interaction);
  }

  public removeInteraction(interaction: Interaction): void {
    this.interactions.delete(interaction);
  }

  public pickObject({ x, y }: Coord, interaction: Interaction): boolean {
    if (!this.interactions.has(interaction)) return false;
    const {
      origin: { x: originX, y: originY },
      width,
      height,
    } = this;

    const inside = x >= originX && x <= originX + width && y >= originY && y <= originY + height;

    let result = false;
    switch (interaction) {
      case Interaction.mouseIn:
        result = inside && !this.mouseIn;
        break;
      case Interaction.mouseOut:
        result = !inside && this.mouseIn;
        break;
      case Interaction.mouseMove:
      case Interaction.mouseDown:
      case Interaction.moueUp:
      case Interaction.hover:
      case Interaction.drag:
        result = inside;
    }

    this.mouseIn = inside;
    return result;
  }

  public abstract update(delta: number): void;

  public abstract draw(ctx: CanvasRenderingContext2D): void;
}
