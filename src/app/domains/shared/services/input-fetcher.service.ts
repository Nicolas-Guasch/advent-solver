import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, of, tap } from 'rxjs';
import { StorageService } from '../../solver/services/storage.service';
import { AOCYear } from '../../solver/models/aoc-year';

@Injectable({
  providedIn: 'root',
})
export class InputFetcherService {
  httpClient = inject(HttpClient);
  storage = inject(StorageService);
  private inputData = new Map<string, string>();
  private path = './input-files/';
  private folder = this.storage.getYear() + '/';

  constructor() {}

  fetchInputFile(filename: string): Observable<string> {
    const fileData = this.inputData.get(this.folder + filename);
    if (fileData) {
      return of(fileData);
    } else {
      const filepath = this.path + this.folder + filename;
      return this.httpClient.get(filepath, { responseType: 'text' }).pipe(
        tap((data) => {
          this.inputData.set(this.folder + filename, data);
        }),
      );
    }
  }

  changeYear(year: AOCYear) {
    this.folder = year + '/';
  }
}
