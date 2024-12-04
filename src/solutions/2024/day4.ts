import { Solution } from '../../app/domains/solver/models/solution';

export class Y2024Day4 extends Solution {
  xmas = [...'XMAS'];
  findXmas(wordSearch: string[], i: number, j: number): number {
    let count = 0;
    const inbounds = (i: number, j: number) =>
      0 <= i && i < wordSearch.length && 0 <= j && j < wordSearch[i].length;
    for (let [di, dj] of [
      [-1, -1],
      [-1, +0],
      [-1, +1],
      [+0, +1],
      [+1, +1],
      [+1, +0],
      [+1, -1],
      [+0, -1],
    ]) {
      if (
        inbounds(i + 3 * di, j + 3 * dj) &&
        this.xmas.every(
          (char, k) => char === wordSearch[i + k * di][j + k * dj],
        )
      )
        count++;
    }
    return count;
  }

  findX_mas(wordSearch: string[], i: number, j: number): number {
    const checkMas = (a: string, b: string) =>
      [a, b].includes('M') && [a, b].includes('S');
    let count = 0;

    if (
      checkMas(wordSearch[i - 1][j - 1], wordSearch[i + 1][j + 1]) &&
      checkMas(wordSearch[i - 1][j + 1], wordSearch[i + 1][j - 1])
    )
      count = 1;

    return count;
  }

  override partOne(input: string): string {
    const wordSearch = input.trim().split('\n');
    let xmasCount = 0;

    for (let i = 0; i < wordSearch.length; i++) {
      for (let j = 0; j < wordSearch[i].length; j++) {
        if (wordSearch[i][j] === this.xmas[0])
          xmasCount += this.findXmas(wordSearch, i, j);
      }
    }

    return xmasCount.toString();
  }
  override partTwo(input: string): string {
    const wordSearch = input.trim().split('\n');
    let x_masCount = 0;

    for (let i = 1; i < wordSearch.length - 1; i++) {
      for (let j = 1; j < wordSearch[i].length - 1; j++) {
        if (wordSearch[i][j] === 'A')
          x_masCount += this.findX_mas(wordSearch, i, j);
      }
    }

    return x_masCount.toString();
  }
}
