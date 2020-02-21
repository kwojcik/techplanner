import { Profile } from "../types";
describe("stop failing because there are no tests", () => {
  it("please stop", () => {});
});

export function toMatchDecoProfile(actual: Profile, expected: Profile) {
  if (actual.length !== expected.length) {
    let tryModifiedProfile = false;
    // Do some tricky stuff. Sometimes someone wants to add a
    // 1 minute deeper stop than the other. If that's the case,
    // remove the deeper stop and add 1 minute to the next one
    if (actual.length > expected.length) {
      if (actual[0].t === 1) {
        tryModifiedProfile = true;
        actual.shift();
        if (actual.length) {
          actual[0].t += 1;
        }
      }
    } else {
      if (expected[0].t === 1) {
        tryModifiedProfile = true;
        expected.shift();
        if (expected.length) {
          expected[0].t += 1;
        }
      }
    }
    if (!tryModifiedProfile) {
      return {
        message: () =>
          `expected number of stops ${actual.length} to be ${
            expected.length
          }. Actual profile:${JSON.stringify(actual)}`,
        pass: false
      };
    }
  }
  for (let i = 0; i < actual.length; i++) {
    if (
      expected[i].g &&
      (expected[i].g.percentn2 !== actual[i].g.percentn2 ||
        expected[i].g.percenthe2 != actual[i].g.percenthe2)
    ) {
      return {
        message: () =>
          `expected stop ${i} gas ${JSON.stringify(
            actual[i].g
          )} to be ${JSON.stringify(
            expected[i].g
          )}. Actual profile:${JSON.stringify(actual)}`,
        pass: false
      };
    }
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
