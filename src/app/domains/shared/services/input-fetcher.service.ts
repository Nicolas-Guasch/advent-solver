import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InputFetcherService {
  httpClient = inject(HttpClient);
  private inputData = new Map<string, string>();
  private path = './input-files/';

  constructor() {}

  fetchInputFile(filename: string): Observable<string> {
    const fileData = this.inputData.get(filename);
    if (fileData) {
      return of(fileData);
    } else {
      const filepath = './input-files/' + filename;
      return this.httpClient.get(filepath, { responseType: 'text' }).pipe(
        tap((data) => {
          this.inputData.set(filename, data);
        }),
      );
    }
  }
}
