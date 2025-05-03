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

  public addAt(index: number, item: T): void {
    if (index < 0 || index > this.stack.length) throw new Error('Index out of bounds');

    if (!this.stack.includes(item)) this.stack.splice(index, 0, item);
  }

  public pop(): T | undefined {
    return this.stack.pop();
  }

  public peek(): T | undefined {
    return this.stack.at(-1);
  }

  public peekAt(index: number): T | undefined {
    if (index < 0 || index >= this.stack.length) return;
    return this.stack[index];
  }

  public remove(item: T): void {
    const index = this.stack.indexOf(item);
    if (index !== -1) this.stack.splice(index, 1);
  }

  public clear(): void {
    this.stack = [];
  }

  public forEach(callback: (item: T, index?: number, stack?: T[]) => void): void {
    this.stack.forEach(callback);
  }
}
