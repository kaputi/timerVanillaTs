import { rect, roundCornerRect } from '../drawUtils';
import { measureText } from '../offscreenCanvas';
import { Entity } from './Entity';

interface ButtonProps {
  text: string;
  origin: Coord;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  padding?: number;
  corenrRadius?: number;
  color?: string;
  pressedColor?: string;
  hoverColor?: string;
  bgColor?: string;
  pressedBgColor?: string;
  hoverBgColor?: string;
  edgeColor?: string;
  pressedEdgeColor?: string;
  hoeverEdgeColor?: string;
  opacity?: number;
}

export class Button extends Entity {
  // TODO:  this fields should be set with a setter to recalculate dimensions
  public text: string;
  public fontSize: number;
  public fontFamily: string;
  public fontWeight: string;
  public font: string;
  public padding: number;
  public cornerRadius: number;
  public color: string;
  public pressedColor: string;
  public hoverColor: string;
  public bgColor: string;
  public bgPressedColor: string;
  public bgHoverColor: string;
  public edgeColor: string;
  public pressedEdgeColor: string;
  public hoeverEdgeColor: string;
  public opacity: number;

  private isHover = false;
  private isPressed = false;

  constructor(
    public readonly name: string,
    {
      text,
      origin,
      fontSize,
      fontFamily,
      fontWeight,
      padding,
      corenrRadius,
      color,
      pressedColor,
      hoverColor,
      bgColor,
      pressedBgColor,
      hoverBgColor,
      edgeColor,
      pressedEdgeColor,
      hoeverEdgeColor,
      opacity,
    }: ButtonProps
  ) {
    fontSize = fontSize || 12;
    fontFamily = fontFamily || 'Arial';
    fontWeight = fontWeight || 'normal';
    padding = padding || 5;

    const font = `${fontWeight} ${fontSize}px ${fontFamily}`;

    const measure = measureText(text, font);

    super(name, { width: measure.width + padding * 2, height: fontSize + padding * 2, origin });

    this.text = text;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.fontWeight = fontWeight;
    this.font = font;
    this.padding = padding;
    this.cornerRadius = corenrRadius || 0;
    this.color = color || '#000';
    this.pressedColor = pressedColor || '#000';
    this.hoverColor = hoverColor || '#000';
    this.bgColor = bgColor || '#fff';
    this.bgPressedColor = pressedBgColor || '#fff';
    this.bgHoverColor = hoverBgColor || '#fff';
    this.edgeColor = edgeColor || '#000';
    this.pressedEdgeColor = pressedEdgeColor || '#000';
    this.hoeverEdgeColor = hoeverEdgeColor || '#000';
    this.opacity = opacity || 1;
  }

  public hover(): void {
    this.isHover = true;
  }

  public unhover(): void {
    this.isHover = false;
  }

  public press(): void {
    this.isPressed = true;
  }

  public release(): void {
    this.isPressed = false;
  }

  public update(delta: number): void {
    console.log(delta);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.origin;
    const { width, height, cornerRadius } = this;

    ctx.globalAlpha = this.opacity;

    // BOX
    if (cornerRadius) rect(ctx, { x, y, width, height });
    else roundCornerRect(ctx, { x, y, width, height, radius: cornerRadius });
    ctx.fillStyle = this.isPressed
      ? this.bgPressedColor
      : this.isHover
        ? this.bgHoverColor
        : this.bgColor;
    ctx.strokeStyle = this.isPressed
      ? this.pressedEdgeColor
      : this.isHover
        ? this.hoeverEdgeColor
        : this.edgeColor;
    ctx.fill();
    ctx.stroke();

    // TEXT
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.isPressed
      ? this.pressedColor
      : this.isHover
        ? this.hoverColor
        : this.color;
    ctx.fillText(this.text, x + width / 2, y + height / 2);

    ctx.globalAlpha = 1;
  }
}
