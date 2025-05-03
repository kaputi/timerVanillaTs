import { IInterval } from './interval';

export enum TimerStatus {
  STOPPED = 'stopped',
  RUNNING = 'running',
  PAUSED = 'paused',
  FINISHED = 'finished',
}

export interface ITimerState {
  status: TimerStatus;
  currentInterval: number;
  intervalDeltaTime: number;
}

export class Timer {
  private status: TimerStatus = TimerStatus.STOPPED;
  private currentInterval = 0;
  private startTime = 0;
  private startPauseTime = 0;
  private intervalDeltaTime = 0;
  private intervals: IInterval[] = [];

  constructor(intervals?: IInterval[]) {
    if (intervals) this.intervals = intervals;
  }

  public start(): void {
    if (this.intervals.length === 0) return;

    if (this.status === TimerStatus.RUNNING || this.status === TimerStatus.FINISHED) return;

    if (this.status === TimerStatus.PAUSED) {
      this.startTime += Date.now() - this.startPauseTime;
      this.status = TimerStatus.RUNNING;
      return;
    }

    this.status = TimerStatus.RUNNING;
    this.startTime = Date.now();
    this.currentInterval = 0;
  }

  public stop(): void {
    if (this.status === TimerStatus.STOPPED) return;
    this.status = TimerStatus.STOPPED;
  }

  public pause(): void {
    if (this.status !== TimerStatus.RUNNING) return;
    this.status = TimerStatus.PAUSED;
    this.startPauseTime = Date.now();
  }

  public update(): void {
    if (this.status !== TimerStatus.RUNNING) return;
    const elapsedTime = Date.now() - this.startTime;
    const currentInterval = this.intervals[this.currentInterval];
    if (elapsedTime >= currentInterval.duration) {
      this.currentInterval++;
      if (this.currentInterval >= this.intervals.length) {
        this.status = TimerStatus.FINISHED;
        return;
      }
      this.startTime += currentInterval.duration;
      this.update();
      return;
    }
    this.intervalDeltaTime = elapsedTime;
  }

  public getState(): ITimerState {
    return {
      status: this.status,
      currentInterval: this.currentInterval,
      intervalDeltaTime: this.intervalDeltaTime,
    };
  }

  public setIntervals(intervals: IInterval[]): void {
    if (this.status !== TimerStatus.STOPPED) return;
    this.intervals = intervals;
  }
}
