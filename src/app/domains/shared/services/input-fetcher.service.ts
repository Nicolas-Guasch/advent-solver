import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InputFetcherService {
  httpClient = inject(HttpClient);
  private inputData = new Map<string, string>();
  private path = './input-files/';

  constructor() {}

  async fetchInputFile(filename: string): Promise<string> {
    if (this.inputData.has(filename)) {
      console.log('cached data');
      return this.inputData.get(filename)!;
    } else {
      console.log('fetched data');
      const filepath = './input-files/' + filename;
      const fileData = await firstValueFrom(
        this.httpClient.get(filepath, { responseType: 'text' }),
      );
      this.inputData.set(filename, fileData);
      return fileData;
    }
  }
}
