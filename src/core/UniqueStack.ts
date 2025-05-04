export class UniqueStack<T> {
  private stack: T[] = [];

  get length(): number {
    return this.stack.length;
  }

  /** If the item is already in the stack, it will not be added again, but it will be brought to the top */
  public push(item: T): void {
    if (this.stack.includes(item)) this.stack.splice(this.stack.indexOf(item), 1);
    this.stack.push(item);
  }

  public pop(): T | undefined {
    return this.stack.pop();
  }

  public peek(): T | undefined {
    return this.stack.at(-1);
  }

  /** Remember this is a stack, so last in, first out */
  public peekAt(index: number): T | undefined {
    index = Math.round(index);
    if (index > this.length) index = this.length;

    if (index === 0) index = this.length;
    else if (index < 0) index = -index;
    else index = this.length - index;

    return this.stack.at(index - 1);
  }

  public remove(item: T): void {
    const index = this.stack.indexOf(item);
    if (index !== -1) this.stack.splice(index, 1);
  }

  public clear(): void {
    this.stack = [];
  }

  public forEach(callback: (item: T, index?: number, stack?: T[]) => void): void {
    for (let i = 0; i < this.length; i++) {
      callback(this.stack[i], i, this.stack);
    }
  }

  public toArray(): T[] {
    return [...this.stack];
  }
}
