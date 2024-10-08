import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DaySelectorComponent } from './domains/solver/components/day-selector/day-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DaySelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  codeAreaContent = signal<string>('');

  daySelectedHandler(input: string) {
    this.codeAreaContent.set(input);
  }
}
