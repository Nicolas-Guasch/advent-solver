import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { dayId } from '../../shared/models/dayId';
import { AOCYear } from '../models/aoc-year';
import { Subject, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface CurrentProblemState {
  day: dayId;
  year: AOCYear;
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentProblemService {
  private storage = inject(StorageService);

  private state = signal<CurrentProblemState>({
    day: 'day1',
    year: '2023',
    loaded: false,
    error: null,
  });

  day = computed(() => this.state().day);
  year = computed(() => this.state().year);
  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);

  private checklistsLoaded$ = this.storage.loadCurrent();
  changeDay$ = new Subject<dayId>();
  changeYear$ = new Subject<AOCYear>();

  constructor() {
    effect(() => {
      if (this.loaded()) {
        this.storage.saveCurrent({ dayLabel: this.day(), year: this.year() });
      }
    });

    this.checklistsLoaded$.pipe(takeUntilDestroyed()).subscribe({
      next: (current) =>
        this.state.update((state) => ({
          ...state,
          day: current.dayLabel,
          year: current.year,
          loaded: true,
        })),
      error: (err) => this.state.update((state) => ({ ...state, error: err })),
    });
    this.changeDay$
      .pipe(takeUntilDestroyed())
      .subscribe((day) =>
        this.state.update((state) => ({ ...state, day: day })),
      );
    this.changeYear$
      .pipe(takeUntilDestroyed())
      .subscribe((year) =>
        this.state.update((state) => ({ ...state, year: year })),
      );
  }
}
