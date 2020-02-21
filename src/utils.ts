export function combinations(a: any[], n: number): any[] {
  if (n === 1) {
    return a.map(e => [e]);
  }

  let combos: any[] = [];
  for (let i = 0; i < a.length - n + 1; i++) {
    const otherCombos = combinations(a.slice(i + 1, a.length), n - 1);
    otherCombos.forEach(c => {
      const combo = [a[i]];
      combo.push(...c);
      combos.push(combo);
    });
  }
  return combos;
}
