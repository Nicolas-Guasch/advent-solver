import { Solution } from '../../app/domains/solver/models/solution';

export class Day13 extends Solution {
  split(pattern: string[], cut: number): string[][] {
    let upper = pattern.slice(0, cut).reverse(),
      lower = pattern.slice(cut);
    const length = Math.min(upper.length, lower.length);
    upper = upper.slice(0, length);
    lower = lower.slice(0, length);
    return [upper, lower];
  }

  transpose(pattern: string[]): string[] {
    return Array.from({ length: pattern[0].length }, (_a, i) =>
      Array.from({ length: pattern.length }, (_b, j) => pattern[j][i]).join(''),
    );
  }

  reflectionLine(pattern: string[]): number {
    const equals = (a: string[], b: string[]) => a.join() == b.join();
    for (let line = 1; line < pattern.length; line++) {
      const [upper, lower] = this.split(pattern, line);
      if (equals(upper, lower)) return line;
    }
    return 0;
  }

  smudgedReflection(pattern: string[]): number {
    const smudges = (a: string[], b: string[]) => {
      const mapA = a.join('').split(''),
        mapB = b.join('').split('');
      return mapA.reduce(
        (acc, value, index) => (acc += value != mapB[index] ? 1 : 0),
        0,
      );
    };
    for (let line = 1; line < pattern.length; line++) {
      const [upper, lower] = this.split(pattern, line);
      if (smudges(upper, lower) == 1) return line;
    }
    return 0;
  }

  override partOne(input: string): string {
    let reflectionSum = 0;
    for (let pattern of input.split('\n\n')) {
      const map = pattern.split('\n').filter((line) => line != '');
      reflectionSum +=
        100 * this.reflectionLine(map) +
        this.reflectionLine(this.transpose(map));
    }
    return reflectionSum.toString();
  }
  override partTwo(input: string): string {
    let reflectionSum = 0;
    for (let pattern of input.split('\n\n')) {
      const map = pattern.split('\n').filter((line) => line != '');
      reflectionSum +=
        100 * this.smudgedReflection(map) +
        this.smudgedReflection(this.transpose(map));
    }
    return reflectionSum.toString();
  }
}
