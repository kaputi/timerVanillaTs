import { createDummyConfig } from './core/dummyConfig';
// import { timeString } from './core/timeFormat';
// import { Timer } from './core/timer';
import { app } from './app/app';
import { Button } from './gui/entities/Button';
import { sceneManager } from './gui/SceneManager';
import './style.css';
import { TimerE } from './gui/entities/Timer';
import { InteractionType } from './gui/entities/Entity';

const main = (): void => {
  const dummyConfig = createDummyConfig();
  console.log('Dummy Config:', dummyConfig);
  const exercise = dummyConfig[0];
  const { intervals } = exercise;
  // const timer = new Timer(intervals);
  // console.log('Timer:', timer);
  // timer.start();
  // setTimeout(() => {
  //   timer.pause();
  // }, 3000);
  // setTimeout(() => {
  //   timer.start();
  // }, 6000);
  // function update(): void {
  //   timer.update();
  //   const timerState = timer.getState();
  //   // console.log('Timer State:', timerState);
  //   const time = timerState.intervalDeltaTime;
  //   const timeStr = timeString(time);
  //   console.log(timerState.status, timerState.currentInterval, timeStr);
  //   requestAnimationFrame(() => update());
  // }
  // update();

  const scene = sceneManager.createScene('main');
  const button = new Button('testButton', {
    text: 'Test Button',
    origin: { x: 50, y: 50 },
    color: 'white',
    bgColor: '#444444',
    borderColor: '#444444',
    hoverBgColor: '#666666',
  });

  scene.addEntity(button);

  const timerEntity = new TimerE('Timer', { origin: { x: 200, y: 200 }, fontSize: 20 });
  timerEntity.timer.setIntervals(intervals);

  button.addInteraction(InteractionType.mouseUp, () => {
    timerEntity.timer.start();
  });

  scene.addEntity(timerEntity);

  sceneManager.activateScene('main');

  // function loop(elapsed: number): void {
  //   console.log()
  //   sceneManager.draw();
  //   requestAnimationFrame(loop);
  // }

  // requestAnimationFrame(loop);
  app.startLoop();
};

main();
