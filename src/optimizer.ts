import { Profile, BreathingGas, Pressure, Depth } from "./types";
import { barMSW } from "./constantszhl16c";

const decoGasesToCheck = [
  { pn2: 0.0, phe2: 0 },
  { pn2: 0.17, phe2: 0 },
  { pn2: 0.28, phe2: 0 },
  { pn2: 0.37, phe2: 0 },
  { pn2: 0.44, phe2: 0 },
  { pn2: 0.49, phe2: 0 },
  { pn2: 0.54, phe2: 0 },
  { pn2: 0.58, phe2: 0 },
  { pn2: 0.64, phe2: 0 }
];

export function bestMix(depth: Depth, ppo2Limit: Pressure): BreathingGas {
  const besto2 = Math.min(
    100,
    Math.floor(100 * Math.max(0.0, ppo2Limit / (depth * barMSW + 1)))
  );
  return {
    percentn2: 100 - besto2,
    percenthe2: 0
  };
}
