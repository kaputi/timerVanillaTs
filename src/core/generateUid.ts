let UIDCounter = 0;

export const generateUID = (): number => {
  return UIDCounter++;
};
