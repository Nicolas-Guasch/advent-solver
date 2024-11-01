import { Component, computed, inject, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DaySelectorComponent } from './domains/solver/components/day-selector/day-selector.component';
import { SolutionDashboardComponent } from './domains/solver/components/solution-dashboard/solution-dashboard.component';
import { ProblemInput } from './domains/shared/models/ProblemInput';
import { StorageService } from './domains/solver/services/storage.service';
import { AOCYear } from './domains/solver/models/aoc-year';
import { addBodyClass } from '@angular/cdk/schematics';
import { YearNavComponent } from './domains/solver/components/year-nav/year-nav.component';
import { dayId } from './domains/shared/models/dayId';
import { Subscription } from 'rxjs';
import { InputFetcherService } from './domains/shared/services/input-fetcher.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DaySelectorComponent,
    SolutionDashboardComponent,
    YearNavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  storage = inject(StorageService);
  year = signal(this.storage.getYear());
  problemId = signal<dayId>('day1');
  custom = signal<string>('');
  input = signal<string>('');
  problemInput = computed<ProblemInput>(() => ({
    problemId: this.problemId(),
    year: this.year(),
    input: this.input(),
  }));
  customInput = computed<ProblemInput>(() => ({
    problemId: this.problemId(),
    year: this.year(),
    input: this.custom(),
  }));

  currentFileRequest: Subscription | null = null;
  inputFetcher = inject(InputFetcherService);

  ngOnDestroy() {
    if (this.currentFileRequest) this.currentFileRequest.unsubscribe();
  }

  daySelectedHandler(input: dayId) {
    this.problemId.set(input);
    this.fetchInput();
  }

  yearHandler(year: AOCYear) {
    this.year.set(year);
    this.fetchInput();
  }

  customInputHandler(customInput: string) {
    this.custom.set(customInput);
  }

  fetchInput() {
    const selectedOption = this.problemId();
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
