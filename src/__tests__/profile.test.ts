import { depthToStopDepth, calculateDecoProfile } from "../profile";
import { Profile, BreathingGas, ProfileStop } from "../types";
import Diver from "../diver";

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchDecoProfile(expected: Profile): R;
    }
  }
}

expect.extend({
  toMatchDecoProfile(actual: Profile, expected: Profile) {
    if (actual.length !== expected.length) {
      return {
        message: () =>
          `expected number of stops ${actual.length} to be ${
            expected.length
          }. Actual profile:${JSON.stringify(actual)}`,
        pass: false
      };
    }
    for (let i = 0; i < actual.length; i++) {
      if (actual[i].d !== expected[i].d) {
        return {
          message: () =>
            `expected stop ${i} depth ${actual[i].d} to be ${
              expected[i].d
            }. Actual profile:${JSON.stringify(actual)}`,
          pass: false
        };
      }
      if (
        Math.abs(actual[i].t - expected[i].t) > Math.ceil(0.1 * expected[i].t)
      ) {
        return {
          message: () =>
            `expected stop ${i} time ${actual[i].t} to be within 10% of ${
              expected[i].t
            }. Actual profile:${JSON.stringify(actual)}`,
          pass: false
        };
      }
    }
    return {
      message: () => "expected profiles not to match",
      pass: true
    };
  }
});

