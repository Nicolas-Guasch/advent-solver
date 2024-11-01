import { Component, inject, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DaySelectorComponent } from './domains/solver/components/day-selector/day-selector.component';
import { SolutionDashboardComponent } from './domains/solver/components/solution-dashboard/solution-dashboard.component';
import { ProblemInput } from './domains/shared/models/ProblemInput';
import { StorageService } from './domains/solver/services/storage.service';
import { AOCYear } from './domains/solver/models/aoc-year';
import { addBodyClass } from '@angular/cdk/schematics';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DaySelectorComponent, SolutionDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  storageService = inject(StorageService);
  contestYear = signal<AOCYear>(this.storageService.getYear());
  problemInput = signal<ProblemInput | null>(null);
  customInput = signal<ProblemInput>({ problemId: 'day1', input: '' });

  daySelectedHandler(input: ProblemInput) {
    this.problemInput.set(input);
  }

  customInputHandler(customInput: ProblemInput) {
    this.customInput.set(customInput);
  }

  availableYears: AOCYear[] = ['2023', '2024'];
  changeYear(year: AOCYear) {
    this.contestYear.set(year);
    this.storageService.storeYear(year);
  }
}
