import { Profile, BreathingGas, Pressure, Depth } from "./types";
import { barMSW } from "./constantszhl16c";
import { max, sum } from "lodash";
import { combinations } from "./utils";
import Diver from "./diver";
import { calculateDecoProfile } from "./profile";

const decoGasesToCheck: BreathingGas[] = [
  { percentn2: 0, percenthe2: 0 },
  { percentn2: 17, percenthe2: 0 },
  { percentn2: 28, percenthe2: 0 },
  { percentn2: 37, percenthe2: 0 },
  { percentn2: 44, percenthe2: 0 },
  { percentn2: 49, percenthe2: 0 },
  { percentn2: 54, percenthe2: 0 },
  { percentn2: 58, percenthe2: 0 },
  { percentn2: 64, percenthe2: 0 }
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

export function bestDecoForProfile(
  diveProfile: Profile,
  numGases: number,
  options: {
    diveppo2: number;
    bottomMix: BreathingGas;
  } = { diveppo2: 1.4, bottomMix: null }
): Profile {
  if (!options.bottomMix) {
    const deepest = max(diveProfile.map(stop => stop.d));
    options.bottomMix = bestMix(deepest, options.diveppo2);
  }

  const gasCombos: BreathingGas[][] = combinations(decoGasesToCheck, numGases);
  let bestProfile: Profile = [];
  let bestRuntime = 9999999999;
  gasCombos.forEach(gases => {
    gases = [options.bottomMix, ...gases];
    const diver = new Diver(0.79, 0, gases);
    diver.expose(diveProfile);
    const decoProfile = calculateDecoProfile(diver);
    const runTime = sum(decoProfile.map(stop => stop.t));
    if (runTime < bestRuntime) {
      bestRuntime = runTime;
      bestProfile = decoProfile;
    }
  });
  return bestProfile;
}
