import { Component, inject, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DaySelectorComponent } from './domains/solver/components/day-selector/day-selector.component';
import { SolutionDashboardComponent } from './domains/solver/components/solution-dashboard/solution-dashboard.component';
import { ProblemInput } from './domains/shared/models/ProblemInput';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DaySelectorComponent, SolutionDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  problemInput = signal<ProblemInput | null>(null);
  customInput = signal<ProblemInput>({ problemId: 'day1', input: '' });

  daySelectedHandler(input: ProblemInput) {
    this.problemInput.set(input);
  }

  customInputHandler(customInput: ProblemInput) {
    this.customInput.set(customInput);
  }
}
