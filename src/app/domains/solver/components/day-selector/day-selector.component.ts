import {
  Component,
  computed,
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
import { ButtonComponent } from '../../../shared/components/button/button.component';
import {
  CustomSelectComponent,
  CustomSelectEvent,
} from '../../../shared/components/custom-select/custom-select.component';
import { CustomSelectOptionComponent } from '../../../shared/components/custom-select/custom-select-option/custom-select-option.component';

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
  selectorOutput = output<dayId>();

  adventDays = signal<DaySelectOption[]>([]);
  //selectorElement = viewChild.required<ElementRef>('dayselect');
  selectedDay = signal<string>(this.storeService.getSelectedDay());
  customInput = signal<boolean>(this.storeService.isCustomActive());
  textAreaContent = signal<string>(this.storeService.getCustomInput());

  customContent = output<string>();

  selectedDayData = computed(() => {
    const day = this.adventDays().find(
      (day) => day.selectValue === this.selectedDay(),
    );
    return day;
  });
  selectedDayStatementUrl = computed(
    () => `https://adventofcode.com/2023/day/${this.selectedDayData()?.number}`,
  );

  constructor() {
    let days = [];
    for (let i = 1; i <= 25; i++) {
      days.push({ number: i, selectValue: 'day' + i, label: i.toString() });
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
    if (this.customInput()) {
      this.customContent.emit(this.textAreaContent());
    }
  }

  handleDaySelect(event: CustomSelectEvent) {
    const selectedOption = event.selected.value() as dayId;
    const inputFilename = selectedOption + '.txt';
    if (selectedOption !== this.selectedDay()) {
      this.textAreaContent.set('');
      this.customContent.emit('');
    }
    this.selectedDay.set(selectedOption);
    this.selectorOutput.emit(selectedOption);
  }
  customHandler() {
    const selectedOption = this.selectedDay() as dayId;
    this.customInput.update((val) => !val);
    if (!this.customInput()) {
      this.textAreaContent.set('');
    }
    this.customContent.emit('');
  }

  submitCustom(event: Event) {
    const selectedOption = this.selectedDay() as dayId;
    const textArea = event.target as HTMLTextAreaElement;
    const customInput = textArea.value;
    this.storeService.storeCustomInput(customInput);
    this.customContent.emit(customInput);
  }
}
