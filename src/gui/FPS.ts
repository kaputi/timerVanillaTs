import { applyCss } from '@/core/applyCss';

interface FPSProps {
  left?: number;
  top?: number;
  updateInterval?: number;
  padding?: number;
  fontSize?: number;
}

export class FPS {
  private actualFps = 0;
  private fps = -1;
  private prevTime = -1;
  private updateInterval = 300;
  private left = 30;
  private top = 30;
  private padding = 3;
  private fontSize = 14;

  private ctx: CanvasRenderingContext2D;

  constructor({ updateInterval, left, top, padding, fontSize }: FPSProps = {}) {
    if (updateInterval) this.updateInterval = updateInterval;
    if (left) this.left = left;
    if (top) this.top = top;
    if (padding) this.padding = padding;
    if (fontSize) this.fontSize = fontSize;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 200;
    canvas.height = 100;

    const styles: CssStyle = {
      position: 'absolute',
      top: '0 px',
      left: '0 px',
      zIndex: '99999',
      pointerEvents: 'none',
    };

    applyCss(canvas, styles);

    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    this.ctx = ctx;

    document.body.appendChild(canvas);
  }

  public update(deltaTime: number): void {
    this.actualFps = 1000 / deltaTime;
    if (this.prevTime <= 0) this.prevTime = deltaTime;

    if (this.prevTime >= this.updateInterval) {
      this.prevTime = this.prevTime % this.updateInterval;
      this.fps = this.actualFps;
    }

    this.prevTime += deltaTime;
  }

  public draw(): void {
    const { ctx } = this;
    if (this.fps <= 0) return;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const { padding, left, top, fontSize } = this;

    ctx.font = `${fontSize}px Arial`;
    const text = `FPS: ${Math.floor(this.fps)}`;
    const textWidth = ctx.measureText(text).width;

    ctx.beginPath();
    ctx.fillStyle = '#666666';
    ctx.rect(left, top, textWidth + padding * 2, 16 + padding * 2);
    ctx.fill();
    ctx.closePath();

    // TODO: use text from utils
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(text, left + textWidth / 2 + padding, top + fontSize / 2 + padding);
  }
}
