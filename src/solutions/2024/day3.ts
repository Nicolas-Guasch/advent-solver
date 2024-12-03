import { Solution } from '../../app/domains/solver/models/solution';

export class Y2024Day3 extends Solution {
  override partOne(input: string): string {
    const mulPattern: RegExp = new RegExp(/mul\((\d{1,3}),(\d{1,3})\)/g);
    let result = 0;
    for (let mul of input.matchAll(mulPattern)) {
      result += parseInt(mul[1]) * parseInt(mul[2]);
    }
    return result.toString();
  }
  override partTwo(input: string): string {
    const mulPattern: RegExp = new RegExp(/mul\((\d+),(\d+)\)/g);
    let enabledMuls = '';
    let result = 0;
    enabledMuls = input
      .split('do()')
      .map((doChunk) => doChunk.split("don't()")[0])
      .join();
    for (let mul of enabledMuls.matchAll(mulPattern)) {
      result += parseInt(mul[1]) * parseInt(mul[2]);
    }
    return result.toString();
  }
}
