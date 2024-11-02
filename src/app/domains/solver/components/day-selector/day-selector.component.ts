import { Component, computed, inject, output, signal } from '@angular/core';
import { DaySelectOption } from '../../../../domains/shared/models/day';
import { InputFetcherService } from '../../../../domains/shared/services/input-fetcher.service';
import { dayId } from '../../../shared/models/dayId';
import { StorageService } from '../../services/storage.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import {
  CustomSelectComponent,
  CustomSelectEvent,
} from '../../../shared/components/custom-select/custom-select.component';
import { CustomSelectOptionComponent } from '../../../shared/components/custom-select/custom-select-option/custom-select-option.component';
import { CurrentProblemService } from '../../services/current-problem.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-day-selector',
  standalone: true,
  imports: [
    ButtonComponent,
    CustomSelectComponent,
    CustomSelectOptionComponent,
  ],
  templateUrl: './day-selector.component.html',
  styleUrl: './day-selector.component.css',
})
export class DaySelectorComponent {
  inputFetcher = inject(InputFetcherService);
  storeService = inject(StorageService);
  state = inject(CurrentProblemService);

  adventDays = signal<DaySelectOption[]>([]);
  //selectorElement = viewChild.required<ElementRef>('dayselect');
  textAreaContent = signal<string>('');
  customInput = signal(false);

  customContent = output<string>();

  selectedDayData = computed(() => {
    const day = this.adventDays().find(
      (day) => day.selectValue === this.state.day(),
    );
    return day;
  });
  selectedDayStatementUrl = computed(
    () =>
      `https://adventofcode.com/${this.state.year()}/day/${this.selectedDayData()?.number ?? ''}`,
  );

  constructor() {
    this.storeService
      .loadCustom()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (custom) => {
          this.textAreaContent.set(custom);
          this.customInput.set(custom != '');
        },
        error: (err) => this.textAreaContent.set(''),
      });
    let days = [];
    for (let i = 1; i <= 25; i++) {
      days.push({ number: i, selectValue: 'day' + i, label: i.toString() });
    }
    this.adventDays.set(days);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.customInput()) {
      this.customContent.emit(this.textAreaContent() ?? '');
    }
  }

  handleDaySelect(event: CustomSelectEvent) {
    const selectedOption = event.selected.value() as dayId;
    const inputFilename = selectedOption + '.txt';
    if (selectedOption !== this.state.day()) {
      this.textAreaContent.set('');
      this.customInput.set(false);
      this.storeService.saveCustom('');
      this.customContent.emit('');
    }
    this.state.changeDay$.next(selectedOption);
  }
  customHandler() {
    const selectedOption = this.state.day() as dayId;
    this.customInput.update((value) => !value);
    if (!this.customInput()) {
      this.textAreaContent.set('');
      this.storeService.saveCustom('');
    }
    this.customContent.emit('');
  }

  submitCustom(event: Event) {
    const selectedOption = this.state.day() as dayId;
    const textArea = event.target as HTMLTextAreaElement;
    const customInput = textArea.value;
    this.storeService.saveCustom(customInput);
    this.customContent.emit(customInput);
  }
}
