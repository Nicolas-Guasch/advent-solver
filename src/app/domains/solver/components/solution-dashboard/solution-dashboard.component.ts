import { Component, computed, inject, input, signal } from '@angular/core';
import { ProblemInput } from '../../../shared/models/ProblemInput';
import { AOCSolutionsProviderService } from '../../services/aoc-solutions-provider.service';
import { Subscription } from 'rxjs';
import { CodeFetcherService } from '../../../shared/services/code-fetcher.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-solution-dashboard',
  standalone: true,
  imports: [ButtonComponent],
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

  codeFetcher = inject(CodeFetcherService);
  solverCode = computed(() => {
    const id = this.providedInput().problemId;
    return this.codeFetcher.fetchCode(id);
  });
  displayCode = signal(false);

  handleCode() {
    this.displayCode.update((value) => !value);
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
