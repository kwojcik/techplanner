const hts = {
  n2: [
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
  ],
  he2: [1, 3, 4.6, 7, 10, 14, 20, 30, 43, 55, 70, 90, 115, 150, 190, 240]
};
const as = {
  n2: [
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
  ],
  he2: [
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
  ]
};
const bs = {
  n2: [
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
  ],
  he2: [
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
  ]
};
const pwater = 0.063;
function calcPIGT({
  pigtt0,
  piig,
  t,
  ht
}: {
  pigtt0: number;
  piig: number;
  t: number;
  ht: number;
}): number {
  return (
    pigtt0 +
    (piig - pwater - pigtt0) * (1 - Math.pow(Math.E, (-Math.LN2 * t) / ht))
  );
}

function calcA({
  pn2,
  phe2,
  compartment
}: {
  pn2: number;
  phe2: number;
  compartment: number;
}): number {
  return (phe2 * as.he2[compartment] + pn2 * as.n2[compartment]) / (phe2 + pn2);
}
function calcB({
  pn2,
  phe2,
  compartment
}: {
  pn2: number;
  phe2: number;
  compartment: number;
}): number {
  return (phe2 * bs.he2[compartment] + pn2 * bs.n2[compartment]) / (phe2 + pn2);
}

function calcPAT({
  pigt,
  a,
  b
}: {
  pigt: number;
  a: number;
  b: number;
}): number {
  return (pigt - a) * b;
}

const compartments = [4, 5, 6, 7];
const pigtPartials = [];
const pigts = [];
const pats = [];
const pn2 = 0.75;
const phe2 = 2.36;
for (let i = 0; i < compartments.length; i++) {
  pigtPartials.push({
    n2: calcPIGT({
      pigtt0: 0.75,
      piig: pn2 + 0.063,
      t: 60,
      ht: hts.n2[compartments[i]]
    }),
    he2: calcPIGT({
      pigtt0: 0.0,
      piig: phe2 + 0.063,
      t: 60,
      ht: hts.he2[compartments[i]]
    })
  });
  pigts.push(pigtPartials[i].n2 + pigtPartials[i].he2);
  pats.push(
    calcPAT({
      pigt: pigts[i],
      a: calcA({
        pn2: pigtPartials[i].n2,
        phe2: pigtPartials[i].he2,
        compartment: compartments[i]
      }),
      b: calcB({
        pn2: pigtPartials[i].n2,
        phe2: pigtPartials[i].he2,
        compartment: compartments[i]
      })
    })
  );
}
console.log(pigtPartials);
console.log(pigts);
console.log(pats);
