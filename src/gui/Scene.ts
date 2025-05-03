import { applyCss } from '@/core/applyCss';
import { Entity } from './entities/Entity';

export class Scene {
  public readonly canvas = document.createElement('canvas');
  public readonly ctx: CanvasRenderingContext2D;

  private entities: Entity[] = [];

  private mouseDown: Entity | null = null;
  private hovered: Entity | null = null;

  constructor(public readonly name: string) {
    this.canvas = document.createElement('canvas');
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }
    this.ctx = ctx;

    const canvasStyles: CssStyle = {
      position: 'absolute',
      top: '0 px',
      left: '0 px',
      width: '100%',
      height: '100%',
      zIndex: '9999',
    };

    applyCss(this.canvas, canvasStyles);
    document.body.appendChild(this.canvas);
  }

  public resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  public addEntity(entity: Entity): void {
    this.entities.push(entity);
    // TODO: order entities acording to priority
  }

  public activate(): void {
    // TODO: Implement activation logic, for example, if mouse is on top of entity, set it as hovered
  }

  public deactivate(): void {
    // TODO: Implement activation logic, for example, if mouse is on top of entity, set it as hovered
  }

  private pick(coord: Coord): Entity | null {
    const entity = this.entities.find((entity) => entity.pick(coord));
    return entity || null;
  }

  public onMouseDown(coord: Coord): void {
    const entity = this.pick(coord);
    if (entity) entity.onMouseDown();
    this.mouseDown = entity;
  }

  public onMouseUp(coord: Coord): void {
    const entity = this.pick(coord);
    if (this.mouseDown && this.mouseDown === entity) this.mouseDown.onMouseUp();
    this.mouseDown = null;
  }

  public onMouseMove(coord: Coord): void {
    const entity = this.pick(coord);

    if (this.hovered && this.hovered !== entity) this.hovered.unhover();
    if (entity && !this.hovered) entity.hover();

    this.hovered = entity;

    if (entity && entity === this.mouseDown) {
      entity.onDrag(coord);
    }
  }
}
