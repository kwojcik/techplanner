export type DepthChangeRate = number;
export type HalfTime = number;
export type Minute = number;
export type Depth = number;
export type Pressure = number;
export type AValue = number;
export type BValue = number;
export type CompartmentNumber = number;
export type Liter = number;
export type Tank = {
  gas: BreathingGas;
  volume: Liter;
  fullPressure: Pressure;
  currentPressure: Pressure;
}
export type BreathingGas = {
  percentn2: number;
  percenthe2: number;
};
export type InspiredGas = {
  pn2: Pressure;
  phe2: Pressure;
};
export type ProfileStop = { d: Depth; t: Minute; g?: BreathingGas };
