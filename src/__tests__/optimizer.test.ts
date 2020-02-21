import { bestMix } from "../optimizer";

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
