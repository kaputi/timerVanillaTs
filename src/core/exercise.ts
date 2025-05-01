import { IInterval } from './interval';

export interface IExercise {
  name: string;
  description?: string;
  intervals: IInterval[];
}

export class Exercise implements IExercise {
  public readonly intervals: IInterval[] = [];

  constructor(
    public readonly name: string,
    public readonly description?: string,
    intervals?: IInterval[]
  ) {
    if (intervals) this.intervals = intervals;
  }

  public addInterval(interval: IInterval): void {
    this.intervals.push(interval);
  }

  public removeInterval(index: number): void {
    if (index >= 0 && index < this.intervals.length) this.intervals.splice(index, 1);
    else throw new Error('Invalid interval index');
  }
}
