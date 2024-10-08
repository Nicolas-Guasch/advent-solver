import {
  Component,
  ElementRef,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DaySelectOption } from '../../../../domains/shared/models/day';
import { InputFetcherService } from '../../../../domains/shared/services/input-fetcher.service';
import { Subscription } from 'rxjs';
import { ProblemInput } from '../../../../domains/shared/models/ProblemInput';
import { dayId } from '../../../shared/models/dayId';

@Component({
  selector: 'app-day-selector',
  standalone: true,
  imports: [],
  templateUrl: './day-selector.component.html',
  styleUrl: './day-selector.component.css',
})
export class DaySelectorComponent {
  inputFetcher = inject(InputFetcherService);
  selectorOutput = output<ProblemInput>();
  currentFileRequest: Subscription | null = null;

  selectorElement = viewChild.required<ElementRef>('dayselect');

  adventDays = signal<DaySelectOption[]>([]);

  constructor() {
    let days = [];
    for (let i = 1; i <= 25; i++) {
      days.push({ number: i, selectValue: 'day' + i, label: 'Day ' + i });
    }
    this.adventDays.set(days);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.handleDaySelect();
  }

  ngOnDestroy() {
    if (this.currentFileRequest) this.currentFileRequest.unsubscribe();
  }

  handleDaySelect() {
    const selectedOption = this.selectorElement().nativeElement.value as dayId;
    const inputFilename = selectedOption + '.txt';
    if (this.currentFileRequest) this.currentFileRequest.unsubscribe();
    this.currentFileRequest = this.inputFetcher
      .fetchInputFile(inputFilename)
      .subscribe((data) =>
        this.selectorOutput.emit({ problemId: selectedOption, input: data }),
      );
  }
}
