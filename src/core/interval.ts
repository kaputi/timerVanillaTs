export enum IntervlType {
  WORK = 'work',
  BREAK = 'break',
  BIKE = 'bike',
}

export interface IInterval {
  duration: number;
  name: IntervlType;
  description?: string;
  cadence?: number;
  effort?: number;
}

export const brakeInterval = (duration: number, description?: string): IInterval => {
  return {
    duration,
    name: IntervlType.BREAK,
    description,
  };
};

export const bikeInterval = (
  duration: number,
  effort: number,
  cadence: number,
  description?: string
): IInterval => {
  if (effort < 0 || effort > 100) {
    throw new Error('effort must be between 0 and 100');
  }

  return {
    duration,
    name: IntervlType.BIKE,
    effort,
    cadence,
    description,
  };
};
