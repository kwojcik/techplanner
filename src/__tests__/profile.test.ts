import { depthToStopDepth } from "../profile";

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
});
