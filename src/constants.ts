import { Pressure, HalfTime, AValue, BValue } from "./types";
export const pwater: Pressure = 0.063;
//export const barMSW: Pressure = 0.100693064;
export const barMSW: Pressure = 0.1;
export const ATM: Pressure = 1.0;

export const n2HTs: HalfTime[] = [
  2.65,
  7.94,
  12.2,
  18.5,
  26.5,
  37.0,
  53.0,
  79.0,
  114.0,
  146.0,
  185.0,
  238.0,
  304.0,
  397.0,
  503.0,
  635.0
];

export const he2HTs: HalfTime[] = [
  1.0,
  3.0,
  4.6,
  7.0,
  10.0,
  14.0,
  20.0,
  30.0,
  43.0,
  55.0,
  70.0,
  90.0,
  115.0,
  150.0,
  190.0,
  240.0
];

export const n2As: AValue[] = [
  2.2,
  1.5,
  1.08,
  0.9,
  0.75,
  0.58,
  0.47,
  0.455,
  0.455,
  0.455,
  0.38,
  0.255,
  0.255,
  0.255,
  0.255,
  0.255
];
export const he2As: AValue[] = [
  2.2,
  1.5,
  1.08,
  0.9,
  0.75,
  0.58,
  0.47,
  0.455,
  0.455,
  0.515,
  0.515,
  0.515,
  0.515,
  0.515,
  0.515,
  0.515
];

export const n2Bs: BValue[] = [
  0.82,
  0.82,
  0.825,
  0.835,
  0.845,
  0.86,
  0.87,
  0.89,
  0.89,
  0.934,
  0.934,
  0.944,
  0.962,
  0.962,
  0.962,
  0.962
];
export const he2Bs: BValue[] = [
  0.82,
  0.82,
  0.825,
  0.835,
  0.845,
  0.86,
  0.87,
  0.89,
  0.89,
  0.926,
  0.926,
  0.926,
  0.926,
  0.926,
  0.926,
  0.926
];
