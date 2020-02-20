import { max } from "lodash";
import Compartment from "./compartment";
import { Pressure, Profile, BreathingGas, Depth } from "./types";
import { barMSW, ATM } from "./constants";

export default class Diver {
  compartments: Compartment[] = [];
  breathingGas: BreathingGas;
  atm: Pressure;
  depth: Depth;

  constructor(
    pn2: Pressure,
    phe2: Pressure,
    breathingGas: BreathingGas,
    options: {
      // allow ambient pressure to be set for safety or altitude
      atm: Pressure;
    } = { atm: ATM }
  ) {
    for (let i = 0; i < 16; i++) {
      this.compartments.push(new Compartment(pn2, phe2, i));
    }
    this.breathingGas = breathingGas;
    this.atm = options.atm;
  }
  expose(profile: Profile) {
    for (let i = 0; i < profile.length; i++) {
      const currentStep = profile[i];
      const gasAtPressure: BreathingGas = {
        pn2: this.currentGas.pn2 * (currentStep.d * barMSW + this.atm),
        phe2: this.currentGas.phe2 * (currentStep.d * barMSW + this.atm)
      };
      this.compartments.forEach(c => c.expose(gasAtPressure, currentStep.t));
      this.depth = currentStep.d;
    }
  }
  get currentGas() {
    return this.breathingGas;
  }
  get deepestToleratedDepth(): Depth {
    const depths = this.compartments.map(c => c.depthTolerated(this.atm));
    const deepest = max(depths);
    return Math.round(deepest);
    if (deepest <= 0.5) {
      return 0;
    }
    return deepest;
  }
}
