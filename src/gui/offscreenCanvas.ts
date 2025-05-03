const offscreen = new OffscreenCanvas(512, 512);
const offCtx = offscreen.getContext('2d');
if (!offCtx) {
  throw new Error('Failed to get 2D context from OffscreenCanvas');
}

const measureText = (text: string, font: string): TextMetrics => {
  offCtx.font = font;
  return offCtx.measureText(text);
};

export { offCtx, measureText };
