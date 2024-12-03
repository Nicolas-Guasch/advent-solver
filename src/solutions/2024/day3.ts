import { Solution } from '../../app/domains/solver/models/solution';

export class Y2024Day3 extends Solution {
  override partOne(input: string): string {
    const mulPattern: RegExp = new RegExp(/mul\((\d+),(\d+)\)/g);
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
    for (let doChunk of input.split('do()')) {
      enabledMuls += doChunk.split("don't()")[0];
    }
    for (let mul of enabledMuls.matchAll(mulPattern)) {
      result += parseInt(mul[1]) * parseInt(mul[2]);
    }
    return result.toString();
  }
}
