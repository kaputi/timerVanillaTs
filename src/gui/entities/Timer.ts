import { Timer } from '@/core/timer';
import { Entity } from './Entity';
import { timeString } from '@/core/timeFormat';
import { text } from '../drawUtils';
import { measureText } from '../offscreenCanvas';

interface TimerProps {
  origin: Coord;
  fontWeight?: string;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  padding?: number;
}

export class TimerE extends Entity {
  public readonly timer = new Timer();
  private timeString = '00:00:00:00';
  private fontSize: number;
  private fontFamily: string;
  private fontWeight: string;
  private padding: number;
  private color: string;

  constructor(
    name: string,
    { origin, fontFamily, fontSize, fontWeight, padding, color }: TimerProps
  ) {
    fontSize = fontSize || 12;
    fontFamily = fontFamily || 'Arial';
    fontWeight = fontWeight || 'normal';
    padding = padding || 5;
    color = color || '#000';

    const font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const measure = measureText('00:00:00:00', font);

    super(name, { width: measure.width + padding * 2, height: fontSize + padding * 2, origin });

    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.fontWeight = fontWeight;
    this.padding = padding;
    this.color = color;
  }

  public update(_deltaTime: number): void {
    this.timer.update();
    const timerState = this.timer.getState();
    this.timeString = timeString(timerState.intervalDeltaTime);
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    text(ctx, {
      text: this.timeString,
      x: this.origin.x,
      y: this.origin.y,
      color: this.color,
      fontSize: this.fontSize,
      fontFamily: this.fontFamily,
      fontWeight: this.fontWeight,
      padding: this.padding,
    });
  }
}
