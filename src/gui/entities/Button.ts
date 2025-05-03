import { Entity } from './Entity';

interface TextProps {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
}

export class Button extends Entity {
  private path: Path2D;

  protected fontSize: number;
  protected fontFamily: string;
  protected fontWeight: string;
  protected font: string;

  constructor(
    protected text: string,
    { fontSize, fontFamily, fontWeight }: TextProps
  ) {
    const path = new Path2D();
    fontSize = fontSize || 12;
    fontFamily = fontFamily || 'Arial';
    fontWeight = fontWeight || 'normal';

    const font = `${fontWeight} ${fontSize}px ${fontFamily}`;

    super();

    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.fontWeight = fontWeight;
    this.font = font;
    this.path = path;
  }

  public update(delta: number): void {
    console.log(delta);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    console.log(ctx);
  }
}
