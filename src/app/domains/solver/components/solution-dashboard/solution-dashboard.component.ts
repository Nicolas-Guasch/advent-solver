import { Component, computed, inject, input, signal } from '@angular/core';
import { ProblemInput } from '../../../shared/models/ProblemInput';
import { AOCSolutionsProviderService } from '../../services/aoc-solutions-provider.service';
import { Subscription } from 'rxjs';
import { CodeFetcherService } from '../../../shared/services/code-fetcher.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CurrentProblemService } from '../../services/current-problem.service';
import { InputFetcherService } from '../../../shared/services/input-fetcher.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { dayId } from '../../../shared/models/dayId';

@Component({
  selector: 'app-solution-dashboard',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './solution-dashboard.component.html',
  styleUrl: './solution-dashboard.component.css',
})
export class SolutionDashboardComponent {
  state = inject(CurrentProblemService);
  inputFetcher = inject(InputFetcherService);
  input = signal<string>('');
  customInput = input.required<ProblemInput | null>();
  aocSolver = inject(AOCSolutionsProviderService);
  problemOutput = signal<string>('');
  currentFileRequest: Subscription | null = null;
  currentExecution: Subscription | null = null;

  constructor() {
    this.fetchInput(this.state.day());
    this.state.changeDay$
      .pipe(takeUntilDestroyed())
      .subscribe((day) => this.fetchInput(day));
    this.state.changeYear$
      .pipe(takeUntilDestroyed())
      .subscribe((_year) => this.fetchInput(this.state.day()));
  }

  ngOnDestroy() {
    if (this.currentFileRequest) this.currentFileRequest.unsubscribe();
  }

  discardSolution() {
    if (this.currentExecution) {
      this.currentExecution.unsubscribe;
      this.currentExecution = null;
    }
  }

  codeFetcher = inject(CodeFetcherService);
  solverCode = computed(() => {
    const id = this.state.day();
    return this.codeFetcher.fetchCode(id);
  });
  displayCode = signal(false);

  handleCode() {
    this.displayCode.update((value) => !value);
  }

  computePartOne() {
    this.discardSolution();
    this.aocSolver
      .partOne(
        this.customInput() ?? {
          problemId: this.state.day(),
          year: this.state.year(),
          input: this.input(),
        },
      )
      .subscribe((result) => {
        this.problemOutput.set(result);
      });
  }
  computePartTwo() {
    this.discardSolution();
    this.aocSolver
      .partTwo(
        this.customInput() ?? {
          problemId: this.state.day(),
          year: this.state.year(),
          input: this.input(),
        },
      )
      .subscribe((result) => {
        this.problemOutput.set(result);
      });
  }

  fetchInput(selectedOption: dayId) {
    const inputFilename = selectedOption + '.txt';

    if (this.currentFileRequest) this.currentFileRequest.unsubscribe();
    this.currentFileRequest = this.inputFetcher
      .fetchInputFile(inputFilename)
      .subscribe({
        next: (data) => {
          this.input.set(data);
        },
        error: () => {
          this.input.set(
            selectedOption +
              '.txt not found. Copy your own input files to\npublic/input-files/ before building the site\nin order to use them here.',
          );
        },
      });
  }
}
