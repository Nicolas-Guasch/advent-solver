import { Solution } from '../../app/domains/solver/models/solution';

export class Y2024Day6 extends Solution {
  findPos(map: string[][]): { i: number; j: number } {
    let pos = { i: 0, j: 0 };
    for (; pos.i < map.length; pos.i++) {
      for (pos.j = 0; pos.j < map[pos.i].length; pos.j++) {
        if (map[pos.i][pos.j] === '^') return pos;
      }
    }
    return pos;
  }

  override partOne(input: string): string {
    let map = input
      .trim()
      .split('\n')
      .map((row) => row.split(''));
    const inbounds = (i: number, j: number): boolean =>
      0 <= i && i < map.length && 0 <= j && j < map[i].length;
    const directions = [
      [-1, 0],
      [0, +1],
      [+1, 0],
      [0, -1],
    ];
    let currentDir = 0;

    let pos = this.findPos(map);
    while (inbounds(pos.i, pos.j)) {
      map[pos.i][pos.j] = 'X';
      let [di, dj] = directions[currentDir];
      let next = { i: pos.i + di, j: pos.j + dj };
      if (inbounds(next.i, next.j) && map[next.i][next.j] === '#') {
        currentDir = (currentDir + 1) % 4;
        [di, dj] = directions[currentDir];
        next = { i: pos.i + di, j: pos.j + dj };
      }
      pos = next;
    }
    return map
      .flat()
      .filter((tile) => tile === 'X')
      .length.toString();
  }
  override partTwo(input: string): string {
    throw new Error('Method not implemented.');
  }
}
