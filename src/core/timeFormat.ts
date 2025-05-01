export const timeString = (millis: number): string => {
  const totalSeconds = Math.floor(millis / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((millis % 1000) / 10);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
};

interface ITimeSegment {
  number: number;
  string: string;
}

interface ITimeObject {
  hours: ITimeSegment;
  minutes: ITimeSegment;
  seconds: ITimeSegment;
  milliseconds: ITimeSegment;
}

export const timeObject = (millis: number): ITimeObject => {
  const totalSeconds = Math.floor(millis / 1000);
  const hoursNumber = Math.floor(totalSeconds / 3600);
  const minutesNumber = Math.floor((totalSeconds % 3600) / 60);
  const secondsNumber = totalSeconds % 60;
  const millisecondsNumber = Math.floor((millis % 1000) / 10);
  const hours = { number: hoursNumber, string: String(hoursNumber).padStart(2, '0') };
  const minutes = { number: minutesNumber, string: String(minutesNumber).padStart(2, '0') };
  const seconds = { number: secondsNumber, string: String(secondsNumber).padStart(2, '0') };
  const milliseconds = {
    number: millisecondsNumber,
    string: String(millisecondsNumber).padStart(2, '0'),
  };
  return { hours, minutes, seconds, milliseconds };
};
