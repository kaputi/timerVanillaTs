import { createDummyConfig } from './core/dummyConfig';
import { timeString } from './core/timeFormat';
import { Timer } from './core/timer';
import './style.css';

const main = (): void => {
  const dummyConfig = createDummyConfig();
  // console.log('Dummy Config:', dummyConfig);

  const exercise = dummyConfig[0];

  const { intervals } = exercise;

  const timer = new Timer(intervals);
  // console.log('Timer:', timer);

  timer.start();

  setTimeout(() => {
    timer.pause();
  }, 3000);

  setTimeout(() => {
    timer.start();
  }, 6000);

  function update(): void {
    timer.update();
    const timerState = timer.getState();
    // console.log('Timer State:', timerState);
    const time = timerState.intervalDeltaTime;
    const timeStr = timeString(time);
    console.log(timerState.status, timerState.currentInterval, timeStr);
    requestAnimationFrame(() => update());
  }

  update();
};

main();
