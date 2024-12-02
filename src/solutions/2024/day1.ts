import { Solution } from '../../app/domains/solver/models/solution';

export class Y2024Day1 extends Solution {
  parseInput(input: string) {
    let left = [],
      right = [];
    for (let line of input.trim().split('\n')) {
      let [leftItem, rightItem] = line.split(/\s+/).map(Number);
      left.push(leftItem);
      right.push(rightItem);
    }
    return [left, right];
  }

  override partOne(input: string): string {
    let [leftList, rightList] = this.parseInput(input);
    let totalDistance = 0;

    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);
    for (let i = 0; i < leftList.length; i++)
      totalDistance += Math.abs(leftList[i] - rightList[i]);

    return totalDistance.toString();
  }

  override partTwo(input: string): string {
    let [leftList, rightList] = this.parseInput(input);
    let similarityScore = 0;

    let rightOcurrences = new Counter<number>();
    for (let number of rightList) rightOcurrences.increment(number);

    for (let number of leftList)
      similarityScore += number * rightOcurrences.get(number);

    return similarityScore.toString();
  }
}

class Counter<T> {
  private count = new Map<T, number>();
  public get(key: T): number {
    return this.count.get(key) || 0;
  }
  public increment(key: T): void {
    this.count.set(key, this.get(key) + 1);
  }
}
