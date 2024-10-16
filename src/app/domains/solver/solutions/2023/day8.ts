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
    console.log(instructions.length);
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

  ghostSearch(
    nodes: string[],
    instructions: { directions: string; index: number },
  ): number {
    let goalReached = false;

    while (!goalReached) {
      goalReached = true;
      const next =
        instructions.directions[
          instructions.index % instructions.directions.length
        ] === 'R'
          ? 1
          : 0;
      instructions.index++;
      for (let [i, u] of nodes.entries()) {
        const uIndex = this.nodeIndex.get(u)!;
        const v = this.adjacent[uIndex][next];
        if (v[2] != 'Z') goalReached = false;
        nodes[i] = v;
      }
      //console.log(nodes);
    }

    return instructions.index;
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
    console.log(startNodes);
    return this.ghostSearch(startNodes, {
      directions: instructions,
      index: 0,
    }).toString();
  }
}
