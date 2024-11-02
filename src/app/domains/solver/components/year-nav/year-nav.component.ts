import { Component, effect, inject, output, signal } from '@angular/core';
import { AOCYear } from '../../models/aoc-year';
import { CurrentProblemService } from '../../services/current-problem.service';

@Component({
  selector: 'app-year-nav',
  standalone: true,
  imports: [],
  templateUrl: './year-nav.component.html',
  styleUrl: './year-nav.component.css',
})
export class YearNavComponent {
  state = inject(CurrentProblemService);
  yearChange = output<AOCYear>();
  availableYears: AOCYear[] = ['2023', '2024'];

  constructor() {}

  changeYear(year: AOCYear) {
    this.state.changeYear$.next(year);
  }
}
