//import Compartment from "../compartment";
import Compartment from "../compartment";
import { CompartmentNumber, Pressure, BreathingGas, Minute } from "../types";

describe("compartment", () => {
  type CompartmentTestCase = {
    n: CompartmentNumber;
    pn2: Pressure;
    phe2: Pressure;
    pigt: Pressure;
    pat: Pressure;
  };
  function runTests(
    gas: BreathingGas,
    time: Minute,
    expectations: CompartmentTestCase[]
  ) {
    for (let i = 0; i < expectations.length; i++) {
      const c = new Compartment(0.75, 0, expectations[i].n);
      c.expose(gas, time);
      expect(c.pn2).toBeCloseTo(expectations[i].pn2, 1);
      expect(c.phe2).toBeCloseTo(expectations[i].phe2, 1);
      expect(c.pigt).toBeCloseTo(expectations[i].pigt, 1);
      expect(c.pat).toBeLessThanOrEqual(expectations[i].pat);
    }
  }
  it("matches buhlmann table 23 air", () => {
    const expectations: CompartmentTestCase[] = [
      { n: 2, pn2: 3.03, phe2: 0, pigt: 3.03, pat: 1.7 },
      { n: 3, pn2: 2.86, phe2: 0, pigt: 2.86, pat: 1.7 },
      { n: 4, pn2: 2.62, phe2: 0, pigt: 2.62, pat: 1.6 },
      { n: 5, pn2: 2.34, phe2: 0, pigt: 2.34, pat: 1.5163 } // buhlmann says 1.5
    ];
    runTests({ pn2: 3.11, phe2: 0 }, 60, expectations);
  });
  it("matches buhlmann heliair", () => {
    const c = new Compartment(0.75, 0, 2);
    const expectations: CompartmentTestCase[] = [
      { n: 4, pn2: 0.16, phe2: 3.06, pigt: 3.22, pat: 2.1 },
      { n: 5, pn2: 0.24, phe2: 2.95, pigt: 3.19, pat: 2.3 },
      { n: 6, pn2: 0.34, phe2: 2.72, pigt: 3.06, pat: 2.3 },
      { n: 7, pn2: 0.44, phe2: 2.33, pigt: 2.77, pat: 2.1 }
    ];
    runTests({ pn2: 0, phe2: 3.11 }, 60, expectations);
  });
  it("matches buhlmann table 23 trimix", () => {
    const c = new Compartment(0.75, 0, 2);
    const expectations: CompartmentTestCase[] = [
      { n: 4, pn2: 0.75, phe2: 2.32, pigt: 3.07, pat: 2.0 },
      { n: 5, pn2: 0.75, phe2: 2.24, pigt: 2.99, pat: 2.1 },
      { n: 6, pn2: 0.75, phe2: 2.07, pigt: 2.82, pat: 2.1 },
      { n: 7, pn2: 0.75, phe2: 1.77, pigt: 2.52, pat: 1.9 }
    ];
    runTests({ pn2: 0.75, phe2: 2.36 }, 60, expectations);
  });
});
