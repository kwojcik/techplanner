import { depthToStopDepth, calculateDecoProfile } from "../profile";
import { BreathingGas, ProfileStop } from "../types";
import Profile from '../profile'
import Diver from "../diver";
import { toMatchDecoProfile } from "./helpers";

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchDecoProfile(expected: Profile): R;
    }
  }
}
expect.extend({
  toMatchDecoProfile
});

function genP(nums: number[]): ProfileStop[] {
  const p = new Profile();
  expect(nums.length % 2).toEqual(0);
  for (let i = 0; i < nums.length; i += 2) {
    p.addStop({ d: nums[i], t: nums[i + 1] });
  }
  return p.stops;
}
describe("profile", () => {
  describe("depthToStopDepth", () => {
    it("calculates correct stop depths", () => {
      expect(depthToStopDepth(0)).toBe(0);
      expect(depthToStopDepth(1)).toBe(3);
      expect(depthToStopDepth(2)).toBe(3);
      expect(depthToStopDepth(3)).toBe(3);
      expect(depthToStopDepth(4)).toBe(6);
      expect(depthToStopDepth(5)).toBe(6);
      expect(depthToStopDepth(6)).toBe(6);
      expect(depthToStopDepth(7)).toBe(9);
      expect(depthToStopDepth(8)).toBe(9);
      expect(depthToStopDepth(9)).toBe(9);
      expect(depthToStopDepth(10)).toBe(12);
    });
  });
  describe("calculateDecoProfile", () => {
    function runTest(
      diveProfile: ProfileStop[],
      expectedDecoProfile: ProfileStop[],
      expectedCnsO2: number | null,
      breathingGases: BreathingGas[]
    ) {
      const tanks = breathingGases.map(gas => ({ gas: gas, volume: 12, fullPressure: 300, currentPressure: 300 }))
      const diver = new Diver(0.79, 0, tanks, 5, { atm: 1.0, depth: 0, cnso2: 0 });
      diver.expose(new Profile(diveProfile));
      const calculatedDecoProfile = calculateDecoProfile(diver);
      if (expectedCnsO2 !== null) {
        expect(diver.cnso2).toBeCloseTo(expectedCnsO2, 1)
      }
      expect(calculatedDecoProfile.stops).toMatchDecoProfile(expectedDecoProfile);

    }
    describe("on air", () => {
      const gases = [{ percentn2: 79, percenthe2: 0 }];
      /* 9 meters */
      it("air 9 meters 300 minutes", () => {
        runTest([{ d: 9, t: 300 }], [], 0, gases);
      });

      /* 12 meters */
      it("air 12 meters 120 minute", () => {
        runTest([{ d: 12, t: 120 }], [], 0, gases);
      });
      it("air 12 meters 150 minute", () => {
        runTest([{ d: 12, t: 150 }], [], 0, gases);
      });
      it("air 12 meters 180 minute", () => {
        runTest([{ d: 12, t: 180 }], [], 0, gases);
      });
      it("air 12 meters 210 minute", () => {
        runTest([{ d: 12, t: 210 }], genP([3, 5]), 0, gases);
      });
      it("air 12 meters 240 minute", () => {
        runTest([{ d: 12, t: 240 }], genP([3, 11]), 0, gases);
      });
      it("air 12 meters 270 minute", () => {
        runTest([{ d: 12, t: 270 }], genP([3, 16]), 0, gases);
      });
      it("air 12 meters 300 minute", () => {
        runTest([{ d: 12, t: 300 }], genP([3, 22]), 0, gases);
      });

      /* 15 meters */
      it("air 15 meters 60 minutes", () => {
        runTest([{ d: 15, t: 60 }], [], null, gases);
      });
      it("air 15 meters 90 minutes", () => {
        runTest([{ d: 15, t: 90 }], genP([3, 1]), null, gases);
      });
      it("air 15 meters 120 minutes", () => {
        runTest([{ d: 15, t: 120 }], genP([3, 10]), null, gases);
      });
      it("air 15 meters 150 minutes", () => {
        runTest([{ d: 15, t: 150 }], genP([3, 18]), null, gases);
      });
      it("air 15 meters 180 minutes", () => {
        runTest([{ d: 15, t: 180 }], genP([3, 30]), null, gases);
      });
      it("air 15 meters 210 minutes", () => {
        runTest([{ d: 15, t: 210 }], genP([3, 39]), null, gases);
      });

      /* 18 meters */

      it("air 18 meters 59 minutes", () => {
        runTest([{ d: 18, t: 59 }], [], null, gases);
      });
      it("air 18 meters 60 minutes", () => {
        runTest([{ d: 18, t: 60 }], genP([3, 1]), null, gases);
      });
      it("air 18 meters 70 minutes", () => {
        runTest([{ d: 18, t: 70 }], genP([3, 6]), null, gases);
      });
      it("air 18 meters 80 minutes", () => {
        runTest([{ d: 18, t: 80 }], genP([3, 10]), null, gases);
      });
      it("air 18 meters 90 minutes", () => {
        runTest([{ d: 18, t: 90 }], genP([3, 14]), null, gases);
      });
      it("air 18 meters 100 minutes", () => {
        runTest([{ d: 18, t: 100 }], genP([3, 19]), null, gases);
      });
      it("air 18 meters 110 minutes", () => {
        runTest([{ d: 18, t: 110 }], genP([3, 24]), null, gases);
      });
      it("air 18 meters 120 minutes", () => {
        runTest([{ d: 18, t: 120 }], genP([3, 28]), null, gases);
      });
      it("air 18 meters 130 minutes", () => {
        runTest([{ d: 18, t: 130 }], genP([3, 35]), null, gases);
      });
      it("air 18 meters 140 minutes", () => {
        runTest([{ d: 18, t: 140 }], genP([6, 1, 3, 40]), null, gases);
      });
      it("air 18 meters 150 minutes", () => {
        runTest([{ d: 18, t: 150 }], genP([6, 1, 3, 44]), null, gases);
      });
      it("air 18 meters 160 minutes", () => {
        runTest([{ d: 18, t: 160 }], genP([6, 5, 3, 46]), null, gases);
      });
      it("air 18 meters 170 minutes", () => {
        runTest([{ d: 18, t: 170 }], genP([6, 7, 3, 51]), null, gases);
      });
      it("air 18 meters 180 minutes", () => {
        runTest([{ d: 18, t: 180 }], genP([6, 9, 3, 56]), null, gases);
      });
      it("air 18 meters 190 minutes", () => {
        runTest([{ d: 18, t: 190 }], genP([6, 10, 3, 60]), null, gases);
      });
      it("air 18 meters 200 minutes", () => {
        runTest([{ d: 18, t: 200 }], genP([6, 11, 3, 65]), null, gases);
      });

      /* 35 meters */
      it("air 35 meters 25 minutes", () => {
        runTest([{ d: 35, t: 25 }], genP([6, 2, 3, 8]), null, gases);
      });
      it("air 35 meters 50 minutes", () => {
        runTest([{ d: 35, t: 50 }], genP([9, 5, 6, 16, 3, 30]), null, gases);
      });
      it("air 35 meters 100 minutes", () => {
        runTest(
          [{ d: 35, t: 100 }],
          genP([12, 12, 9, 24, 6, 41, 3, 84]),
          null, gases
        );
      });

      /* 50 meters */
      it("air 50 meters 5 minutes", () => {
        runTest([{ d: 50, t: 5 }], [], null, gases);
      });
      it("air 50 meters 10 minutes", () => {
        runTest([{ d: 50, t: 10 }], genP([6, 1, 3, 3]), null, gases);
      });
      it("air 50 meters 15 minutes", () => {
        runTest([{ d: 50, t: 15 }], genP([9, 1, 6, 3, 3, 7]), null, gases);
      });
      it("air 50 meters 25 minutes", () => {
        runTest([{ d: 50, t: 25 }], genP([12, 2, 9, 5, 6, 9, 3, 21]), null, gases);
      });
      it("air 50 meters 50 minutes", () => {
        runTest(
          [{ d: 50, t: 50 }],
          genP([18, 1, 15, 6, 12, 10, 9, 18, 6, 29, 3, 59]),
          null, gases
        );
      });
      it("air 50 meters 100 minutes", () => {
        runTest(
          [{ d: 50, t: 100 }],
          genP([21, 8, 18, 14, 15, 20, 12, 29, 9, 44, 6, 83, 3, 187]),
          null, gases
        );
      });
    });
    describe("on air + oxy deco", () => {
      const gases = [
        { percentn2: 79, percenthe2: 0 },
        { percentn2: 0, percenthe2: 0 }
      ];
      /* 9 meters */
      it("air+oxy 9 meters 300 minutes", () => {
        runTest([{ d: 9, t: 300 }], [], null, gases);
      });

      /* 12 meters */
      it("air+oxy 12 meters 120 minute", () => {
        runTest([{ d: 12, t: 120 }], [], null, gases);
      });
      it("air+oxy 12 meters 150 minute", () => {
        runTest([{ d: 12, t: 150 }], [], null, gases);
      });
      it("air+oxy 12 meters 180 minute", () => {
        runTest([{ d: 12, t: 180 }], [], null, gases);
      });
      it("air+oxy 12 meters 210 minute", () => {
        runTest([{ d: 12, t: 210 }], genP([3, 3]), null, gases);
      });
      it("air+oxy 12 meters 240 minute", () => {
        runTest([{ d: 12, t: 240 }], genP([3, 5]), null, gases);
      });
      it("air+oxy 12 meters 270 minute", () => {
        runTest([{ d: 12, t: 270 }], genP([3, 7]), null, gases);
      });
      it("air+oxy 12 meters 300 minute", () => {
        runTest([{ d: 12, t: 300 }], genP([3, 8]), null, gases);
      });

      /* 15 meters */
      it("air+oxy 15 meters 60 minutes", () => {
        runTest([{ d: 15, t: 60 }], [], null, gases);
      });
      it("air+oxy 15 meters 90 minutes", () => {
        runTest([{ d: 15, t: 90 }], genP([3, 1]), null, gases);
      });
      it("air+oxy 15 meters 120 minutes", () => {
        runTest([{ d: 15, t: 120 }], genP([3, 4]), null, gases);
      });
      it("air+oxy 15 meters 150 minutes", () => {
        runTest([{ d: 15, t: 150 }], genP([3, 8]), null, gases);
      });
      it("air+oxy 15 meters 180 minutes", () => {
        runTest([{ d: 15, t: 180 }], genP([3, 11]), null, gases);
      });
      it("air+oxy 15 meters 210 minutes", () => {
        runTest([{ d: 15, t: 210 }], genP([3, 15]), null, gases);
      });

      /* 18 meters */

      it("air+oxy 18 meters 59 minutes", () => {
        runTest([{ d: 18, t: 59 }], [], null, gases);
      });
      it("air+oxy 18 meters 60 minutes", () => {
        runTest([{ d: 18, t: 60 }], genP([3, 1]), null, gases);
      });
      it("air+oxy 18 meters 70 minutes", () => {
        runTest([{ d: 18, t: 70 }], genP([3, 3]), null, gases);
      });
      it("air+oxy 18 meters 80 minutes", () => {
        runTest([{ d: 18, t: 80 }], genP([3, 5]), null, gases);
      });
      it("air+oxy 18 meters 90 minutes", () => {
        runTest([{ d: 18, t: 90 }], genP([3, 7]), null, gases);
      });
      it("air+oxy 18 meters 100 minutes", () => {
        runTest([{ d: 18, t: 100 }], genP([3, 9]), null, gases);
      });
      it("air+oxy 18 meters 110 minutes", () => {
        runTest([{ d: 18, t: 110 }], genP([3, 10]), null, gases);
      });
      it("air+oxy 18 meters 120 minutes", () => {
        runTest([{ d: 18, t: 120 }], genP([3, 12]), null, gases);
      });
      it("air+oxy 18 meters 130 minutes", () => {
        runTest([{ d: 18, t: 130 }], genP([3, 13]), null, gases);
      });
      it("air+oxy 18 meters 140 minutes", () => {
        runTest([{ d: 18, t: 140 }], genP([6, 1, 3, 16]), null, gases);
      });
      it("air+oxy 18 meters 150 minutes", () => {
        runTest([{ d: 18, t: 150 }], genP([6, 1, 3, 18]), null, gases);
      });
      it("air+oxy 18 meters 160 minutes", () => {
        runTest([{ d: 18, t: 160 }], genP([6, 2, 3, 19]), null, gases);
      });
      it("air+oxy 18 meters 170 minutes", () => {
        runTest([{ d: 18, t: 170 }], genP([6, 3, 3, 19]), null, gases);
      });
      it("air+oxy 18 meters 180 minutes", () => {
        runTest([{ d: 18, t: 180 }], genP([6, 4, 3, 20]), null, gases);
      });
      it("air+oxy 18 meters 190 minutes", () => {
        runTest([{ d: 18, t: 190 }], genP([6, 4, 3, 22]), null, gases);
      });
      it("air+oxy 18 meters 200 minutes", () => {
        runTest([{ d: 18, t: 200 }], genP([6, 5, 3, 24]), null, gases);
      });

      /* 35 meters */
      it("air+oxy 35 meters 25 minutes", () => {
        runTest([{ d: 35, t: 25 }], genP([6, 2, 3, 4]), null, gases);
      });
      it("air+oxy 35 meters 50 minutes", () => {
        runTest([{ d: 35, t: 50 }], genP([9, 5, 6, 7, 3, 12]), null, gases);
      });
      it("air+oxy 35 meters 100 minutes", () => {
        runTest(
          [{ d: 35, t: 100 }],
          genP([12, 12, 9, 24, 6, 16, 3, 28]),
          null, gases
        );
      });

      /* 50 meters */
      it("air+oxy 50 meters 5 minutes", () => {
        runTest([{ d: 50, t: 5 }], [], null, gases);
      });
      it("air+oxy 50 meters 10 minutes", () => {
        runTest([{ d: 50, t: 10 }], genP([6, 1, 3, 1]), null, gases);
      });
      it("air+oxy 50 meters 15 minutes", () => {
        runTest([{ d: 50, t: 15 }], genP([9, 1, 6, 2, 3, 3]), null, gases);
      });
      it("air+oxy 50 meters 25 minutes", () => {
        runTest([{ d: 50, t: 25 }], genP([12, 2, 9, 5, 6, 5, 3, 9]), null, gases);
      });
      it("air+oxy 50 meters 50 minutes", () => {
        runTest(
          [{ d: 50, t: 50 }],
          genP([18, 1, 15, 6, 12, 10, 9, 18, 6, 13, 3, 20]),
          null, gases
        );
      });
      it("air+oxy 50 meters 100 minutes", () => {
        runTest(
          [{ d: 50, t: 100 }],
          genP([21, 8, 18, 14, 15, 20, 12, 29, 9, 44, 6, 29, 3, 53]),
          null, gases
        );
      });
    });
    describe("air + nitrox + oxy", () => {
      const gases = [
        { percentn2: 79, percenthe2: 0 },
        { percentn2: 37, percenthe2: 0 },
        { percentn2: 0, percenthe2: 0 }
      ];
      /* 35 meters */
      it("air+nitrox+oxy 35 meters 25 minutes", () => {
        runTest([{ d: 35, t: 25 }], genP([6, 1, 3, 3]), null, gases);
      });
      it("air+nitrox+oxy 35 meters 50 minutes", () => {
        runTest([{ d: 35, t: 50 }], genP([9, 2, 6, 7, 3, 12]), null, gases);
      });
      it("air+nitrox+oxy 35 meters 100 minutes", () => {
        runTest([{ d: 35, t: 100 }], genP([12, 8, 9, 12, 6, 15, 3, 24]), null, gases);
      });

      /* 50 meters */
      it("air+nitrox+oxy 50 meters 5 minutes", () => {
        runTest([{ d: 50, t: 5 }], [], null, gases);
      });
      it("air+nitrox+oxy 50 meters 10 minutes", () => {
        runTest([{ d: 50, t: 10 }], genP([6, 1, 3, 1]), null, gases);
      });
      it("air+nitrox+oxy 50 meters 15 minutes", () => {
        runTest([{ d: 50, t: 15 }], genP([9, 1, 6, 1, 3, 4]), null, gases);
      });
      it("air+nitrox+oxy 50 meters 25 minutes", () => {
        runTest([{ d: 50, t: 25 }], genP([12, 1, 9, 3, 6, 4, 3, 9]), null, gases);
      });
      it("air+nitrox+oxy 50 meters 50 minutes", () => {
        runTest(
          [{ d: 50, t: 50 }],
          genP([18, 1, 15, 4, 12, 6, 9, 10, 6, 10, 3, 18]),
          null, gases
        );
      });
      it("air+nitrox+oxy 50 meters 100 minutes", () => {
        runTest(
          [{ d: 50, t: 100 }],
          genP([21, 8, 18, 14, 15, 11, 12, 14, 9, 22, 6, 24, 3, 43]),
          null, gases
        );
      });
    });
    describe.only('cnsO2 component', () => {
      // non-deco dives matching the 'TDI Oxygen Exposure Time Limits (CNS "Clock")'
      // card in the TDI Advanced Nitrox manual v.1018
      const ppO2s = [.6, .7, .8, .9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6]
      const maxDiveTimes = [720, 540, 450, 360, 300, 240, 210, 180, 150, 120, 45]
      ppO2s.forEach((ppO2, idx) => {
        // Dive to 10m
        // Choose a gas max such that 2Bar * percentO2 = ppO2
        const gases = [
          { percentn2: (1 - ppO2 / 2.0) * 100.0, percenthe2: 0 },
        ];
        const maxDiveTime = maxDiveTimes[idx]
        describe(`10m ${ppO2}ppO2 ${maxDiveTime}minutes`, () => {
          it('maxes out cnsO2', () => {
            runTest([{ d: 10, t: maxDiveTime }], [], 100.0, gases)
          })
        })
      })

      describe('multi level dives', () => {
        // pure O2 for simplicity
        const gases = [{ percentn2: 0, percenthe2: 0 }]
        it('1.6ppO2 20minute + 1.2ppO2 20minute ', () => {
          // 44% + 10% = 54% according to the table
          runTest([{ d: 6, t: 20 }, { d: 2, t: 20 }], [], 54, gases)
        })
      })
      // const exposureTimes = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60]
      // const cnsO2Pcts = [
      //   [1, 1, 1, 1, 1, 1, 2, 3, 3, 4, 5, 6, 6, 7, 8, 8],
      //   [1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10, 11],
      //   [1, 1, 1, 1, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13],
      //   [1, 1, 1, 1, 1, 3, 4, 6, 7, 8, 10, 11, 13, 14, 15, 17],
      //   [1, 1, 1, 1, 2, 3, 4, 6, 8, 10, 12, 13, 15, 17, 18, 20],
      //   [1, 1, 1, 2, 2, 4, 6, 8, 10, 13, 15, 17, 19, 21, 23, 25],
      //   [1, 1, 1, 2, 2, 5, 7, 10, 12, 14, 17, 19, 21, 24, 26, 29],
      //   [1, 1, 2, 3, 3, 7, 10, 13, 17, 20, 23, 27, 30, 33, 37, 40],
      //   [1, 2, 3, 3, 4, 8, 13, 17, 21, 25, 29, 33, 38, 42, 46, 50]
      // ]
    })
  });
});
