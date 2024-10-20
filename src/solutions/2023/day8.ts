import { Solution } from '../../app/domains/solver/models/solution';

export class Day8 extends Solution {
  nodeIndex = new Map<string, number>();
  adjacent: string[][] = [];

  search(
    u: string,
    instructions: { directions: string; index: number },
    goal: string = 'ZZZ',
  ): number {
    if (u === goal) return 0;
    const uIndex = this.nodeIndex.get(u)!;
    const move =
      instructions.directions[
        instructions.index % instructions.directions.length
      ];
    instructions.index++;
    const v = this.adjacent[uIndex][move == 'R' ? 1 : 0];
    return this.search(v, instructions, goal) + 1;
  }

  override partOne(input: string): string {
    let lines = input.split('\n').filter((line) => line != '');
    const instructions = lines[0];
    lines = lines.slice(1);
    let index = 0;
    for (let line of lines) {
      const [node, neighbors] = line.split(' = ');
      this.nodeIndex.set(node, index++);
      const [neighborLeft, neighborRight] = neighbors
        .slice(1, neighbors.length - 1)
        .split(', ');
      this.adjacent.push([neighborLeft, neighborRight]);
    }
    return this.search(
      'AAA',
      { directions: instructions, index: 0 },
      'ZZZ',
    ).toString();
  }

  inspectLoop(start: string, instructions: string) {
    let visited = new Map<string, number>();

    let index = 0;
    let loopData = { firstNode: '', index: -1, steps: -1, loopLength: -1 };
    let u = start;
    while (loopData.firstNode == '') {
      const instructionsIndex = index % instructions.length;
      const key = u + instructionsIndex.toString();
      if (visited.has(key)) {
        const length = index - visited.get(key)!;
        loopData.firstNode = u;
        loopData.index = instructionsIndex;
        loopData.steps = index;
        loopData.loopLength = length;
      } else {
        visited.set(key, index);
        const v =
          this.adjacent[this.nodeIndex.get(u)!][
            instructions[instructionsIndex] == 'R' ? 1 : 0
          ];
        u = v;
        index++;
      }
    }
    return loopData;
  }

  gcd(a: number, b: number): number {
    return b ? this.gcd(b, a % b) : a;
  }

  lcm(a: number, b: number): number {
    return a * (b / this.gcd(a, b));
  }

  override partTwo(input: string): string {
    let lines = input.split('\n').filter((line) => line != '');
    const instructions = lines[0];
    lines = lines.slice(1);
    let index = 0;
    let startNodes: string[] = [];
    for (let line of lines) {
      const [node, neighbors] = line.split(' = ');
      this.nodeIndex.set(node, index++);
      const [neighborLeft, neighborRight] = neighbors
        .slice(1, neighbors.length - 1)
        .split(', ');
      this.adjacent.push([neighborLeft, neighborRight]);
      if (node[2] == 'A') startNodes.push(node);
    }

    let result = '';

    let loopsLCM = 1;

    for (let u of startNodes) {
      const loopData = this.inspectLoop(u, instructions);
      loopsLCM = this.lcm(loopsLCM, loopData.loopLength);
    }
    result = loopsLCM.toString();

    return result;
  }
}
