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
      const diver = new Diver(0.75, 0, breathingGas);
      // Buhlmann added a 2m safety factor to the tables
      diveProfile[0].d += 2;
      diver.expose(diveProfile);
      expect(calculateDecoProfile(diver)).toEqual(expectedDecoProfile);
    }
    describe("on air", () => {
      const gas = { pn2: 0.79, phe2: 0 };
      it("matches buhlmanns original paper 18m", () => {
        //runTest([{ d: 18, t: 53 }], [], gas);
        runTest([{ d: 18, t: 60 }], genP([3, 4]), gas);
        runTest([{ d: 18, t: 70 }], genP([3, 9]), gas);
        runTest([{ d: 18, t: 80 }], genP([3, 16]), gas);
        runTest([{ d: 18, t: 90 }], genP([3, 23]), gas);
        runTest([{ d: 18, t: 100 }], genP([3, 28]), gas);
        runTest([{ d: 18, t: 110 }], genP([6, 1, 3, 31]), gas);
        runTest([{ d: 18, t: 120 }], genP([6, 3, 3, 33]), gas);
        runTest([{ d: 18, t: 130 }], genP([6, 7, 3, 35]), gas);
        runTest([{ d: 18, t: 140 }], genP([6, 10, 3, 38]), gas);
        runTest([{ d: 18, t: 150 }], genP([6, 13, 3, 41]), gas);
        runTest([{ d: 18, t: 160 }], genP([6, 15, 3, 44]), gas);
        runTest([{ d: 18, t: 170 }], genP([6, 17, 3, 46]), gas);
        runTest([{ d: 18, t: 180 }], genP([6, 19, 3, 48]), gas);
        runTest([{ d: 18, t: 190 }], genP([6, 20, 3, 50]), gas);
        runTest([{ d: 18, t: 200 }], genP([6, 21, 3, 52]), gas);
      });
    });
  });
});
