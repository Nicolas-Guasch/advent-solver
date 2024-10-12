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
