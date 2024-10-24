import { L } from '@angular/cdk/keycodes';
import { Solution } from '../../app/domains/solver/models/solution';

type position = {
  x: number;
  y: number;
};

type move = {
  dx: number;
  dy: number;
};

export class Day10 extends Solution {
  /* Y X --->
     |
     |
     V */
  pipes: Record<string, move[]> = {
    '|': [
      { dx: 0, dy: -1 },
      { dx: 0, dy: +1 },
    ],
    '-': [
      { dx: -1, dy: 0 },
      { dx: +1, dy: 0 },
    ],
    L: [
      { dx: 0, dy: -1 },
      { dx: +1, dy: 0 },
    ],
    J: [
      { dx: 0, dy: -1 },
      { dx: -1, dy: 0 },
    ],
    '7': [
      { dx: -1, dy: 0 },
      { dx: 0, dy: +1 },
    ],
    F: [
      { dx: +1, dy: 0 },
      { dx: 0, dy: +1 },
    ],
    '.': [],
  };

  private next(
    current: position,
    distMap: number[][],
    pipe: string,
  ): position | null {
    let nextPosition: position | null = null;
    for (let move of this.pipes[pipe]) {
      const adjacent: position = {
        x: current.x + move.dx,
        y: current.y + move.dy,
      };
      if (distMap[adjacent.y][adjacent.x] === -1) nextPosition = adjacent;
    }
    return nextPosition;
  }

  findStart(map: string[]) {
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        if (map[i][j] == 'S') return { x: j, y: i };
      }
    }
    return { x: -1, y: -1 };
  }

  findLoop(start: position, map: string[]): position[] {
    let loop: position[] = [];
    for (let move of [
      { dx: 0, dy: -1 },
      { dx: +1, dy: 0 },
      { dx: 0, dy: +1 },
      { dx: -1, dy: 0 },
    ] as move[]) {
      const neighbor: position = { x: start.x + move.dx, y: start.y + move.dy };
      if (
        0 <= neighbor.y &&
        neighbor.y < map.length &&
        0 <= neighbor.x &&
        neighbor.x < map[neighbor.y].length
      ) {
        for (let connnections of this.pipes[map[neighbor.y][neighbor.x]]) {
          if (
            neighbor.x + connnections.dx === start.x &&
            neighbor.y + connnections.dy === start.y
          ) {
            loop.push(neighbor);
          }
        }
      }
    }
    return loop;
  }

  getFurthest(start: position, map: string[]): number {
    let distance: number[][] = [];

    for (let i = 0; i < map.length; i++) {
      distance.push(new Array(map[i].length).fill(-1));
    }
    distance[start.y][start.x] = 0;

    let furthest = 0;
    const [dir1, dir2] = this.findLoop(start, map);
    distance[dir1.y][dir1.x] = 1;
    distance[dir2.y][dir2.x] = 1;
    const queue: position[] = [dir1, dir2];
    while (queue.length) {
      const u = queue.shift()!;
      const v = this.next(u, distance, map[u.y][u.x]);
      if (v) {
        const dist = distance[u.y][u.x] + 1;
        furthest = Math.max(furthest, dist);
        distance[v.y][v.x] = dist;
        queue.push(v);
      }
    }
    console.log(
      distance.map((line) => line.toString().replaceAll('-1', 'X')).join('\n'),
    );
    return furthest;
  }

  override partOne(input: string): string {
    const map = input.split('\n');

    return this.getFurthest(this.findStart(map), map).toString();
  }
  override partTwo(input: string): string {
    throw new Error('Method not implemented.');
  }
}
