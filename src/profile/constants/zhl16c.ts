import { Pressure, CompartmentNumber } from "../types";
import { barMSW } from './'

// TODO: I don't know where I got these numbers from; find a reputable source
const n2DMs = [
  1.9082,
  // 1.7928, compartment 1b?
  1.5352,
  1.3847,
  1.278,
  1.2306,
  1.1857,
  1.1504,
  1.1223,
  1.0999,
  1.0844,
  1.0731,
  1.0635,
  1.0552,
  1.0478,
  1.0414,
  1.0359
];

const n2M0s = [
  32.4,
  // 29.6, compartment 1b?
  25.4,
  22.5,
  20.3,
  18.5,
  16.9,
  15.9,
  15.2,
  14.7,
  14.3,
  14.0,
  13.7,
  13.4,
  13.1,
  12.9,
  12.7
];

export function getA(num: CompartmentNumber) {
  return n2M0s[num] * barMSW - n2DMs[num];
}

export function getB(num: CompartmentNumber) {
  return 1.0 / n2DMs[num];
}
