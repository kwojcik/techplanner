import { Depth, ProfileStop, Minute } from "./types";
import Diver from "./diver";

export default class Profile {
  stops: ProfileStop[]
  constructor(stops: ProfileStop[] = []) {
    this.stops = stops
  }

  addStop(stop: ProfileStop) {
    this.stops.push(stop)
  }

  concat(profile: Profile) {
    return new Profile(this.stops.concat(profile.stops))
  }

  get runtime(): number {
    let t = 0;
    this.stops.forEach(stop => { t += stop.t })
    return t
  }
}

// Generate decompression profile
const stopDepthDelta = 3;
export function depthToStopDepth(depth: Depth): Depth {
  if (depth <= 0) {
    return 0;
  }
  return Math.round(
    depth + ((stopDepthDelta - (depth % stopDepthDelta)) % stopDepthDelta)
  );
}

const timeDelta = 1.0 / 60; // 1 second
const ascentRate = 10.0; // 10 meters/min
function ascend(diver: Diver, destDepth: Depth) {
  if (diver.depth === destDepth) {
    return;
  }

  const ascentProfile = new Profile();
  let currentDepth = diver.depth;
  while (Math.abs(currentDepth - destDepth) > 0.0000001) {
    currentDepth -= timeDelta * ascentRate;
    ascentProfile.addStop({ d: currentDepth, t: timeDelta });
  }
  diver.expose(ascentProfile);
}

export function calculateDecoProfile(diver: Diver): Profile {
  const decoProfile = new Profile();
  let currentStopTime: Minute = 0;
  let currentStopDepth: Depth = depthToStopDepth(diver.deepestToleratedDepth);

  while (currentStopDepth > 0) {
    // Ascend to the next step. Deco may be gone by the time we get there
    while (Math.abs(diver.depth - currentStopDepth) > 0.000001) {
      ascend(diver, currentStopDepth);
      currentStopDepth = depthToStopDepth(diver.deepestToleratedDepth);
    }
    diver.selectBestDecoGas();

    currentStopTime += 1;
    diver.expose(new Profile([{ d: currentStopDepth, t: 1 }]));

    const nextStopDepth = depthToStopDepth(diver.deepestToleratedDepth);
    if (nextStopDepth < currentStopDepth) {
      const stop = {
        d: currentStopDepth,
        // Included ascent time is in seconds, round up to the nearest minute
        t: Math.round(currentStopTime),
        g: diver.currentGas
      };
      decoProfile.addStop(stop);
      currentStopDepth = nextStopDepth;
      currentStopTime = 0;
    }
  }
  return decoProfile;
}
