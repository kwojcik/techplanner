export type DepthChangeRate = number;
export type HalfTime = number;
export type Minute = number;
export type Depth = number;
export type Pressure = number;
export type AValue = number;
export type BValue = number;
export type CompartmentNumber = number;
export type BreathingGas = {
  pn2: Pressure;
  phe2: Pressure;
};
export type Profile = { d: Depth; t: Minute }[];
