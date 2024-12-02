import { Solution } from '../../app/domains/solver/models/solution';

export class Y2024Day2 extends Solution {
  private checkSafety(levels: number[]): boolean {
    return (
      levels
        .slice(1)
        .every(
          (level, i) => 1 <= level - levels[i] && level - levels[i] <= 3,
        ) ||
      levels
        .slice(1)
        .every((level, i) => -3 <= level - levels[i] && level - levels[i] <= -1)
    );
  }

  override partOne(input: string): string {
    let reports = input
      .trim()
      .split(/\n/)
      .map((line) => line.split(/\s/).map(Number));
    let safeReports = reports.filter((report) => this.checkSafety(report));
    return safeReports.length.toString();
  }

  private problemDampener(levels: number[]): boolean {
    return levels.some((_, i) => this.checkSafety(levels.toSpliced(i, 1)));
  }

  override partTwo(input: string): string {
    let reports = input
      .trim()
      .split(/\n/)
      .map((line) => line.split(/\s/).map(Number));
    let safeReports = reports.filter(
      (report) => this.checkSafety(report) || this.problemDampener(report),
    );
    return safeReports.length.toString();
  }
}
