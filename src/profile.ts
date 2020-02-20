import { Depth, Profile, Minute } from "./types";
import Diver from "./diver";

//const tDelta: Minute = 1.0 / 60; // 1 second
//const ascentRate: DepthChangeRate = 10; // 10 meters/minute
//const descentRate: DepthChangeRate = 10; // 10 meters/minute

// Generate decompression profile
const stopDepthDelta = 3;
export function depthToStopDepth(depth: Depth): Depth {
  return Math.round(
    depth + ((stopDepthDelta - (depth % stopDepthDelta)) % stopDepthDelta)
  );
}

export function calculateDecoProfile(diver: Diver): Profile {
  const decoProfile: Profile = [];
  let currentStopDepth: Depth = depthToStopDepth(diver.deepestToleratedDepth);
  let currentStopTime: Minute = 0;
  while (currentStopDepth > 0) {
    currentStopTime += 1;
    diver.expose([{ d: currentStopDepth, t: currentStopTime }]);

    const nextStopDepth = depthToStopDepth(diver.deepestToleratedDepth);
    if (nextStopDepth != currentStopDepth) {
      decoProfile.push({ d: currentStopDepth, t: currentStopTime });
      currentStopDepth = nextStopDepth;
      currentStopTime = 0;
    }
  }
  return decoProfile;
}
