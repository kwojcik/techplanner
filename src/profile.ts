import { Depth, Profile, Minute } from "./types";
import Diver from "./diver";

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
const ascentRate = 10; // 10 meters/min
function ascend(diver: Diver, destDepth: Depth) {
  if (diver.depth === destDepth) {
    return;
  }

  const ascentProfile: Profile = [];
  let currentDepth = diver.depth;
  while (Math.abs(currentDepth - destDepth) > 0.0000001) {
    currentDepth -= timeDelta * ascentRate;
    ascentProfile.push({ d: currentDepth, t: timeDelta });
  }
  diver.expose(ascentProfile);
}

export function calculateDecoProfile(diver: Diver): Profile {
  const decoProfile: Profile = [];
  let currentStopTime: Minute = 0;
  let currentStopDepth: Depth = depthToStopDepth(diver.deepestToleratedDepth);

  while (currentStopDepth > 0) {
    // Ascend to the next step. Deco may be gone by the time we get there
    while (Math.abs(diver.depth - currentStopDepth) > 0.000001) {
      ascend(diver, currentStopDepth);
      currentStopDepth = depthToStopDepth(diver.deepestToleratedDepth);
    }

    currentStopTime += 1;
    diver.expose([{ d: currentStopDepth, t: 1 }]);

    const nextStopDepth = depthToStopDepth(diver.deepestToleratedDepth);
    if (nextStopDepth < currentStopDepth) {
      decoProfile.push({ d: currentStopDepth, t: currentStopTime });
      currentStopDepth = nextStopDepth;
      currentStopTime = 0;
    }
  }
  return decoProfile;
}
