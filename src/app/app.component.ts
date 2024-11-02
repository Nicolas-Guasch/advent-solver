import { Component, computed, inject, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DaySelectorComponent } from './domains/solver/components/day-selector/day-selector.component';
import { SolutionDashboardComponent } from './domains/solver/components/solution-dashboard/solution-dashboard.component';
import { ProblemInput } from './domains/shared/models/ProblemInput';
import { AOCYear } from './domains/solver/models/aoc-year';
import { YearNavComponent } from './domains/solver/components/year-nav/year-nav.component';
import { dayId } from './domains/shared/models/dayId';
import { Subscription } from 'rxjs';
import { InputFetcherService } from './domains/shared/services/input-fetcher.service';
import { CurrentProblemService } from './domains/solver/services/current-problem.service';

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
  state = inject(CurrentProblemService);
  custom = signal<string>('');
  customInput = computed<ProblemInput>(() => ({
    problemId: this.state.day(),
    year: this.state.year(),
    input: this.custom(),
  }));

  customInputHandler(customInput: string) {
    this.custom.set(customInput);
  }
}
