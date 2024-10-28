import { Solution } from '../../app/domains/solver/models/solution';

type position = {
  x: number;
  y: number;
};

type move = {
  dx: number;
  dy: number;
};

export class explorer {
  currentPos: position;
  direction: move = { dx: +1, dy: 0 };
  inside: move[];

  constructor(start: position, rightSide: boolean = true) {
    this.currentPos = start;
    this.inside = rightSide ? [{ dx: 0, dy: +1 }] : [{ dx: 0, dy: -1 }];
  }

  getInside(): position[] {
    return this.inside.map((inside) => ({
      x: this.currentPos.x + inside.dx,
      y: this.currentPos.y + inside.dy,
    }));
  }

  getNext(): position {
    return {
      x: this.currentPos.x + this.direction.dx,
      y: this.currentPos.y + this.direction.dy,
    };
  }

  straight() {
    this.inside = [this.inside[this.inside.length - 1]];
  }

  rotateCW() {
    /* [0 -1]
       [+1 0]*/
    this.direction = { dx: -this.direction.dy, dy: this.direction.dx };
    const inside = this.inside[this.inside.length - 1];
    this.inside = [inside, { dx: -inside.dy, dy: inside.dx }];
  }

  rotateCCW() {
    /* [0 +1]
       [-1 0]*/
    this.direction = { dx: this.direction.dy, dy: -this.direction.dx };
    const inside = this.inside[this.inside.length - 1];
    this.inside = [inside, { dx: inside.dy, dy: -inside.dx }];
  }

  moveOnce(pipe: string) {
    this.currentPos = {
      x: this.currentPos.x + this.direction.dx,
      y: this.currentPos.y + this.direction.dy,
    };

    if (pipe == '|' || pipe == '-') this.straight();
    else if (this.direction.dx == 1) {
      //right
      if (pipe === 'J') this.rotateCCW();
      else if (pipe === '7') this.rotateCW();
    } else if (this.direction.dy == 1) {
      //down
      if (pipe === 'L') this.rotateCCW();
      else if (pipe === 'J') this.rotateCW();
    } else if (this.direction.dx == -1) {
      //left
      if (pipe === 'F') this.rotateCCW();
      else if (pipe === 'L') this.rotateCW();
    } else if (this.direction.dy == -1) {
      //up
      if (pipe === '7') this.rotateCCW();
      if (pipe === 'F') this.rotateCW();
    }
  }
}

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

  private nextPos(
    current: position,
    labels: string[][],
    pipe: string,
  ): position | null {
    let nextPosition: position | null = null;
    for (let move of this.pipes[pipe]) {
      const adjacent: position = {
        x: current.x + move.dx,
        y: current.y + move.dy,
      };
      if (labels[adjacent.y][adjacent.x] !== 'X') nextPosition = adjacent;
    }
    return nextPosition;
  }

  exploreLoop(map: string[], mapLabels: string[][]) {
    const start = this.findStart(map);
    const [dir1, dir2] = this.findLoop(start, map);
    mapLabels[start.y][start.x] = 'X';
    mapLabels[dir1.y][dir1.x] = 'X';
    mapLabels[dir2.y][dir2.x] = 'X';
    const queue: position[] = [dir1, dir2];
    while (queue.length) {
      const u = queue.shift()!;
      const v = this.nextPos(u, mapLabels, map[u.y][u.x]);
      if (v) {
        mapLabels[v.y][v.x] = 'X';
        queue.push(v);
      }
    }
  }

  uncharted(tile: position, labels: string[][]): boolean {
    return (
      0 <= tile.y &&
      tile.y < labels.length &&
      0 <= tile.x &&
      tile.x < labels[tile.y].length &&
      labels[tile.y][tile.x] == '.'
    );
  }

  exploreSectors(map: string[], mapLabels: string[][]) {
    // Only works if start is an horizontal pipe
    const start = this.findStart(map);
    let sideA = new explorer(start, true);
    let sideB = new explorer(start, false);
    let tileB = sideB.getInside();
    sideA.getInside().forEach((tile) => {
      if (this.uncharted(tile, mapLabels)) mapLabels[tile.y][tile.x] = 'A';
    });
    sideB.getInside().forEach((tile) => {
      if (this.uncharted(tile, mapLabels)) mapLabels[tile.y][tile.x] = 'B';
    });
    sideA.moveOnce(map[sideA.getNext().y][sideA.getNext().x]);
    sideB.moveOnce(map[sideB.getNext().y][sideB.getNext().x]);
    while (sideA.currentPos.x != start.x || sideA.currentPos.y != start.y) {
      sideA.getInside().forEach((tile) => {
        if (this.uncharted(tile, mapLabels)) mapLabels[tile.y][tile.x] = 'A';
      });
      sideB.getInside().forEach((tile) => {
        if (this.uncharted(tile, mapLabels)) mapLabels[tile.y][tile.x] = 'B';
      });
      sideA.moveOnce(map[sideA.getNext().y][sideA.getNext().x]);
      sideB.moveOnce(map[sideB.getNext().y][sideB.getNext().x]);
    }
  }

  coverMap(start: position, mapLabels: string[][]) {
    const coverLabel = mapLabels[start.y][start.x];
    let queue = [start];
    while (queue.length) {
      const u = queue.shift()!;
      for (let v of [
        { x: u.x, y: u.y - 1 },
        { x: u.x, y: u.y + 1 },
        { x: u.x - 1, y: u.y },
        { x: u.x + 1, y: u.y },
      ]) {
        if (this.uncharted(v, mapLabels)) {
          mapLabels[v.y][v.x] = coverLabel;
          queue.push(v);
        }
      }
    }
  }

  override partTwo(input: string): string {
    const map = input.split('\n');
    let mapLabels: string[][] = [];
    for (let i = 0; i < map.length; i++) {
      mapLabels.push(new Array(map[i].length).fill('.'));
    }
    this.exploreLoop(map, mapLabels);
    this.exploreSectors(map, mapLabels);
    for (let y = 0; y < mapLabels.length; y++) {
      for (let x = 0; x < mapLabels[y].length; x++) {
        if (mapLabels[y][x] == 'A' || mapLabels[y][x] == 'B')
          this.coverMap({ x: x, y: y }, mapLabels);
      }
    }

    console.log(`${mapLabels.map((line) => line.join('')).join('\n')}`);

    const zonesTiles: string[] = mapLabels
      .map((line) => line.join())
      .join()
      .split('');
    const aCount = zonesTiles.reduce(
      (count, tile) => (tile === 'A' ? count + 1 : count),
      0,
    );
    const bCount = zonesTiles.reduce(
      (count, tile) => (tile === 'B' ? count + 1 : count),
      0,
    );
    console.log(`${aCount} - ${bCount}`);
    const result = mapLabels[0].includes('A') ? bCount : aCount;
    return result.toString();
  }
}
