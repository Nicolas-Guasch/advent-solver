import { Component, input } from '@angular/core';
import { ProblemInput } from '../../../shared/models/ProblemInput';

@Component({
  selector: 'app-solution-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './solution-dashboard.component.html',
  styleUrl: './solution-dashboard.component.css',
})
export class SolutionDashboardComponent {
  input = input.required<ProblemInput>();
}
