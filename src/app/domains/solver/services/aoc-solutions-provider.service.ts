import { computed, inject, Injectable } from '@angular/core';
import { ProblemInput } from '../../shared/models/ProblemInput';
import { Solution } from '../models/solution';
import { dayId } from '../../shared/models/dayId';
import { PendingSolver } from '../models/pending-solver';
import { Observable, of } from 'rxjs';

import * as d23 from '../../../../solutions/2023/aoc2023';
import * as d24 from '../../../../solutions/2024/aoc2024';
import { CurrentProblemService } from './current-problem.service';

@Injectable({
  providedIn: 'root',
})
export class AOCSolutionsProviderService {
  state = inject(CurrentProblemService);
  contestYear = computed(() => this.state.year());
  constructor() {}

  getDaySolution(dayName: dayId): Solution {
    switch (this.contestYear()) {
      case '2023':
        return this.fetch2023(dayName);
      case '2024':
        return this.fetch2024(dayName);
    }
  }

  fetch2024(dayName: dayId): Solution {
    switch (dayName) {
      case 'day1':
        return new d24.Y2024Day1();
      case 'day2':
        return new d24.Y2024Day2();
      case 'day3':
      case 'day4':
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
        return new PendingSolver();
    }
  }

  fetch2023(dayName: dayId): Solution {
    switch (dayName) {
      case 'day1':
        return new d23.Day1();
      case 'day2':
        return new d23.Day2();
      case 'day3':
        return new d23.Day3();
      case 'day4':
        return new d23.Day4();
      case 'day5':
        return new d23.Day5();
      case 'day6':
        return new d23.Day6();
      case 'day7':
        return new d23.Day7();
      case 'day8':
        return new d23.Day8();
      case 'day9':
        return new d23.Day9();
      case 'day10':
        return new d23.Day10();
      case 'day11':
        return new d23.Day11();
      case 'day12':
        return new d23.Day12();
      case 'day13':
        return new d23.Day13();
      case 'day14':
        return new d23.Day14();
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
        return new PendingSolver();
    }
  }

  partOne(input: ProblemInput): Observable<string> {
    try {
      const daySolution: Solution = this.getDaySolution(input.problemId);
      return of(daySolution.partOne(input.input));
    } catch (error: any) {
      console.log(error);
      return of('Solution not currently available');
    }
  }

  partTwo(input: ProblemInput): Observable<string> {
    try {
      const daySolution: Solution = this.getDaySolution(input.problemId);
      return of(daySolution.partTwo(input.input));
    } catch (error: any) {
      console.log(error);
      return of('Solution not currently available');
    }
  }
}
