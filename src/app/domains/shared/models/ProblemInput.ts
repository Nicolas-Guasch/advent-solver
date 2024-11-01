import { AOCYear } from '../../solver/models/aoc-year';
import { dayId } from './dayId';

export interface ProblemInput {
  problemId: dayId;
  year: AOCYear;
  input: string;
}
