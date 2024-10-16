import { Solution } from '../../app/domains/solver/models/solution';

export class Day3 extends Solution {
  private digit(d: string): boolean {
    return '0123456789'.includes(d);
  }
  private adjacentToSymbol(schematic: string[], i: number, j: number): boolean {
    const dx = [+1, +1, +0, -1, -1, -1, +0, +1],
      dy = [+0, +1, +1, +1, +0, -1, -1, -1];
    const inbounds = (x: number, y: number) =>
      0 <= x && x < schematic.length && 0 <= y && y < schematic[x].length;
    const symbol = (s: string) => !this.digit(s) && s != '.';

    for (let k = 0; k < dx.length; k++) {
      const adj = { x: i + dx[k], y: j + dy[k] };
      if (inbounds(adj.x, adj.y) && symbol(schematic[adj.x][adj.y]))
        return true;
    }
    return false;
  }

  override partOne(input: string): string {
    const engine = input.split('\n').filter((line) => line != '');
    let partNumberSum = 0;

    for (let i = 0; i < engine.length; i++) {
      let currentNumber = 0,
        partNumber = false;
      for (let j = 0; j < engine[i].length; j++) {
        if (this.digit(engine[i][j])) {
          partNumber ||= this.adjacentToSymbol(engine, i, j);
          currentNumber = currentNumber * 10 + parseInt(engine[i][j]);
          if (
            (j == engine[i].length - 1 || !this.digit(engine[i][j + 1])) &&
            partNumber
          ) {
            partNumberSum += currentNumber;
          }
        } else {
          currentNumber = 0;
          partNumber = false;
        }
      }
    }

    return partNumberSum.toString();
  }
  private gearNumbers: number[][][] = [];

  private updateGears(
    schematic: string[],
    i: number,
    j: number,
    partNumber: number,
  ): void {
    const check = (i: number, j: number) =>
      0 <= i &&
      i < schematic.length &&
      0 <= j &&
      j < schematic[i].length &&
      schematic[i][j] == '*';

    const end = j + 1;
    while (0 <= j - 1 && this.digit(schematic[i][j - 1])) j--;
    const start = j;
    let outline = [
      { i: i, j: start - 1 },
      { i: i, j: end },
    ];
    for (let k = start - 1; k < end + 1; k++) {
      outline.push({ i: i - 1, j: k }, { i: i + 1, j: k });
    }

    for (let cell of outline) {
      if (check(cell.i, cell.j))
        this.gearNumbers[cell.i][cell.j].push(partNumber);
    }
  }

  override partTwo(input: string): string {
    const engine = input.split('\n').filter((line) => line != '');
    let gearRatioSum = 0;

    this.gearNumbers = [];
    for (let i = 0; i < engine.length; i++) {
      let row: number[][] = [];
      for (let j = 0; j < engine[i].length; j++) {
        row.push([]);
      }
      this.gearNumbers.push(row);
    }

    for (let i = 0; i < engine.length; i++) {
      let currentNumber = 0;
      for (let j = 0; j < engine[i].length; j++) {
        if (this.digit(engine[i][j])) {
          currentNumber = currentNumber * 10 + parseInt(engine[i][j]);
          if (j == engine[i].length - 1 || !this.digit(engine[i][j + 1])) {
            this.updateGears(engine, i, j, currentNumber);
          }
        } else {
          currentNumber = 0;
        }
      }
    }

    for (let i = 0; i < engine.length; i++) {
      for (let j = 0; j < engine.length; j++) {
        if (engine[i][j] == '*' && this.gearNumbers[i][j].length == 2) {
          gearRatioSum += this.gearNumbers[i][j][0] * this.gearNumbers[i][j][1];
        }
      }
    }

    return gearRatioSum.toString();
  }
}
