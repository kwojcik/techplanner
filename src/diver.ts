import { max, min } from "lodash";
import Compartment from "./compartment";
import { Pressure, Profile, InspiredGas, BreathingGas, Depth } from "./types";
import { barMSW, ATM } from "./constants";

export default class Diver {
  compartments: Compartment[] = [];
  breathingGases: BreathingGas[];
  selectedGas = 0; // What is the Integer type?
  atm: Pressure;
  depth: Depth;
  ppo2Deco: Pressure = 1.6;

  constructor(
    pn2: Pressure,
    phe2: Pressure,
    breathingGases: BreathingGas[],
    options: {
      // allow ambient pressure to be set for safety or altitude
      atm: Pressure;
    } = { atm: ATM }
  ) {
    for (let i = 0; i < 16; i++) {
      this.compartments.push(new Compartment(pn2, phe2, i));
    }
    this.breathingGases = breathingGases;
    this.atm = options.atm;
  }
  expose(profile: Profile) {
    for (let i = 0; i < profile.length; i++) {
      const currentStep = profile[i];
      const gasAtPressure: InspiredGas = {
        pn2:
          (this.currentGas.percentn2 / 100.0) *
          (currentStep.d * barMSW + this.atm),
        phe2:
          (this.currentGas.percenthe2 / 100.0) *
          (currentStep.d * barMSW + this.atm)
      };
      this.compartments.forEach(c => c.expose(gasAtPressure, currentStep.t));
      this.depth = currentStep.d;
    }
  }
  get currentGas() {
    return this.breathingGases[this.selectedGas];
  }
  get deepestToleratedDepth(): Depth {
    const depths = this.compartments.map(c => c.depthTolerated(this.atm));
    const deepest = max(depths);
    return Math.round(deepest);
  }

  selectBestDecoGas() {
    // TODO only works for nitrox
    let minpn2 = this.breathingGases[0].percentn2;
    for (let i = 0; i < this.breathingGases.length; i++) {
      if (
        this.breathingGases[i].percentn2 < minpn2 &&
        (1.0 - this.breathingGases[i].percentn2 / 100.0) *
          (this.depth * barMSW + 1) <=
          this.ppo2Deco
      ) {
        this.selectedGas = i;
        minpn2 = this.breathingGases[i].percentn2;
      }
    }
  }
}
