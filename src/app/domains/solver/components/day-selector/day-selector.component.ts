import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  output,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { daySelectOption } from '../../../../domains/shared/models/day';
import { InputFetcherService } from '../../../../domains/shared/services/input-fetcher.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-day-selector',
  standalone: true,
  imports: [],
  templateUrl: './day-selector.component.html',
  styleUrl: './day-selector.component.css',
})
export class DaySelectorComponent {
  inputFetcher = inject(InputFetcherService);
  selectorOutput = output<string>();
  currentFileRequest: Subscription | null = null;

  selectorElement = viewChild.required<ElementRef>('dayselect');

  adventDays = signal<daySelectOption[]>([]);

  constructor() {
    let days = [];
    for (let i = 1; i <= 25; i++) {
      days.push({ number: i, selectValue: 'day' + i, label: 'Day ' + i });
    }
    this.adventDays.set(days);
    effect(() => {
      console.log('select found');
      const event = new CustomEvent('change');
      this.selectorElement().nativeElement.dispatchEvent(event);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.currentFileRequest) this.currentFileRequest.unsubscribe();
  }

  handleDaySelect(event: Event) {
    const dropdown = event.target as HTMLSelectElement;
    const selectedOption: string = dropdown.value;
    console.log(`input: ${selectedOption}`);
    const inputFilename = selectedOption + '.txt';
    if (this.currentFileRequest) this.currentFileRequest.unsubscribe();
    this.currentFileRequest = this.inputFetcher
      .fetchInputFile(inputFilename)
      .subscribe((data) => this.selectorOutput.emit(data));
  }
}
