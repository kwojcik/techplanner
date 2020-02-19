const n2HTs: HalfTime[] = [
  2.65,
  7.94,
  12.2,
  18.5,
  26.5,
  37,
  53,
  79,
  114,
  146,
  185,
  238,
  304,
  397,
  503,
  635
];

const he2HTs: HalfTime[] = [
  1,
  3,
  4.6,
  7,
  10,
  14,
  20,
  30,
  43,
  55,
  70,
  90,
  115,
  150,
  190,
  240
];

const n2As: AValue[] = [
  2.2,
  1.5,
  1.08,
  0.9,
  0.75,
  0.58,
  0.47,
  0.455,
  0.455,
  0.455,
  0.38,
  0.255,
  0.255,
  0.255,
  0.255
];
const he2As: AValue[] = [
  2.2,
  1.5,
  1.08,
  0.9,
  0.75,
  0.58,
  0.47,
  0.455,
  0.455,
  0.515,
  0.515,
  0.515,
  0.515,
  0.515,
  0.515,
  0.515
];

const n2Bs: BValue[] = [
  0.82,
  0.82,
  0.825,
  0.835,
  0.845,
  0.86,
  0.87,
  0.89,
  0.89,
  0.934,
  0.934,
  0.944,
  0.962,
  0.962,
  0.962,
  0.962
];
const he2Bs: BValue[] = [
  0.82,
  0.82,
  0.825,
  0.835,
  0.845,
  0.86,
  0.87,
  0.89,
  0.89,
  0.926,
  0.926,
  0.926,
  0.926,
  0.926,
  0.926,
  0.926
];

const pwater: Pressure = 0.063;

function calcPIGT({
  pigtt0,
  piig,
  t,
  ht
}: {
  pigtt0: Pressure;
  piig: Pressure;
  t: Time;
  ht: HalfTime;
}): Pressure {
  return (
    pigtt0 +
    (piig - pwater - pigtt0) * (1 - Math.pow(Math.E, (-Math.LN2 * t) / ht))
  );
}

type HalfTime = number;
type Time = number;
type Depth = number;
type Pressure = number;
type AValue = number;
type BValue = number;
type CompartmentNumber = number;
type BreathingGas = {
  pn2: Pressure;
  phe2: Pressure;
};
class Compartment {
  pn2: number;
  phe2: number;
  num: CompartmentNumber;

  constructor(pn2: Pressure, phe2: Pressure, num: CompartmentNumber) {
    this.pn2 = pn2;
    this.phe2 = phe2;
    this.num = num;
  }

  expose(gas: BreathingGas, t: Time): void {
    this.pn2 = calcPIGT({
      pigtt0: this.pn2,
      piig: gas.pn2 + pwater,
      t: t,
      ht: n2HTs[this.num]
    });
    this.phe2 = calcPIGT({
      pigtt0: this.phe2,
      piig: gas.phe2 + pwater,
      t: t,
      ht: he2HTs[this.num]
    });
  }

  get pigt(): Pressure {
    return this.pn2 + this.phe2;
  }
  get pat(): Pressure {
    return (this.pigt - this.a) * this.b;
  }
  get a(): AValue {
    return (
      (this.phe2 * he2As[this.num] + this.pn2 * n2As[this.num]) /
      (this.phe2 + this.pn2)
    );
  }
  get b(): BValue {
    return (
      (this.phe2 * he2Bs[this.num] + this.pn2 * n2Bs[this.num]) /
      (this.phe2 + this.pn2)
    );
  }
}
const compartments: Compartment[] = [];
for (let i = 0; i < 16; i++) {
  compartments.push(new Compartment(0.75, 0, i));
}
const bGas: BreathingGas = {
  pn2: 0.75,
  phe2: 2.36
};
for (let i = 0; i < compartments.length; i++) {
  compartments[i].expose(bGas, 60);
}

const compartmentsToSimulate: CompartmentNumber[] = [4, 5, 6, 7];
const pigtpartials = [];
const pats = [];
const pigts = [];
for (let i = 0; i < compartmentsToSimulate.length; i++) {
  const c = compartments[compartmentsToSimulate[i]];
  pigtpartials.push({ n2: c.pn2, he2: c.phe2 });
  pats.push(c.pat);
  pigts.push(c.pigt);
}
console.log(pigtpartials);
console.log(pigts);
console.log(pats);
