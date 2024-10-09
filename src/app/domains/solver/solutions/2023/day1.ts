import { Solution } from '../solution';

interface digit {
  value: number;
  spelling: string[];
}

export class Day1 extends Solution {
  private numeric: digit[] = [
    { value: 1, spelling: ['1'] },
    { value: 2, spelling: ['2'] },
    { value: 3, spelling: ['3'] },
    { value: 4, spelling: ['4'] },
    { value: 5, spelling: ['5'] },
    { value: 6, spelling: ['6'] },
    { value: 7, spelling: ['7'] },
    { value: 8, spelling: ['8'] },
    { value: 9, spelling: ['9'] },
  ];
  private alphanumeric: digit[] = [
    { value: 1, spelling: ['1', 'one'] },
    { value: 2, spelling: ['2', 'two'] },
    { value: 3, spelling: ['3', 'three'] },
    { value: 4, spelling: ['4', 'four'] },
    { value: 5, spelling: ['5', 'five'] },
    { value: 6, spelling: ['6', 'six'] },
    { value: 7, spelling: ['7', 'seven'] },
    { value: 8, spelling: ['8', 'eight'] },
    { value: 9, spelling: ['9', 'nine'] },
  ];

  private findCode(line: string, digits: digit[]): number {
    let firstDigit = { pos: line.length, value: 0 };
    let lastDigit = { pos: -1, value: 0 };

    for (let curDigit of digits) {
      for (let spelling of curDigit.spelling) {
        const firstPos = line.indexOf(spelling);
        const lastPos = line.lastIndexOf(spelling);
        if (firstPos != -1 && firstDigit.pos > firstPos)
          firstDigit = { pos: firstPos, value: curDigit.value };
        if (lastPos != -1 && lastDigit.pos < lastPos)
          lastDigit = { pos: lastPos, value: curDigit.value };
      }
    }

    if (firstDigit.pos == line.length) console.log(line);

    return firstDigit.value * 10 + lastDigit.value;
  }

  partOne(input: string): string {
    let sum: number = 0;
    for (let line of input.split('\n')) {
      if (line != '') sum += this.findCode(line, this.numeric);
    }
    return sum.toString();
  }
  partTwo(input: string): string {
    let sum: number = 0;
    for (let line of input.split('\n')) {
      if (line != '') sum += this.findCode(line, this.alphanumeric);
    }
    return sum.toString();
  }
}
