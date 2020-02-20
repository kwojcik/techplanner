import Diver from "./diver";
import { Minute, CompartmentNumber, Depth, Profile } from "./types";
import { calculateDecoProfile } from "./profile";

const profile = [{ d: 21.1, t: 60 }];

const diver = new Diver(0.75, 0, {
  pn2: 0.75 / 3.11,
  phe2: 2.36 / 3.11
});
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
console.log(pigtpartials);
console.log(pigts);
console.log(pats);

const decoProfile = calculateDecoProfile(diver);
console.log(decoProfile);
