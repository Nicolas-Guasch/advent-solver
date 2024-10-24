import { Solution } from '../../app/domains/solver/models/solution';

export class Day9 extends Solution {
  extrapolate(sequence: number[]): number {
    if (sequence.filter((value) => value).length == 0) return 0;
    const lastValue = sequence[sequence.length - 1];
    sequence = sequence
      .map((value, index, seq) => seq[index + 1] - value)
      .slice(0, sequence.length - 1);
    return lastValue + this.extrapolate([...sequence]);
  }

  extrapolateLeft(sequence: number[]): number {
    if (sequence.filter((value) => value).length == 0) return 0;
    const firstValue = sequence[0];
    sequence = sequence
      .map((value, index, seq) => seq[index + 1] - value)
      .slice(0, sequence.length - 1);
    return firstValue - this.extrapolateLeft([...sequence]);
  }

  override partOne(input: string): string {
    let valuesHistory: number[][] = [];
    let extrapolateSum = 0;
    for (let history of input.split('\n').filter((line) => line != '')) {
      valuesHistory.push(history.split(' ').map((num) => parseInt(num)));
    }

    for (let history of valuesHistory) {
      const extrapolatedValue = this.extrapolate([...history]);
      extrapolateSum += extrapolatedValue;
    }

    return extrapolateSum.toString();
  }
  override partTwo(input: string): string {
    let valuesHistory: number[][] = [];
    let extrapolateSum = 0;
    for (let history of input.split('\n').filter((line) => line != '')) {
      valuesHistory.push(history.split(' ').map((num) => parseInt(num)));
    }

    for (let history of valuesHistory) {
      const extrapolatedValue = this.extrapolateLeft([...history]);
      extrapolateSum += extrapolatedValue;
    }

    return extrapolateSum.toString();
  }
}
