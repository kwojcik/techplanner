import Diver from "./diver";
import { Minute, CompartmentNumber, Depth } from "./types";
import Profile, { calculateDecoProfile } from "./profile";

const profile = new Profile([{ d: 21.1, t: 60 }]);

const diver = new Diver(0.75, 0, [
  {
    gas: {
      percentn2: 0.75 / 3.11,
      percenthe2: 2.36 / 3.11,
    },
    volume: 12,
    fullPressure: 300,
    currentPressure: 300,
  }
],
  5
);

diver.expose(profile);

const compartmentsToSimulate: CompartmentNumber[] = [4, 5, 6, 7];
const pigtpartials = [];
const pats = [];
const pigts = [];
for (let i = 0; i < compartmentsToSimulate.length; i++) {
  const c = diver.compartments[compartmentsToSimulate[i]];
  pigtpartials.push({ n2: c.pn2, he2: c.phe2 });
  pats.push(c.pat);
  pigts.push(c.pigt);
}

const decoProfile = calculateDecoProfile(diver);
