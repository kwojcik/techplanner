import { combinations } from "../utils";
describe("combinations", () => {
  it("works for size 1", () => {
    expect(combinations([1, 2, 3, 4, 5], 1)).toEqual([[1], [2], [3], [4], [5]]);
  });
  it("works for size 2", () => {
    expect(combinations([1, 2, 3, 4, 5], 2)).toEqual([
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 3],
      [2, 4],
      [2, 5],
      [3, 4],
      [3, 5],
      [4, 5]
    ]);
  });
  it("works for size 3", () => {
    expect(combinations([1, 2, 3, 4, 5], 3)).toEqual([
      [1, 2, 3],
      [1, 2, 4],
      [1, 2, 5],
      [1, 3, 4],
      [1, 3, 5],
      [1, 4, 5],
      [2, 3, 4],
      [2, 3, 5],
      [2, 4, 5],
      [3, 4, 5]
    ]);
  });
  it("works for size 4", () => {
    expect(combinations([1, 2, 3, 4, 5], 4)).toEqual([
      [1, 2, 3, 4],
      [1, 2, 3, 5],
      [1, 2, 4, 5],
      [1, 3, 4, 5],
      [2, 3, 4, 5]
    ]);
  });
  it("works for size 5", () => {
    expect(combinations([1, 2, 3, 4, 5], 5)).toEqual([[1, 2, 3, 4, 5]]);
  });
});
