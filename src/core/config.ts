import { Exercise, IExercise } from './exercise';

export const getConfig = (): Exercise[] => {
  const config: Exercise[] = [];
  const storedConfig = localStorage.getItem('config');

  if (storedConfig) {
    const parsedConfig = JSON.parse(storedConfig) as IExercise[];
    parsedConfig.forEach(({ name, description, intervals }) => {
      const exercise = new Exercise(name, description);
      intervals.forEach((interval) => {
        exercise.addInterval(interval);
      });
      config.push(exercise);
    });
  }

  return config;
};

export const saveConfig = (config: Exercise[]): void => {
  localStorage.setItem('config', JSON.stringify(config));
};
