import { Component, inject, input, signal } from '@angular/core';
import { ProblemInput } from '../../../shared/models/ProblemInput';
import { AOCSolutionsProviderService } from '../../services/aoc-solutions-provider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-solution-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './solution-dashboard.component.html',
  styleUrl: './solution-dashboard.component.css',
})
export class SolutionDashboardComponent {
  providedInput = input.required<ProblemInput>();
  aocSolver = inject(AOCSolutionsProviderService);
  problemOutput = signal<string>('');
  currentExecution: Subscription | null = null;

  discardSolution() {
    if (this.currentExecution) {
      this.currentExecution.unsubscribe;
      this.currentExecution = null;
    }
  }

  computePartOne() {
    this.discardSolution();
    this.aocSolver.partOne(this.providedInput()).subscribe((result) => {
      this.problemOutput.set(result);
    });
  }
  computePartTwo() {
    this.discardSolution();
    this.aocSolver.partTwo(this.providedInput()).subscribe((result) => {
      this.problemOutput.set(result);
    });
  }
}
