import { Injectable } from '@angular/core';

import * as d from '../../solver/solutions/2023/aoc2023';
import { Solution } from '../../solver/solutions/solution';
import { dayId } from '../models/dayId';

@Injectable({
  providedIn: 'root',
})
export class CodeFetcherService {
  constructor() {}

  classHandler(id: dayId) {
    switch (id) {
      case 'day1':
        return d.Day1.toString();
      case 'day2':
        return d.Day2.toString();
      case 'day3':
        return d.Day3.toString();
      case 'day4':
        return d.Day4.toString();
      case 'day5':
      case 'day6':
      case 'day7':
      case 'day8':
      case 'day9':
      case 'day10':
      case 'day11':
      case 'day12':
      case 'day13':
      case 'day14':
      case 'day15':
      case 'day16':
      case 'day17':
      case 'day18':
      case 'day19':
      case 'day20':
      case 'day21':
      case 'day22':
      case 'day23':
      case 'day24':
      case 'day25':
      default:
        return '';
    }
  }

  fetchCode(id: dayId): string {
    const width = 77;
    let code = this.classHandler(id);
    let formattedCode = '';

    for (let line of code.split('\n')) {
      let cappedLine = '';
      if (line != '') {
        const codeWords = line.split(' ');
        cappedLine += codeWords[0];
        for (let i = 1; i < codeWords.length; i++) {
          if (cappedLine.length + 1 + codeWords[i].length > width) {
            formattedCode += cappedLine + '\n';
            cappedLine = codeWords[i];
          } else cappedLine += ' ' + codeWords[i];
        }
      }
      formattedCode += cappedLine + '\n';
    }

    return formattedCode;
  }
}
