import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { daySelectOption } from './domains/shared/models/day';
import { InputFetcherService } from './domains/shared/services/input-fetcher.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  inputFetcher = inject(InputFetcherService);

  codeAreaContent = signal<string>('');
  adventDays = signal<daySelectOption[]>([]);

  constructor() {
    let days = [];
    for (let i = 1; i <= 25; i++) {
      days.push({ number: i, selectValue: 'day' + i, label: 'Day ' + i });
    }
    this.adventDays.set(days);
  }

  async handleDaySelect(event: Event) {
    const dropdown = event.target as HTMLSelectElement;
    const selectedOption: string = dropdown.value;
    const inputFilename = selectedOption + '.txt';
    this.codeAreaContent.set(
      await this.inputFetcher.fetchInputFile(inputFilename),
    );
  }
}
