import { Injectable } from '@angular/core';

interface selectStore {
  dayLabel: string;
  customInput: string;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storedData: selectStore;

  constructor() {
    const storage = localStorage.getItem('select');
    if (storage) {
      this.storedData = JSON.parse(storage);
    } else
      this.storedData = {
        dayLabel: 'day1',
        customInput: '',
      };
  }

  public getSelectedDay(): string {
    return this.storedData.dayLabel;
  }

  public isCustomActive(): boolean {
    return this.storedData.customInput != '';
  }

  public getCustomInput(): string {
    return this.storedData.customInput;
  }

  public storeSelectedDay(day: string) {
    this.storedData.dayLabel = day;
    localStorage.setItem('select', JSON.stringify(this.storedData));
  }

  public storeCustomInput(input: string) {
    this.storedData.customInput = input;
    localStorage.setItem('select', JSON.stringify(this.storedData));
  }
}
