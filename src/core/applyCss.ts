export const applyCss = (element: HTMLElement, styles: CssStyle): void => {
  for (const [key, value] of Object.entries(styles)) {
    if (value === undefined) continue;
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    (element.style as any)[key] = value;
  }
};
