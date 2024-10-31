import { Solution } from '../../app/domains/solver/models/solution';

export class Day11 extends Solution {
  addPairs(sequence: number[], expansion = 2): number {
    let sum = 0;
    let prevDistances = 0,
      prevStars = 0,
      distance = 0;
    expansion--;
    for (let position of sequence) {
      if (prevStars && position) {
        sum += position * (distance * prevStars - prevDistances);
      } else if (!position) {
        distance += expansion;
      }
      prevDistances += position * distance;
      prevStars += position;
      distance += 1;
    }
    return sum;
  }

  override partOne(input: string): string {
    let distanceSum = 0;
    const sky = input
      .split('\n')
      .filter((line) => line != '')
      .map((row) => row.split(''));
    let rows: number[] = Array(sky.length).fill(0);
    let columns: number[] = Array(sky[0].length).fill(0);

    for (let [i, row] of sky.entries()) {
      for (let [j, cell] of row.entries()) {
        if (cell === '#') {
          rows[i]++;
          columns[j]++;
        }
      }
    }
    distanceSum += this.addPairs(rows);
    distanceSum += this.addPairs(columns);

    return distanceSum.toString();
  }
  override partTwo(input: string): string {
    let distanceSum = 0;
    const sky = input
      .split('\n')
      .filter((line) => line != '')
      .map((row) => row.split(''));
    let rows: number[] = Array(sky.length).fill(0);
    let columns: number[] = Array(sky[0].length).fill(0);

    for (let [i, row] of sky.entries()) {
      for (let [j, cell] of row.entries()) {
        if (cell === '#') {
          rows[i]++;
          columns[j]++;
        }
      }
    }
    const expansion = 1000000;
    distanceSum += this.addPairs(rows, expansion);
    distanceSum += this.addPairs(columns, expansion);

    return distanceSum.toString();
  }
}
