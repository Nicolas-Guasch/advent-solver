import {
  Component,
  effect,
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
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-day-selector',
  standalone: true,
  imports: [],
  templateUrl: './day-selector.component.html',
  styleUrl: './day-selector.component.css',
})
export class DaySelectorComponent {
  inputFetcher = inject(InputFetcherService);
  storeService = inject(StorageService);
  selectorOutput = output<ProblemInput>();
  currentFileRequest: Subscription | null = null;

  adventDays = signal<DaySelectOption[]>([]);
  selectorElement = viewChild.required<ElementRef>('dayselect');
  selectedDay = signal<string>(this.storeService.getSelectedDay());
  customInput = signal<boolean>(this.storeService.isCustomActive());
  textAreaContent = signal<string>(this.storeService.getCustomInput());

  customContent = output<ProblemInput>();

  constructor() {
    let days = [];
    for (let i = 1; i <= 25; i++) {
      days.push({ number: i, selectValue: 'day' + i, label: 'Day ' + i });
    }
    this.adventDays.set(days);
    effect(() => {
      const day = this.selectedDay();
      this.storeService.storeSelectedDay(day);
    });
    effect(() => {
      const custom = this.textAreaContent();
      this.storeService.storeCustomInput(custom);
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.handleDaySelect();
    if (this.customInput()) {
      this.customContent.emit({
        problemId: this.selectedDay() as dayId,
        input: this.textAreaContent(),
      });
    }
  }

  ngOnDestroy() {
    if (this.currentFileRequest) this.currentFileRequest.unsubscribe();
  }

  handleDaySelect() {
    const selectedOption = this.selectorElement().nativeElement.value as dayId;
    const inputFilename = selectedOption + '.txt';
    if (selectedOption !== this.selectedDay()) {
      this.textAreaContent.set('');
    }
    this.selectedDay.set(selectedOption);
    if (this.currentFileRequest) this.currentFileRequest.unsubscribe();
    this.currentFileRequest = this.inputFetcher
      .fetchInputFile(inputFilename)
      .subscribe({
        next: (data) =>
          this.selectorOutput.emit({ problemId: selectedOption, input: data }),
        error: () => {
          this.selectorOutput.emit({
            problemId: selectedOption,
            input:
              selectedOption +
              '.txt not found. Copy your own input files to\npublic/input-files/ before building the site\nin order to use them here.',
          });
        },
      });
  }
  customHandler() {
    const selectedOption = this.selectorElement().nativeElement.value as dayId;
    this.customInput.update((val) => !val);
    if (!this.customInput()) {
      this.textAreaContent.set('');
    }
    this.customContent.emit({ problemId: selectedOption, input: '' });
  }

  submitCustom(event: Event) {
    const selectedOption = this.selectorElement().nativeElement.value as dayId;
    const textArea = event.target as HTMLTextAreaElement;
    const customInput = textArea.value;
    this.storeService.storeCustomInput(customInput);
    this.customContent.emit({ problemId: selectedOption, input: customInput });
  }
}
