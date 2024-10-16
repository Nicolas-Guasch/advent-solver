import { Solution } from '../solution';

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
    console.log(Array.from(this.nodeIndex.entries()));
    console.log(this.adjacent);
    return this.search(
      'AAA',
      { directions: instructions, index: 0 },
      'ZZZ',
    ).toString();
  }
  override partTwo(input: string): string {
    throw new Error('Method not implemented.');
  }
}
