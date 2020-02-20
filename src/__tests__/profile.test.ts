import { depthToStopDepth, calculateDecoProfile } from "../profile";
import { Profile, BreathingGas } from "../types";
import Diver from "../diver";
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
      breathingGas: BreathingGas
    ) {
      const diver = new Diver(0.75, 0, breathingGas, { atm: 0.95 });
      // Buhlmann added a 2m safety factor to the tables
      diveProfile[0].d += 2;
      diver.expose(diveProfile);
      const calculatedDecoProfile = calculateDecoProfile(diver);
      expect(calculatedDecoProfile).toEqual(expectedDecoProfile);
    }
    describe("on air", () => {
      const gas = { pn2: 0.79, phe2: 0 };
      describe("at 9 meters", () => {
        it("matches 300 minutes", () => {
          runTest([{ d: 9, t: 300 }], [], gas);
        });
      });
      describe("at 12 meters", () => {
        it("matches 120 minute", () => {
          runTest([{ d: 12, t: 120 }], [], gas);
        });
        it("matches 150 minute", () => {
          runTest([{ d: 12, t: 150 }], genP([3, 9]), gas);
        });
        it("matches 180 minute", () => {
          runTest([{ d: 12, t: 180 }], genP([3, 14]), gas);
        });
        it("matches 210 minute", () => {
          runTest([{ d: 12, t: 210 }], genP([3, 18]), gas);
        });
        it("matches 240 minute", () => {
          runTest([{ d: 12, t: 240 }], genP([3, 24]), gas);
        });
        it("matches 270 minute", () => {
          runTest([{ d: 12, t: 270 }], genP([3, 29]), gas);
        });
        it("matches 300 minute", () => {
          runTest([{ d: 12, t: 300 }], genP([3, 34]), gas);
        });
      });
      describe("at 18 meters", () => {
        it("matches 53 minutes", () => {
          runTest([{ d: 18, t: 53 }], [], gas);
        });
        it("matches 60 minutes", () => {
          runTest([{ d: 18, t: 60 }], genP([3, 4]), gas);
        });
        it("matches 70 minutes", () => {
          runTest([{ d: 18, t: 70 }], genP([3, 9]), gas);
        });
        it("matches 80 minutes", () => {
          runTest([{ d: 18, t: 80 }], genP([3, 16]), gas);
        });
        it("matches 90 minutes", () => {
          runTest([{ d: 18, t: 90 }], genP([3, 23]), gas);
        });
        it("matches 100 minutes", () => {
          runTest([{ d: 18, t: 100 }], genP([3, 28]), gas);
        });
        it("matches 110 minutes", () => {
          runTest([{ d: 18, t: 110 }], genP([6, 1, 3, 31]), gas);
        });
        it("matches 120 minutes", () => {
          runTest([{ d: 18, t: 120 }], genP([6, 3, 3, 33]), gas);
        });
        it("matches 130 minutes", () => {
          runTest([{ d: 18, t: 130 }], genP([6, 7, 3, 35]), gas);
        });
        it("matches 140 minutes", () => {
          runTest([{ d: 18, t: 140 }], genP([6, 10, 3, 38]), gas);
        });
        it("matches 150 minutes", () => {
          runTest([{ d: 18, t: 150 }], genP([6, 13, 3, 41]), gas);
        });
        it("matches 160 minutes", () => {
          runTest([{ d: 18, t: 160 }], genP([6, 15, 3, 44]), gas);
        });
        it("matches 170 minutes", () => {
          runTest([{ d: 18, t: 170 }], genP([6, 17, 3, 46]), gas);
        });
        it("matches 180 minutes", () => {
          runTest([{ d: 18, t: 180 }], genP([6, 19, 3, 48]), gas);
        });
        it("matches 190 minutes", () => {
          runTest([{ d: 18, t: 190 }], genP([6, 20, 3, 50]), gas);
        });
        it("matches 200 minutes", () => {
          runTest([{ d: 18, t: 200 }], genP([6, 21, 3, 52]), gas);
        });
      });
    });
  });
});
