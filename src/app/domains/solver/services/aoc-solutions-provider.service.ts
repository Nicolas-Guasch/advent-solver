import { Injectable } from '@angular/core';
import { ProblemInput } from '../../shared/models/ProblemInput';
import { Solution } from '../solutions/solution';
import { dayId } from '../../shared/models/dayId';
import { PendingSolver } from '../solutions/pending-solver';
import { Observable, of } from 'rxjs';

import * as d from '../solutions/2023/aoc2023';

@Injectable({
  providedIn: 'root',
})
export class AOCSolutionsProviderService {
  constructor() {}

  getDaySolution(dayName: dayId): Solution {
    switch (dayName) {
      case 'day1':
        return new d.Day1();
      case 'day2':
        return new d.Day2();
      case 'day3':
        return new d.Day3();
      case 'day4':
        return new d.Day4();
      case 'day5':
        return new d.Day5();
      case 'day6':
        return new d.Day6();
      case 'day7':
        return new d.Day7();
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
