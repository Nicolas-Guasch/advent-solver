import { computed, inject, Injectable } from '@angular/core';

import * as d23 from '../../../../solutions/2023/aoc2023';
import * as d24 from '../../../../solutions/2024/aoc2024';
import { Solution } from '../../solver/models/solution';
import { dayId } from '../models/dayId';
import { AOCYear } from '../../solver/models/aoc-year';
import { CurrentProblemService } from '../../solver/services/current-problem.service';

@Injectable({
  providedIn: 'root',
})
export class CodeFetcherService {
  state = inject(CurrentProblemService);
  constructor() {}
  private contestYear = computed(this.state.year);

  classHandler(id: dayId) {
    switch (this.contestYear()) {
      case '2023':
        return this.fetch2023(id);
      case '2024':
        return this.fetch2024(id);
    }
  }

  fetch2024(id: dayId) {
    switch (id) {
      case 'day1':
        return d24.Y2024Day1.toString();
      case 'day2':
        return d24.Y2024Day2.toString();
      case 'day3':
        return d24.Y2024Day3.toString();
      case 'day4':
        return d24.Y2024Day4.toString();
      case 'day5':
        return d24.Y2024Day5.toString();
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

  fetch2023(id: dayId) {
    switch (id) {
      case 'day1':
        return d23.Day1.toString();
      case 'day2':
        return d23.Day2.toString();
      case 'day3':
        return d23.Day3.toString();
      case 'day4':
        return d23.Day4.toString();
      case 'day5':
        return d23.Day5.toString();
      case 'day6':
        return d23.Day6.toString();
      case 'day7':
        return d23.Day7.toString();
      case 'day8':
        return d23.Day8.toString();
      case 'day9':
        return d23.Day9.toString();
      case 'day10':
        return (
          'explorer\n' +
          d23.explorer.toString() +
          '\nday 10\n' +
          d23.Day10.toString()
        );
      case 'day11':
        return d23.Day11.toString();
      case 'day12':
        return d23.Day12.toString();
      case 'day13':
        return d23.Day13.toString();
      case 'day14':
        return d23.Day14.toString();
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
