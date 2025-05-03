declare global {
  interface Coord {
    x: number;
    y: number;
  }

  type CssStyle = Partial<CSSStyleDeclaration>;
}

export {};
