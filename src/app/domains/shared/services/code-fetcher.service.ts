import { Injectable } from '@angular/core';

import * as d from '../../../../solutions/2023/aoc2023';
import { Solution } from '../../solver/models/solution';
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
        return d.Day5.toString();
      case 'day6':
        return d.Day6.toString();
      case 'day7':
        return d.Day7.toString();
      case 'day8':
        return d.Day8.toString();
      case 'day9':
        return d.Day9.toString();
      case 'day10':
        return (
          'explorer\n' +
          d.explorer.toString() +
          '\nday 10\n' +
          d.Day10.toString()
        );
      case 'day11':
        return d.Day11.toString();
      case 'day12':
        return d.Day12.toString();
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