function genP(nums: number[]): Profile {
  const p: Profile = [];
  expect(nums.length % 2).toEqual(0);
  for (let i = 0; i < nums.length; i += 2) {
    p.push({ d: nums[i], t: nums[i + 1] });
  }
  return p;
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
      diveProfile: Profile,
      expectedDecoProfile: Profile,
      breathingGases: BreathingGas[]
    ) {
      const diver = new Diver(0.79, 0, breathingGases, { atm: 1.0 });
      diver.expose(diveProfile);
      const calculatedDecoProfile = calculateDecoProfile(diver);
      expect(calculatedDecoProfile).toMatchDecoProfile(expectedDecoProfile);
    }
    describe("on air", () => {
      const gases = [{ pn2: 0.79, phe2: 0 }];
      /* 9 meters */
      it("air 9 meters 300 minutes", () => {
        runTest([{ d: 9, t: 300 }], [], gases);
      });

      /* 12 meters */
      it("air 12 meters 120 minute", () => {
        runTest([{ d: 12, t: 120 }], [], gases);
      });
      it("air 12 meters 150 minute", () => {
        runTest([{ d: 12, t: 150 }], [], gases);
      });
      it("air 12 meters 180 minute", () => {
        runTest([{ d: 12, t: 180 }], [], gases);
      });
      it("air 12 meters 210 minute", () => {
        runTest([{ d: 12, t: 210 }], genP([3, 5]), gases);
      });
      it("air 12 meters 240 minute", () => {
        runTest([{ d: 12, t: 240 }], genP([3, 11]), gases);
      });
      it("air 12 meters 270 minute", () => {
        runTest([{ d: 12, t: 270 }], genP([3, 16]), gases);
      });
      it("air 12 meters 300 minute", () => {
        runTest([{ d: 12, t: 300 }], genP([3, 22]), gases);
      });

      /* 15 meters */
      it("air 15 meters 60 minutes", () => {
        runTest([{ d: 15, t: 60 }], [], gases);
      });
      it("air 15 meters 90 minutes", () => {
        runTest([{ d: 15, t: 90 }], genP([3, 1]), gases);
      });
      it("air 15 meters 120 minutes", () => {
        runTest([{ d: 15, t: 120 }], genP([3, 10]), gases);
      });
      it("air 15 meters 150 minutes", () => {
        runTest([{ d: 15, t: 150 }], genP([3, 18]), gases);
      });
      it("air 15 meters 180 minutes", () => {
        runTest([{ d: 15, t: 180 }], genP([3, 30]), gases);
      });
      it("air 15 meters 210 minutes", () => {
        runTest([{ d: 15, t: 210 }], genP([3, 39]), gases);
      });

      /* 18 meters */

      it("air 18 meters 59 minutes", () => {
        runTest([{ d: 18, t: 59 }], [], gases);
      });
      it("air 18 meters 60 minutes", () => {
        runTest([{ d: 18, t: 60 }], genP([3, 1]), gases);
      });
      it("air 18 meters 70 minutes", () => {
        runTest([{ d: 18, t: 70 }], genP([3, 6]), gases);
      });
      it("air 18 meters 80 minutes", () => {
        runTest([{ d: 18, t: 80 }], genP([3, 10]), gases);
      });
      it("air 18 meters 90 minutes", () => {
        runTest([{ d: 18, t: 90 }], genP([3, 14]), gases);
      });
      it("air 18 meters 100 minutes", () => {
        runTest([{ d: 18, t: 100 }], genP([3, 19]), gases);
      });
      it("air 18 meters 110 minutes", () => {
        runTest([{ d: 18, t: 110 }], genP([3, 24]), gases);
      });
      it("air 18 meters 120 minutes", () => {
        runTest([{ d: 18, t: 120 }], genP([3, 28]), gases);
      });
      it("air 18 meters 130 minutes", () => {
        runTest([{ d: 18, t: 130 }], genP([3, 35]), gases);
      });
      it("air 18 meters 140 minutes", () => {
        runTest([{ d: 18, t: 140 }], genP([6, 1, 3, 40]), gases);
      });
      it("air 18 meters 150 minutes", () => {
        runTest([{ d: 18, t: 150 }], genP([6, 1, 3, 44]), gases);
      });
      it("air 18 meters 160 minutes", () => {
        runTest([{ d: 18, t: 160 }], genP([6, 5, 3, 46]), gases);
      });
      it("air 18 meters 170 minutes", () => {
        runTest([{ d: 18, t: 170 }], genP([6, 7, 3, 51]), gases);
      });
      it("air 18 meters 180 minutes", () => {
        runTest([{ d: 18, t: 180 }], genP([6, 9, 3, 56]), gases);
      });
      it("air 18 meters 190 minutes", () => {
        runTest([{ d: 18, t: 190 }], genP([6, 10, 3, 60]), gases);
      });
      it("air 18 meters 200 minutes", () => {
        runTest([{ d: 18, t: 200 }], genP([6, 11, 3, 65]), gases);
      });

      /* 35 meters */
      it("air 35 meters 25 minutes", () => {
        runTest([{ d: 35, t: 25 }], genP([6, 2, 3, 8]), gases);
      });
      it("air 35 meters 50 minutes", () => {
        runTest([{ d: 35, t: 50 }], genP([9, 5, 6, 16, 3, 30]), gases);
      });
      it("air 35 meters 100 minutes", () => {
        runTest(
          [{ d: 35, t: 100 }],
          genP([12, 12, 9, 24, 6, 41, 3, 84]),
          gases
        );
      });

      /* 50 meters */
      it("air 50 meters 5 minutes", () => {
        runTest([{ d: 50, t: 5 }], [], gases);
      });
      it("air 50 meters 10 minutes", () => {
        runTest([{ d: 50, t: 10 }], genP([6, 1, 3, 3]), gases);
      });
      it("air 50 meters 15 minutes", () => {
        runTest([{ d: 50, t: 15 }], genP([9, 1, 6, 3, 3, 7]), gases);
      });
      it("air 50 meters 25 minutes", () => {
        runTest([{ d: 50, t: 25 }], genP([12, 2, 9, 5, 6, 9, 3, 21]), gases);
      });
      it("air 50 meters 50 minutes", () => {
        runTest(
          [{ d: 50, t: 50 }],
          genP([18, 1, 15, 6, 12, 10, 9, 18, 6, 29, 3, 59]),
          gases
        );
      });
      it("air 50 meters 100 minutes", () => {
        runTest(
          [{ d: 50, t: 100 }],
          genP([21, 8, 18, 14, 15, 20, 12, 29, 9, 44, 6, 83, 3, 187]),
          gases
        );
      });
    });
    describe("on air + oxy deco", () => {
      const gases = [
        { pn2: 0.79, phe2: 0 },
        { pn2: 0.0, phe2: 0 }
      ];
      /* 9 meters */
      it("air+oxy 9 meters 300 minutes", () => {
        runTest([{ d: 9, t: 300 }], [], gases);
      });

      /* 12 meters */
      it("air+oxy 12 meters 120 minute", () => {
        runTest([{ d: 12, t: 120 }], [], gases);
      });
      it("air+oxy 12 meters 150 minute", () => {
        runTest([{ d: 12, t: 150 }], [], gases);
      });
      it("air+oxy 12 meters 180 minute", () => {
        runTest([{ d: 12, t: 180 }], [], gases);
      });
      it("air+oxy 12 meters 210 minute", () => {
        runTest([{ d: 12, t: 210 }], genP([3, 3]), gases);
      });
      it("air+oxy 12 meters 240 minute", () => {
        runTest([{ d: 12, t: 240 }], genP([3, 5]), gases);
      });
      it("air+oxy 12 meters 270 minute", () => {
        runTest([{ d: 12, t: 270 }], genP([3, 7]), gases);
      });
      it("air+oxy 12 meters 300 minute", () => {
        runTest([{ d: 12, t: 300 }], genP([3, 9]), gases);
      });

      /* 15 meters */
      it("air+oxy 15 meters 60 minutes", () => {
        runTest([{ d: 15, t: 60 }], [], gases);
      });
      it("air+oxy 15 meters 90 minutes", () => {
        runTest([{ d: 15, t: 90 }], genP([3, 1]), gases);
      });
      it("air+oxy 15 meters 120 minutes", () => {
        runTest([{ d: 15, t: 120 }], genP([3, 4]), gases);
      });
      it("air+oxy 15 meters 150 minutes", () => {
        runTest([{ d: 15, t: 150 }], genP([3, 8]), gases);
      });
      it("air+oxy 15 meters 180 minutes", () => {
        runTest([{ d: 15, t: 180 }], genP([3, 11]), gases);
      });
      it("air+oxy 15 meters 210 minutes", () => {
        runTest([{ d: 15, t: 210 }], genP([3, 15]), gases);
      });

      /* 18 meters */

      it("air+oxy 18 meters 59 minutes", () => {
        runTest([{ d: 18, t: 59 }], [], gases);
      });
      it("air+oxy 18 meters 60 minutes", () => {
        runTest([{ d: 18, t: 60 }], genP([3, 1]), gases);
      });
      it("air+oxy 18 meters 70 minutes", () => {
        runTest([{ d: 18, t: 70 }], genP([3, 3]), gases);
      });
      it("air+oxy 18 meters 80 minutes", () => {
        runTest([{ d: 18, t: 80 }], genP([3, 5]), gases);
      });
      it("air+oxy 18 meters 90 minutes", () => {
        runTest([{ d: 18, t: 90 }], genP([3, 7]), gases);
      });
      it("air+oxy 18 meters 100 minutes", () => {
        runTest([{ d: 18, t: 100 }], genP([3, 9]), gases);
      });
      it("air+oxy 18 meters 110 minutes", () => {
        runTest([{ d: 18, t: 110 }], genP([3, 10]), gases);
      });
      it("air+oxy 18 meters 120 minutes", () => {
        runTest([{ d: 18, t: 120 }], genP([3, 12]), gases);
      });
      it("air+oxy 18 meters 130 minutes", () => {
        runTest([{ d: 18, t: 130 }], genP([3, 13]), gases);
      });
      it("air+oxy 18 meters 140 minutes", () => {
        runTest([{ d: 18, t: 140 }], genP([6, 1, 3, 16]), gases);
      });
      it("air+oxy 18 meters 150 minutes", () => {
        runTest([{ d: 18, t: 150 }], genP([6, 1, 3, 18]), gases);
      });
      it("air+oxy 18 meters 160 minutes", () => {
        runTest([{ d: 18, t: 160 }], genP([6, 2, 3, 19]), gases);
      });
      it("air+oxy 18 meters 170 minutes", () => {
        runTest([{ d: 18, t: 170 }], genP([6, 3, 3, 19]), gases);
      });
      it("air+oxy 18 meters 180 minutes", () => {
        runTest([{ d: 18, t: 180 }], genP([6, 4, 3, 20]), gases);
      });
      it("air+oxy 18 meters 190 minutes", () => {
        runTest([{ d: 18, t: 190 }], genP([6, 4, 3, 22]), gases);
      });
      it("air+oxy 18 meters 200 minutes", () => {
        runTest([{ d: 18, t: 200 }], genP([6, 5, 3, 24]), gases);
      });

      /* 35 meters */
      it("air+oxy 35 meters 25 minutes", () => {
        runTest([{ d: 35, t: 25 }], genP([6, 2, 3, 4]), gases);
      });
      it("air+oxy 35 meters 50 minutes", () => {
        runTest([{ d: 35, t: 50 }], genP([9, 5, 6, 7, 3, 12]), gases);
      });
      it("air+oxy 35 meters 100 minutes", () => {
        runTest(
          [{ d: 35, t: 100 }],
          genP([12, 12, 9, 24, 6, 16, 3, 28]),
          gases
        );
      });

      /* 50 meters */
      it("air+oxy 50 meters 5 minutes", () => {
        runTest([{ d: 50, t: 5 }], [], gases);
      });
      it("air+oxy 50 meters 10 minutes", () => {
        runTest([{ d: 50, t: 10 }], genP([6, 1, 3, 1]), gases);
      });
      it("air+oxy 50 meters 15 minutes", () => {
        runTest([{ d: 50, t: 15 }], genP([9, 1, 6, 2, 3, 3]), gases);
      });
      it("air+oxy 50 meters 25 minutes", () => {
        runTest([{ d: 50, t: 25 }], genP([12, 2, 9, 5, 6, 5, 3, 9]), gases);
      });
      it("air+oxy 50 meters 50 minutes", () => {
        runTest(
          [{ d: 50, t: 50 }],
          genP([18, 1, 15, 6, 12, 10, 9, 18, 6, 13, 3, 20]),
          gases
        );
      });
      it("air+oxy 50 meters 100 minutes", () => {
        runTest(
          [{ d: 50, t: 100 }],
          genP([21, 8, 18, 14, 15, 20, 12, 29, 9, 44, 6, 29, 3, 53]),
          gases
        );
      });
    });
  });
});
