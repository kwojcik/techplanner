import { max } from "lodash";
import Compartment from "./compartment";
import { Pressure, InspiredGas, BreathingGas, Depth, Minute, Tank } from "./types";
import { barMSW, ATM } from "./constants";
import Profile from './profile'

export type HistoryPoint = {
  depth: Depth;
  t: Minute;
  ceiling: Depth;
  gas: BreathingGas
}

export default class Diver {
  compartments: Compartment[] = [];
  tanks: Tank[];
  selectedTank: number = 0;
  atm: Pressure;
  depth: Depth;
  ppo2Deco: Pressure = 1.6;
  history: HistoryPoint[]
  runtime: number;
  sac: number;

  constructor(
    pn2: Pressure,
    phe2: Pressure,
    tanks: Tank[],
    sac: number,
    options: {
      // allow ambient pressure to be set for safety or altitude
      atm: Pressure,
      depth: Depth,
    } = { atm: ATM, depth: 0 }
  ) {
    for (let i = 0; i < 16; i++) {
      this.compartments.push(new Compartment(pn2, phe2, i));
    }
    this.tanks = tanks
    this.atm = options.atm;
    this.sac = sac;
    this.depth = options.depth
    this.history = [{ depth: this.depth, t: 0, ceiling: this.deepestToleratedDepth, gas: this.currentGas }]
    this.runtime = 0
  }
  expose(profile: Profile) {
    for (let i = 0; i < profile.stops.length; i++) {
      const currentStep = profile.stops[i];
      for (let minuteOfStop = 0; minuteOfStop < currentStep.t; minuteOfStop++) {
        const timeAtStep = (currentStep.t < 1 || currentStep.t - minuteOfStop < 0) ? currentStep.t : 1
        const gasAtPressure: InspiredGas = {
          pn2:
            (this.currentGas.percentn2 / 100.0) *
            (currentStep.d * barMSW + this.atm),
          phe2:
            (this.currentGas.percenthe2 / 100.0) *
            (currentStep.d * barMSW + this.atm)
        };
        this.compartments.forEach(c => c.expose(gasAtPressure, timeAtStep));
        this.depth = currentStep.d;
        this.runtime += timeAtStep
        this.history.push({ depth: this.depth, t: this.runtime, ceiling: this.deepestToleratedDepth, gas: this.currentGas })
      }
    }
  }

  getHistoryAt(t: Minute) {
    for (let i = 0; i < this.history.length; i++) {
      if (this.history[i].t >= t) {
        return this.history[i]
      }
    }
    return this.history[this.history.length - 1]
  }

  get currentGas() {
    return this.tanks[this.selectedTank].gas;
  }
  get deepestToleratedDepth(): Depth {
    const depths = this.compartments.map(c => c.depthTolerated(this.atm));
    const deepest = max(depths) || 0;
    return Math.round(deepest);
  }

  selectBestDecoGas() {
    // TODO only works for nitrox
    let minpn2 = this.tanks[0].gas.percentn2;
    for (let i = 0; i < this.tanks.length; i++) {
      if (
        this.tanks[i].gas.percentn2 < minpn2 &&
        (1.0 - this.tanks[i].gas.percentn2 / 100.0) *
        (this.depth * barMSW + 1) <=
        this.ppo2Deco
      ) {
        this.selectedTank = i;
        minpn2 = this.tanks[i].gas.percentn2;
      }
    }
  }
}
