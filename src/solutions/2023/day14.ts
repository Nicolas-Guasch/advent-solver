import { Solution } from '../../app/domains/solver/models/solution';

export class Day14 extends Solution {
  private calculateLoad(platform: string[], column: number): number {
    let freeSpace: number = 0;
    let load: number = 0;
    for (let i = 0; i < platform.length; i++) {
      let cell = platform[i][column];
      if (cell == '#') {
        freeSpace = i + 1;
      } else if (cell == 'O') {
        load += platform.length - freeSpace;
        freeSpace += 1;
      }
    }
    return load;
  }

  override partOne(input: string): string {
    let load = 0;
    const platform = input.split('\n').filter((line) => line != '');

    for (let j = 0; j < platform[0].length; j++) {
      load += this.calculateLoad(platform, j);
    }

    return load.toString();
  }
  override partTwo(input: string): string {
    throw new Error('Method not implemented.');
  }
}
