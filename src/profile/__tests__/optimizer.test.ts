import { bestMix, bestDecoForProfile } from "../optimizer";
import Profile from "../profile";
import { ProfileStop } from "../types";
import "./helpers";
import { toMatchDecoProfile } from "./helpers";

declare global {
  namespace jest {
    interface Matchers<R> {
      toMatchDecoProfile(expected: ProfileStop[]): R;
    }
  }
}
expect.extend({
  toMatchDecoProfile
});
describe("optimizer", () => {
  describe("bestMix", () => {
    it("chooses oxy above 6m", () => {
      for (let i = 1; i < 6; i++) {
        expect(bestMix(i, 1.6)).toEqual({ percentn2: 0, percenthe2: 0 });
      }
    });
    it("chooses the right mix for 1.6", () => {
      expect(bestMix(20, 1.6)).toEqual({ percentn2: 47, percenthe2: 0 });
      expect(bestMix(30, 1.6)).toEqual({ percentn2: 60, percenthe2: 0 });
      expect(bestMix(40, 1.6)).toEqual({ percentn2: 68, percenthe2: 0 });
      expect(bestMix(50, 1.6)).toEqual({ percentn2: 74, percenthe2: 0 });
      expect(bestMix(60, 1.6)).toEqual({ percentn2: 78, percenthe2: 0 });
    });
    it("chooses the right mix for 1.4", () => {
      expect(bestMix(20, 1.4)).toEqual({ percentn2: 54, percenthe2: 0 });
      expect(bestMix(30, 1.4)).toEqual({ percentn2: 65, percenthe2: 0 });
      expect(bestMix(40, 1.4)).toEqual({ percentn2: 73, percenthe2: 0 });
      expect(bestMix(50, 1.4)).toEqual({ percentn2: 77, percenthe2: 0 });
      expect(bestMix(60, 1.4)).toEqual({ percentn2: 80, percenthe2: 0 });
    });
  });
  describe("bestDecoForProfile", () => {
    it("chooses the right gas", () => {
      const diveProfile: Profile = new Profile([{ d: 50, t: 100 }]);
      const bestDeco = bestDecoForProfile(diveProfile, 2);
      expect(bestDeco.stops).toMatchDecoProfile([
        { d: 21, t: 5, g: { percentn2: 77, percenthe2: 0 } },
        { d: 18, t: 8, g: { percentn2: 44, percenthe2: 0 } },
        { d: 15, t: 10, g: { percentn2: 44, percenthe2: 0 } },
        { d: 12, t: 15, g: { percentn2: 44, percenthe2: 0 } },
        { d: 9, t: 22, g: { percentn2: 44, percenthe2: 0 } },
        { d: 6, t: 22, g: { percentn2: 0, percenthe2: 0 } },
        { d: 3, t: 40, g: { percentn2: 0, percenthe2: 0 } }
        // { d: 15, t: 2, g: { percentn2: 37, percenthe2: 0 } },
        // { d: 12, t: 15, g: { percentn2: 37, percenthe2: 0 } },
        // { d: 9, t: 31, g: { percentn2: 37, percenthe2: 0 } },
        // { d: 6, t: 42, g: { percentn2: 0, percenthe2: 0 } },
        // { d: 3, t: 8, g: { percentn2: 0, percenthe2: 0 } }
      ]);
    });
  });
})