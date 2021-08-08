import {
  Pressure,
  Minute,
  HalfTime,
  CompartmentNumber,
  InspiredGas,
  AValue,
  BValue,
  Depth
} from "./types";
import {
  getA,
  getB,
} from "./constants/zhl16c";
import { pwater, barMSW } from './constants'
import { n2HTs } from "./constants/zhl16a";

function calcPIGT({
  pigtt0,
  piig,
  t,
  ht
}: {
  pigtt0: Pressure;
  piig: Pressure;
  t: Minute;
  ht: HalfTime;
}): Pressure {
  return (
    pigtt0 +
    (piig - pwater - pigtt0) * (1.0 - Math.pow(Math.E, (-Math.LN2 * t) / ht))
  );
}

export default class Compartment {
  pn2: number;
  phe2: number;
  num: CompartmentNumber;

  constructor(pn2: Pressure, phe2: Pressure, num: CompartmentNumber) {
    this.pn2 = pn2;
    this.phe2 = phe2;
    this.num = num;
  }

  expose(gas: InspiredGas, t: Minute): void {
    this.pn2 = calcPIGT({
      pigtt0: this.pn2,
      piig: gas.pn2 + pwater,
      t: t,
      ht: n2HTs[this.num]
    });
    /*
    this.phe2 = calcPIGT({
      pigtt0: this.phe2,
      piig: gas.phe2 + pwater,
      t: t,
      ht: he2HTs[this.num]
    });
    */
  }

  get pigt(): Pressure {
    return this.pn2 + this.phe2;
  }
  get pat(): Pressure {
    return (this.pigt - this.a) * this.b;
  }
  get a(): AValue {
    return (
      /*this.phe2 * he2As[this.num] +*/ (this.pn2 * getA(this.num)) /
      (this.phe2 + this.pn2)
    );
  }
  get b(): BValue {
    return (
      /*this.phe2 * he2Bs[this.num] +*/ (this.pn2 * getB(this.num)) /
      (this.phe2 + this.pn2)
    );
  }

  depthTolerated(atm: Pressure): Depth {
    const depth = Math.max(this.pat - atm, 0) / barMSW;
    return depth;
  }
}
