import { Injectable } from '@angular/core';
import { ProblemInput } from '../../shared/models/ProblemInput';
import { Solution } from '../solutions/solution';
import { dayId } from '../../shared/models/dayId';
import { PendingSolver } from '../solutions/pending-solver';
import { Observable, of } from 'rxjs';
import { Day1 } from '../solutions/2023/day1';
import { Day2 } from '../solutions/2023/day2';
import { Day3 } from '../solutions/2023/day3';

@Injectable({
  providedIn: 'root',
})
export class AOCSolutionsProviderService {
  constructor() {}

  getDaySolution(dayName: dayId): Solution {
    switch (dayName) {
      case 'day1':
        return new Day1();
      case 'day2':
        return new Day2();
      case 'day3':
        return new Day3();
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
