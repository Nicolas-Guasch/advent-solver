import { Solution } from '../../app/domains/solver/models/solution';

export class Y2024Day1 extends Solution {
  parseInput(input: string) {
    let left = [],
      right = [];
    for (let line of input.split('\n').filter((line) => line != '')) {
      let [leftItem, rightItem] = line
        .split('   ')
        .map((number) => parseInt(number));
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
    for (let i = 0; i < leftList.length; i++) {
      totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance.toString();
  }

  override partTwo(input: string): string {
    let [leftList, rightList] = this.parseInput(input);
    let totalDistance = 0;
    let rightOcurrences = new Counter<number>();

    for (let number of rightList) {
      rightOcurrences.increment(number);
    }
    for (let number of leftList) {
      totalDistance += number * rightOcurrences.get(number);
    }

    return totalDistance.toString();
  }
}

class Counter<T> {
  private count = new Map<T, number>();
  public get(key: T): number {
    if (!this.count.has(key)) this.count.set(key, 0);
    return this.count.get(key)!;
  }
  public increment(key: T): void {
    if (!this.count.has(key)) this.count.set(key, 0);
    this.count.set(key, this.count.get(key)! + 1);
  }
}
