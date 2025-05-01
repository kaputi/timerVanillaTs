import { Exercise } from './exercise';
import { bikeInterval, brakeInterval } from './interval';

export const createDummyConfig = (): Exercise[] => {
  const config: Exercise[] = [];

  const tenSeconds = 10 * 1000;
  const fiveSeconds = 5 * 1000;
  const oneMinuteTenSeconds = 70 * 1000;

  const bikeInterval1 = bikeInterval(tenSeconds, 80, 40, 'Bike Interval 1');
  const brakeInterval1 = brakeInterval(fiveSeconds, 'Brake Interval 1');
  const bikeInterval2 = bikeInterval(oneMinuteTenSeconds, 100, 90, 'Bike Interval 2');

  const intervals = [bikeInterval1, brakeInterval1, bikeInterval2];

  const exercise1 = new Exercise('Exercise 1', 'Description 1', intervals);

  const exercise2 = new Exercise('Exercise 2', 'Description 2', intervals);

  const exercise3 = new Exercise('Exercise 2', 'Description 2', intervals);

  config.push(exercise1, exercise2, exercise3);

  return config;
};
