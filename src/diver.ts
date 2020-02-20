import { max } from "lodash";
import Compartment from "./compartment";
import { Pressure, Profile, BreathingGas, Depth } from "./types";
import { barMSW, ATM } from "./constants";

export default class Diver {
  compartments: Compartment[] = [];
  breathingGas: BreathingGas;

  constructor(pn2: Pressure, phe2: Pressure, breathingGas: BreathingGas) {
    for (let i = 0; i < 16; i++) {
      this.compartments.push(new Compartment(pn2, phe2, i));
    }
    this.breathingGas = breathingGas;
  }
  expose(profile: Profile) {
    for (let i = 0; i < profile.length; i++) {
      const currentStep = profile[i];
      const gasAtPressure: BreathingGas = {
        pn2: this.currentGas.pn2 * (currentStep.d * barMSW + ATM),
        phe2: this.currentGas.phe2 * (currentStep.d * barMSW + ATM)
      };
      this.compartments.forEach(c => c.expose(gasAtPressure, currentStep.t));
    }
  }
  get currentGas() {
    return this.breathingGas;
  }
  get deepestToleratedDepth(): Depth {
    const depths = this.compartments.map(c => c.depthTolerated);
    const deepest = max(depths);
    return deepest;
  }
}
