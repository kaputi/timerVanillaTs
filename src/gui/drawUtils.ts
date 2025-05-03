interface RoundedBoxProps {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
}

export const roundCornerRect = (
  ctx: CanvasRenderingContext2D,
  { x, y, width, height, radius }: RoundedBoxProps
): void => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
}
export const rect = (ctx: CanvasRenderingContext2D, { x, y, width, height }: RectProps): void => {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.closePath();
};

interface TextProps {
  text: string;
  x: number;
  y: number;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  padding?: number;
}

export const text = (
  ctx: CanvasRenderingContext2D,
  { text, x, y, color, fontSize, fontFamily, fontWeight, padding }: TextProps
): void => {
  color = color || '#000';
  fontSize = fontSize || 12;
  fontFamily = fontFamily || 'Arial';
  fontWeight = fontWeight || 'normal';
  padding = padding || 0;

  const font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.font = font;
  ctx.fillStyle = color;

  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';

  ctx.fillText(text, x + padding, y + padding);
};
