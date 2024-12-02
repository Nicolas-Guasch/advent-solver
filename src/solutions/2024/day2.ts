import { Solution } from '../../app/domains/solver/models/solution';

export class Y2024Day2 extends Solution {
  private checkSafety(levels: number[]): boolean {
    let minDifference = levels[1] - levels[0],
      maxDifference = minDifference;
    for (let i = 2; i < levels.length; i++) {
      minDifference = Math.min(minDifference, levels[i] - levels[i - 1]);
      maxDifference = Math.max(maxDifference, levels[i] - levels[i - 1]);
    }
    return (
      (minDifference >= 1 && maxDifference <= 3) ||
      (minDifference >= -3 && maxDifference <= -1)
    );
  }

  override partOne(input: string): string {
    let safeReports = 0;
    for (let line of input.trim().split(/\n/)) {
      let levels = line.split(/\s/).map(Number);
      if (this.checkSafety(levels)) {
        safeReports++;
      }
    }
    return safeReports.toString();
  }

  problemDampener(levels: number[]): boolean {
    for (let i = 0; i < levels.length; i++) {
      let dampened = [...levels];
      dampened.splice(i, 1);
      if (this.checkSafety(dampened)) return true;
    }
    return false;
  }

  override partTwo(input: string): string {
    let safeReports = 0;
    for (let line of input.trim().split(/\n/)) {
      let levels = line.split(/\s/).map(Number);
      if (this.checkSafety(levels) || this.problemDampener(levels)) {
        safeReports++;
      }
    }
    return safeReports.toString();
  }
}
