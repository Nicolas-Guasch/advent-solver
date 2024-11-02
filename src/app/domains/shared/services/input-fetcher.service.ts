import { computed, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, of, tap } from 'rxjs';
import { AOCYear } from '../../solver/models/aoc-year';
import { CurrentProblemService } from '../../solver/services/current-problem.service';

@Injectable({
  providedIn: 'root',
})
export class InputFetcherService {
  httpClient = inject(HttpClient);
  state = inject(CurrentProblemService);
  private inputData = new Map<string, string>();
  private path = './input-files/';
  private folder = computed(() => this.state.year() + '/');

  constructor() {}

  fetchInputFile(filename: string): Observable<string> {
    const key = this.folder() + filename;
    const fileData = this.inputData.get(key);
    if (fileData) {
      return of(fileData);
    } else {
      const filepath = this.path + key;
      return this.httpClient.get(filepath, { responseType: 'text' }).pipe(
        tap((data) => {
          this.inputData.set(key, data);
        }),
      );
    }
  }
}
