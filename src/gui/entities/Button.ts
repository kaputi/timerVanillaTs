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
  borderColor?: string;
  pressedBorderColor?: string;
  hoverBorderColor?: string;
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
  public borderColor: string;
  public pressedBorderColor: string;
  public hoverBorderColor: string;
  public opacity: number;

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
      borderColor,
      pressedBorderColor,
      hoverBorderColor,
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
    this.borderColor = borderColor || '#000';
    this.pressedBorderColor = pressedBorderColor || '#000';
    this.hoverBorderColor = hoverBorderColor || '#000';
    this.opacity = opacity || 1;
  }

  public update(_deltaTime: number): void {
    // console.log(deltaTime);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    const { x, y } = this.origin;
    const { width, height, cornerRadius } = this;

    ctx.globalAlpha = this.opacity;

    // TODO: use text from utils

    // BOX
    if (cornerRadius) rect(ctx, { x, y, width, height });
    else roundCornerRect(ctx, { x, y, width, height, radius: cornerRadius });
    ctx.fillStyle = this.mouseDown
      ? this.bgPressedColor
      : this.mouseIn
        ? this.bgHoverColor
        : this.bgColor;
    ctx.strokeStyle = this.mouseDown
      ? this.pressedBorderColor
      : this.mouseIn
        ? this.hoverBorderColor
        : this.borderColor;
    ctx.fill();
    ctx.stroke();

    // TEXT
    ctx.font = this.font;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = this.mouseDown
      ? this.pressedColor
      : this.mouseIn
        ? this.hoverColor
        : this.color;
    ctx.fillText(this.text, x + width / 2, y + height / 2);

    ctx.globalAlpha = 1;
  }
}
